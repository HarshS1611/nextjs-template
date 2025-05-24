'use client';

import InputField from './InputField';
import SubmitButton from './SubmitButton';
import ActionButtons from './ActionButtons';
import RichestList from './RichestList';
import useRichestRevealer from '@/hooks/useRichestRevealer';
import { useAccount } from 'wagmi';

export default function ContractInteraction() {
  const { address } = useAccount();
  const {
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
    isTransactionPending,
  } = useRichestRevealer();

  const renderStatusBadge = (condition) => (
    <span className={`ml-2 text-xs font-semibold px-2 py-1 rounded-full ${condition ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
      {condition ? 'Yes' : 'No'}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-900 bg-opacity-40 rounded-2xl text-gray-100 px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">🏆 Richest Revealer</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Info Card */}
        <div className="bg-gray-800 border col-span-2 border-gray-700 rounded-lg p-6 space-y-4 shadow-md">
          <h2 className="text-xl font-semibold mb-2">Status</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p><strong>Owner:</strong> <span className="">{owner.substring(0, 10)}...{owner.substring(owner.length - 20, owner.length)}</span></p>
            <p><strong>Participants:</strong> {participantCount}</p>
            <p><strong>Your Submission:</strong> {renderStatusBadge(hasSubmitted)}</p>
            <p><strong>Result Computed:</strong> {renderStatusBadge(resultComputed)}</p>
            <p><strong>Result Revealed:</strong> {renderStatusBadge(resultRevealed)}</p>
            <p><strong>Can Request Decryption:</strong> {renderStatusBadge(canRequestDecryption)}</p>
          </div>
        </div>

        {/* Submit Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4 shadow-md">
          <h2 className="text-xl font-semibold">Submit Encrypted Wealth</h2>
          <InputField value={input} onChange={setInput} />
          <SubmitButton onClick={handleWealthSubmit} disabled={isTransactionPending || hasSubmitted || participantCount == 3} />
        </div>

        {/* Actions Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4 shadow-md">
          <h2 className="text-xl font-semibold">Actions</h2>
          <ActionButtons
            onCompute={handleComputeRichest}
            onDecrypt={handleRequestDecryption}
            computeDisable={isTransactionPending || participantCount < 3 || resultComputed || address !== owner}
            decryptionDisable={isTransactionPending || !canRequestDecryption || !owner}
          />
        </div>

        {/* Results Card */}
        <div className="col-span-2 bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          <RichestList participants={richest} />
        </div>
      </div>


    </div>
  );
}
