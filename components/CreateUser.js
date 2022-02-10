import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import generator from 'generate-password';

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      data: {
        name: $name
        email: $email
        password: $password
        avatar: { create: { name: $name } }
      }
    ) {
      name
      id
      email
      password_is_set
    }
  }
`;

export default function CreateUser() {
  const initial = {
    name: '',
    email: '',
  };
  const [user, setUser] = useState(initial);

  const [createUser] = useMutation(CREATE_USER_MUTATION, {
    variables: {
      ...user,
      password: generator.generate(),
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await createUser();
    // Clear form
    setUser(initial);
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

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
        <form id="form" onSubmit={handleSubmit}>
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
                  value={user.name}
                  placeholder="名稱"
                  onChange={handleChange}
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
                  value={user.email}
                  placeholder="email"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
