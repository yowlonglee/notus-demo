import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    e.preventDefault();
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
    console.log(login);
  }

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="flex-auto px-4 lg:px-10 py-10">
              <div className="text-blueGray-400 text-center mb-3 font-bold">
                <small>請登入</small>
              </div>
              <form
                method="POST"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(login);
                }}
              >
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    type="email"
                    name="email"
                    placeholder="email"
                    value={login.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={login.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      id="customCheckLogin"
                      type="checkbox"
                      className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                    />
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">
                      記住我
                    </span>
                  </label>
                </div>
                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 active:bg-blueGray-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    登入
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-wrap mt-6 relative">
            <div className="w-1/2">
              <a
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                className="text-blueGray-200"
              >
                <small>忘記密碼？</small>
              </a>
            </div>
            {/* <div className="w-1/2 text-right">
              <Link href="/auth/register">
                <a href="#pablo" className="text-blueGray-200">
                  <small>新增帳號</small>
                </a>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
