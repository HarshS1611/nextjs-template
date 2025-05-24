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
    knownParticipants,
    participantStatuses,
  } = useRichestRevealer();
  console.log('Richest:', knownParticipants);

  const renderStatusBadge = (condition) => (
    <span className={`ml-2 text-xs font-semibold px-2 py-1 rounded-full ${condition ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
      {condition ? 'Yes' : 'No'}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-900 bg-opacity-40 rounded-2xl text-gray-100 px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">🏆 Encrypted Richest Revealer</h1>
      <div className="bg-gray-800 border col-span-2 border-gray-700 text-black rounded-xl shadow-sm p-6 mb-6 space-y-4">
        <h2 className="text-xl font-semibold text-white">Participants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {knownParticipants?.length > 0 ? knownParticipants.map((p) => {
            const status = participantStatuses.find(s => s.address.toLowerCase() === p.address.toLowerCase());
            const isSubmitted = status?.submitted;
            const isWinner = richest.includes(p.address);

            return (
              <article
                key={p.address}
                className={`
        p-5 rounded-lg shadow-md border 
        transition-colors duration-300 ease-in-out
        cursor-default
        ${isWinner ? 'bg-green-100 border-green-400 hover:bg-green-100' :
                    isSubmitted ? 'bg-yellow-50 border-yellow-400 hover:bg-yellow-100' :
                      'bg-white border-gray-300 hover:bg-gray-50'}
      `}
                aria-label={`${p.name} participant card${isWinner ? ', winner' : isSubmitted ? ', submitted wealth' : ', not submitted'}`}
              >
                <header className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-gray-900">{p.name}</h3>
                  {isWinner && (
                    <span role="img" aria-label="Winner trophy" className="text-2xl animate-bounce" title="🏆 Winner">
                      🏆
                    </span>
                  )}
                </header>
                <address className="not-italic mb-3 text-xs text-gray-600 break-all">{p.address}</address>
                <p className="text-sm">
                  Submitted:{" "}
                  <span className={isSubmitted ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
                    {isSubmitted ? 'Yes' : 'No'}
                  </span>
                </p>
              </article>
            );
          })
            : <p className="text-gray-500">No participants yet.</p>}

        </div>
      </div>


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
