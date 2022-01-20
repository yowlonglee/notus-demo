export default function Workout({ workout }) {
  const date = new Date(workout.date);
  const day = new Intl.DateTimeFormat('zh-Hant-tw', {
    weekday: 'short',
  }).format(date);
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-sm">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap">
          <div className="relative pr-4 flex-initial flex flex-col">
            <span className="text-blueGray-400 font-bold text-sm">{`${
              date.getMonth() + 1
            }月${date.getDate()}日`}</span>
            <span className="font-semibold text-blueGray-700">{day}</span>
          </div>
          <div className="flex-initial">
            <h5 className="text-xl font-semibold inline-block p-2 rounded text-orange-600 bg-orange-200">
              {workout.title}
            </h5>
          </div>
        </div>
        <p className="whitespace-pre mt-4 text-blueGray-500">
          {workout.detail}
        </p>
      </div>
    </div>
  );
}
