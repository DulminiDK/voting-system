export default function VoteSuccess({ onViewResults }) {
  return (
    <div className="text-center mt-8">
      <h2 className="text-green-600 font-semibold text-xl">
        Vote Submitted Successfully!
      </h2>

      <p className="mt-3">Your vote has been counted.</p>

      <p className="text-gray-500 mt-2">
        Thank you for participating in TechPulse Awards.
      </p>

      <div className="mt-6">
        <button
          onClick={onViewResults}
          className="bg-purple-700 text-white px-5 py-2 rounded hover:bg-purple-800"
        >
          View Results
        </button>
      </div>
    </div>
  );
}
