export default function RichestList({ participants }) {
    return (
      <div>
        <h2 className="font-semibold">Richest Participants:</h2>
        <ul>
          {participants.length > 0 ? (
            participants.map((addr) => <li key={addr}>{addr}</li>)
          ) : (
            <li>No result yet</li>
          )}
        </ul>
      </div>
    );
  }
  