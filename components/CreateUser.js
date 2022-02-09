export default function CreateUser() {
  return (
    <div className="relative bg-blueGray-100 rounded-lg shadow-lg">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">新增學員</h6>
          <button
            className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="submit"
            form="form"
          >
            <i className="fas fa-plus mr-2" />
            新增
          </button>
        </div>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form
          id="form"
          onSubmit={async (e) => {
            e.preventDefault();
            console.log('Add user');
          }}
        >
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative w-full mb-3 mt-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  學員名稱
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value=""
                  placeholder="名稱"
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                />
              </div>
            </div>
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value=""
                  placeholder="email"
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
