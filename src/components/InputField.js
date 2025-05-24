export default function InputField({ value, onChange }) {
    return (
      <input
        className="border p-2 w-full text-black"
        placeholder="Enter encrypted wealth"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  