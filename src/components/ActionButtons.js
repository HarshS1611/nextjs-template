export default function ActionButtons({ onCompute, onDecrypt, computeDisable, decryptionDisable }) {
    return (
      <div className="flex gap-4">
        <button 
        className="bg-green-600 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2" 
        disabled={computeDisable}
        onClick={onCompute}>
          Compute Richest
        </button>
        <button 
        className="bg-purple-600 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2"
        disabled={decryptionDisable} 
        onClick={onDecrypt}>
          Request Decryption
        </button>
      </div>
    );
  }
  