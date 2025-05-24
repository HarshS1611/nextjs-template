import { useEffect, useState } from 'react';
import { useAccount, usePublicClient, useWriteContract } from 'wagmi';
import { readContract } from 'viem/actions';
import { RICHEST_REVEALER_ABI, RICHEST_REVEALER_CONTRACT_ADDRESS } from '@/utils/contract';
import { encryptValue } from '@/utils/inco-lite';
import toast from 'react-hot-toast';

export default function useRichestRevealer() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();

  const [input, setInput] = useState('');
  const [richest, setRichest] = useState([]);

  // Contract state
  const [owner, setOwner] = useState('');
  const [participantCount, setParticipantCount] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [resultComputed, setResultComputed] = useState(false);
  const [resultRevealed, setResultRevealed] = useState(false);
  const [canRequestDecryption, setCanRequestDecryption] = useState(false);

  const contractConfig = {
    address: RICHEST_REVEALER_CONTRACT_ADDRESS,
    abi: RICHEST_REVEALER_ABI,
  };

  const extractRevertReason = (err) => {
    if (err?.cause?.reason) return err.cause.reason;
    if (err?.shortMessage) return err.shortMessage;
    if (err?.message) return err.message;
    return 'Transaction failed';
  };

  const fetchContractState = async () => {
    try {
      const [
        _owner,
        _count,
        _computed,
        _canDecrypt,
        _hasSubmitted,
      ] = await Promise.all([
        readContract(publicClient, { ...contractConfig, functionName: 'owner' }),
        readContract(publicClient, { ...contractConfig, functionName: 'getParticipantCount' }),
        readContract(publicClient, { ...contractConfig, functionName: 'resultComputed' }),
        readContract(publicClient, { ...contractConfig, functionName: 'canRequestDecryption' }),
        address
          ? readContract(publicClient, {
            ...contractConfig,
            functionName: 'hasParticipantSubmitted',
            args: [address],
          })
          : false,
      ]);

      setOwner(_owner);
      setParticipantCount(Number(_count));
      setResultComputed(_computed);
      setCanRequestDecryption(_canDecrypt);
      setHasSubmitted(_hasSubmitted);

    } catch (err) {
      console.error('Error fetching state:', err);
    }
  };

  const fetchWinner = async () => {
    try {
      const [
        winner,
        revealed,
      ] = await Promise.all([
        readContract(publicClient, {
          ...contractConfig,
          functionName: 'getRichestParticipants',
        }),
        readContract(publicClient, {
          ...contractConfig,
          functionName: 'isResultRevealed',
        }),
      ]);

      setRichest(winner);
      setResultRevealed(revealed);
      toast.success('Winner fetched successfully!');
    } catch (err) {
      console.error('Error fetching winner:', err);
      toast.loading('Calling contract to fetch winner...', {
        duration: 3000,
        position: 'top-center',
      }
      )
    }
  }

  // do polling for 5 seconds if resultRevealed is true
  useEffect(() => {
    if (!canRequestDecryption && richest.length == 0 && participantCount == 3 && resultComputed) {
      const interval = setInterval(() => {
        fetchWinner();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [canRequestDecryption,richest.length,participantCount]);

  useEffect(() => {
    if (address) fetchContractState();
  }, [address]);

  const handleWealthSubmit = async () => {
    if (!input) {
      toast.error('Please enter a value to submit.');
      return;
    }
    const promise = new Promise(async (resolve, reject) => {
      try {
        const encryptedWealth = await encryptValue({
          value: input,
          address,
          contractAddress: RICHEST_REVEALER_CONTRACT_ADDRESS,
        });

        const txHash = await writeContractAsync({
          ...contractConfig,
          functionName: 'submitWealth',
          args: [encryptedWealth],
        });

        await publicClient.waitForTransactionReceipt({ hash: txHash });
        setInput('');
        resolve();
      } catch (err) {
        reject(extractRevertReason(err));
      }
    });

    toast.promise(promise, {
      loading: 'Submitting your encrypted wealth...',
      success: 'Wealth submitted successfully!',
      error: (err) => `Submission failed: ${err}`,
    }).finally(() => fetchContractState());
  };

  const handleComputeRichest = async () => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const hash = await writeContractAsync({
          ...contractConfig,
          functionName: 'computeRichest',
        });

        await publicClient.waitForTransactionReceipt({ hash });
        resolve();
      } catch (err) {
        reject(extractRevertReason(err));
      }
    });

    toast.promise(promise, {
      loading: 'Computing richest participant...',
      success: 'Computation complete!',
      error: (err) => `Computation failed: ${err}`,
    }).finally(() => fetchContractState());
  };

  const handleRequestDecryption = async () => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const hash = await writeContractAsync({
          ...contractConfig,
          functionName: 'requestDecryption',
        });

        await publicClient.waitForTransactionReceipt({ hash });
        resolve();
      } catch (err) {
        reject(extractRevertReason(err));
      }
    });

    toast.promise(promise, {
      loading: 'Requesting decryption...',
      success: 'Decryption requested!',
      error: (err) => `Decryption failed: ${err}`,
    }).finally(() => fetchContractState());
  };

  return {
    input,
    setInput,
    handleWealthSubmit,
    handleComputeRichest,
    handleRequestDecryption,
    richest,
    owner,
    participantCount,
    hasSubmitted,
    resultComputed,
    resultRevealed,
    canRequestDecryption,
  };
}
