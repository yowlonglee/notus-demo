export default function Workout({ workout }) {
  const date = new Date(workout.date);
  const day = new Intl.DateTimeFormat('zh-Hant-tw', {
    weekday: 'short',
  }).format(date);
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-sm">
      <div className="flex-auto p-4">
        <p>{day}</p>
        <p>{`${date.getMonth() + 1}月${date.getDate()}日`}</p>
        <p>{workout.title}</p>
        <p className="whitespace-pre">{workout.detail}</p>
        <p>{workout.user.name}</p>
      </div>
    </div>
  );
}
