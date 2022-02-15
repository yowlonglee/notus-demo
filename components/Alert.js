export default function Alert({ message, type }) {
  if (!message) return null;

  const style = { color: '' };

  switch (type) {
    case 'error':
      style.color = 'bg-red-500';
      break;
    case 'success':
      style.color = 'bg-emerald-500';
      break;
    default:
      style.color = 'bg-blueGray-500';
  }

  return (
    <div
      className={`text-white px-6 py-4 border-0 rounded relative mb-4 ${style.color}`}
    >
      {/* <span className="text-xl inline-block mr-5 align-middle">
        <i className="fas fa-frown" />
      </span> */}
      <span className="inline-block align-middle">
        {/* <strong className="capitalize mr-1">red!</strong> */}
        {/* {error.message.replace('GraphQL error: ', '')} */}
        {message}
      </span>
    </div>
  );
}
