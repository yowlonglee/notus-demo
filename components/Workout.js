import { useRouter } from 'next/router';

export default function Workout({ workout }) {
  const router = useRouter();
  const date = new Date(workout.date);
  const day = new Intl.DateTimeFormat('zh-Hant-tw', {
    weekday: 'short',
  }).format(date);
  function handleClick() {
    router.push(`/workout/${workout.id}`);
  }
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
            <button
              type="button"
              className="text-xl font-semibold inline-block p-2 rounded text-orange-600 bg-orange-200"
              onClick={handleClick}
            >
              {workout.title}
            </button>
          </div>
        </div>
        <p className="whitespace-pre mt-4 text-blueGray-500">
          {workout.detail}
        </p>
      </div>
    </div>
  );
}
