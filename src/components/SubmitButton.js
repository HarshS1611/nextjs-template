export default function SubmitButton({ onClick, disabled }) {
    return (
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onClick}
        disabled={disabled}
      >
        Submit Wealth
      </button>
    );
  }
  