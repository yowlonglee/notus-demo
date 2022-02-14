export default function ErrorMessage({ error }) {
  if (!error || !error.message) return null;
  return (
    <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
      <span className="text-xl inline-block mr-5 align-middle">
        <i className="fas fa-face-dizzy" />
      </span>
      <span className="inline-block align-middle mr-8">
        <strong className="capitalize">red!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </span>
    </div>
  );
}
