export default function AboutPoll({ category }) {
  if (!category) return null;

  return (
    <div className="bg-white shadow rounded-md mt-8 overflow-hidden">
      <div className="bg-gray-100 text-center font-semibold py-3">
        ABOUT THIS POLL
      </div>

      <div className="divide-y text-sm">
        <div className="flex justify-between px-6 py-3">
          <span className="text-gray-600">Vote Timeout</span>
          <span>{category.end_at || "-"}</span>
        </div>

        <div className="flex justify-between px-6 py-3">
          <span className="text-gray-600">Vote Frequency</span>
          <span>{category.vote_frequency_minutes} minutes</span>
        </div>

        <div className="flex justify-between px-6 py-3">
          <span className="text-gray-600">Status</span>
          <span className="text-green-600 font-medium">{category.status}</span>
        </div>

        <div className="flex justify-between px-6 py-3">
          <span className="text-gray-600">Tutorial</span>
          <span className="text-red-500 cursor-pointer">Vote Tutorial</span>
        </div>
      </div>
    </div>
  );
}
