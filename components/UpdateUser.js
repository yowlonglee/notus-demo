import { useRef, useState } from 'react';
import Image from 'next/image';
import { gql, useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY, useUser } from './useUser';
import defaultAvatar from '../public/img/krclogo.jpg';

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($id: ID!, $name: String, $email: String) {
    updateUser(id: $id, data: { name: $name, email: $email }) {
      name
      email
    }
  }
`;

const UPDATE_PASSWORD_MUTATION = gql`
  mutation UPDATE_PASSWORD_MUTATION($id: ID!, $password: String) {
    updateUser(id: $id, data: { password: $password }) {
      name
    }
  }
`;

const UPDATE_AVATAR_MUTATION = gql`
  mutation UPDATE_AVATAR_MUTATION($id: ID!, $image: Upload) {
    updateAvatar(id: $id, data: { image: $image }) {
      image {
        publicUrlTransformed
      }
    }
  }
`;

export default function UpdateUser() {
  const { data } = useUser();
  const uploader = useRef(null);

  const [user, setUser] = useState({
    id: data.authenticatedItem.id,
    name: data.authenticatedItem.name,
    email: data.authenticatedItem.email,
  });

  const [password, setPassword] = useState('');

  const [avatar, setAvatar] = useState({
    id: data.authenticatedItem.avatar.id,
    image: '',
    preview: '',
  });

  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    variables: user,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const [updatePassword] = useMutation(UPDATE_PASSWORD_MUTATION, {
    variables: { id: user.id, password },
  });

  const [updateAvatar] = useMutation(UPDATE_AVATAR_MUTATION, {
    variables: avatar,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  function handleClick(e) {
    e.preventDefault();
    // document.querySelector('input[name="image"]').click();
    uploader.current.click();
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  function handlePasswordChange(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  function handleAvatarChange(e) {
    e.preventDefault();
    // Get the first item from the FileList array and store it in the "value" variable
    const [value] = e.target.files;

    // Update state
    setAvatar({
      ...avatar,
      image: value,
      // Generate a thumbnail preview of the image
      preview: URL.createObjectURL(value),
    });
  }

  function handleAvatarReset(e) {
    e.preventDefault();
    setAvatar({
      ...avatar,
      image: '',
      preview: '',
    });
  }

  async function handleUserSubmit(e) {
    e.preventDefault();
    console.log(user);
    await updateUser();
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    await updatePassword();
  }

  async function handleAvatarSubmit(e) {
    e.preventDefault();
    await updateAvatar();
    // Clear
    setAvatar({
      ...avatar,
      image: '',
      preview: '',
    });
  }

  return (
    <>
      <div className="w-full lg:w-4/12 px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="px-6">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <div className="shadow-xl rounded-full h-auto align-middle border-none -m-16  max-w-150-px overflow-hidden flex absolute">
                  <Image
                    alt={user.name || 'user'}
                    src={
                      avatar.preview ||
                      data.authenticatedItem.avatar.image
                        .publicUrlTransformed ||
                      defaultAvatar
                    }
                    width={150}
                    height={150}
                  />
                </div>
              </div>
            </div>
            <div className="w-full px-4 text-center mt-20">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <button
                  hidden={avatar.preview}
                  type="button"
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                  onClick={handleClick}
                >
                  變更頭像
                </button>
                <button
                  hidden={!avatar.preview}
                  type="submit"
                  form="avatar"
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                >
                  確定變更
                </button>
                <button
                  hidden={!avatar.preview}
                  type="button"
                  className="bg-white text-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 border border-solid border-red-500 active:bg-red-600 active:border-red-600 active:text-white"
                  onClick={handleAvatarReset}
                >
                  取消
                </button>
                <form id="avatar" onSubmit={handleAvatarSubmit} method="POST">
                  <label className="hidden">
                    <input
                      type="file"
                      id="image"
                      name="image"
                      ref={uploader}
                      onChange={handleAvatarChange}
                      accept="image/*"
                    />
                  </label>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-8/12 px-4">
        <div className="relative bg-blueGray-100 rounded-lg shadow-lg">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">個人資料</h6>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form id="form" onSubmit={handleUserSubmit} method="POST">
              <div className="flex flex-wrap">
                <div className="w-full px-4">
                  <div className="relative w-full mb-3 mt-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="name"
                    >
                      我的名稱
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
              <button
                type="submit"
                form="form"
                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              >
                更新個人資料
              </button>
            </form>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <form
              id="password-form"
              onSubmit={handlePasswordSubmit}
              method="POST"
            >
              <div className="flex flex-wrap">
                <div className="w-full px-4">
                  <div className="relative w-full mb-3 mt-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      新密碼
                    </label>
                    <input
                      id="password"
                      type="password"
                      name="passwordDummy"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={password}
                      placeholder="密碼"
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  form="password-form"
                  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                >
                  更新密碼
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
