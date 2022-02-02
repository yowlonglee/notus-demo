export default function Login() {
  return (
    <form method="POST">
      <label
        className="block uppercase text-blueGray-600 text-xs font-bold"
        htmlFor="emal"
      >
        Email
      </label>
      <input
        className="border-1 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm"
        type="email"
        name="email"
        placeholder="email"
        // value
        // onchange
      />
      <button
        className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
