import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import Alert from './Alert';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      # Always return null
      message
    }
  }
`;

export default function RequestReset() {
  const initialState = {
    email: '',
  };

  const [inputs, setInputs] = useState(initialState);

  const [reset, { data, error, loading }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );
  // console.log({ data, error, loading });
  function handleChange(e) {
    e.preventDefault();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Send the email to the GraphQL API
    await reset();
    setInputs(initialState);
  }
  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-5/12 md:w-8/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
            <div className="flex-auto p-4 lg:p-10">
              <Alert type="error" message={error?.message} />
              <Alert
                type="info"
                message={
                  data?.sendUserPasswordResetLink === null &&
                  '請檢查您的 email 信箱！'
                }
              />
              <h4 className="text-2xl font-bold text-center">重設密碼</h4>
              <div className="text-center text-blueGray-500 mb-5 mt-1">
                <p>請輸入您註冊的 email 帳號</p>
              </div>

              <form method="POST" onSubmit={handleSubmit}>
                <fieldset disabled={loading} aria-busy={loading}>
                  <div className="relative w-full mb-3">
                    <label className="hidden" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="border-blueGray-300 px-3 py-2 placeholder-blueGray-200 text-blueGray-700 bg-white rounded text-sm outline-none focus:ring focus:ring-lightBlue-500 focus:border-lightBlue-500 border border-solid w-full transition duration-200"
                      type="email"
                      name="email"
                      placeholder="email"
                      value={inputs.email}
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
