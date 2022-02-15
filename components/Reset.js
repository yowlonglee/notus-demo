import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import Alert from './Alert';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const initialState = {
    email: '',
    password: '',
    token,
  };

  const [inputs, setInputs] = useState(initialState);

  const [reset, { data, error, loading }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data.redeemUserPasswordResetToken.message
    : undefined;

  function handleChange(e) {
    e.preventDefault();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Send the inputs to the GraphQL API
    await reset().catch(console.error);
    setInputs(initialState);
  }

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-5/12 md:w-8/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
            <div className="flex-auto p-4 lg:p-10">
              <Alert type="error" message={error?.message || successfulError} />
              <Alert
                type="success"
                message={
                  data?.redeemUserPasswordResetToken === null &&
                  '密碼更新成功！'
                }
              />
              <h4 className="text-2xl font-bold text-center">重設密碼</h4>
              <div className="text-center text-blueGray-500 mb-5 mt-1">
                <p>請輸入新的密碼</p>
              </div>

              <form method="POST" onSubmit={handleSubmit}>
                <fieldset disabled={loading} aria-busy={loading}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="border-blueGray-300 px-3 py-2 placeholder-blueGray-200 text-blueGray-700 bg-white rounded text-sm outline-none focus:ring focus:ring-lightBlue-500 focus:border-lightBlue-500 border border-solid w-full transition duration-200"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={inputs.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      密碼
                    </label>
                    <input
                      className="border-blueGray-300 px-3 py-2 placeholder-blueGray-200 text-blueGray-700 bg-white rounded text-sm outline-none focus:ring focus:ring-lightBlue-500 focus:border-lightBlue-500 border border-solid w-full transition duration-200"
                      type="password"
                      name="password"
                      placeholder="密碼"
                      value={inputs.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="inline-block align-middle bg-blueGray-800 active:bg-blueGray-600 text-white font-bold uppercase text-sm px-6 py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none ease-in-out transition-all duration-150 border border-solid border-blueGray-800 active:border-blueGray-900 "
                      type="submit"
                      disabled={loading}
                    >
                      重設
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
