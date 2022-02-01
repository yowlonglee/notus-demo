import { gql, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';

const ALL_USER_QUERY = gql`
  query ALL_USER_QUERY {
    allUsers {
      id
      name
    }
  }
`;

const CREATE_WORKOUT_MUTATION = gql`
  mutation CREATE_WORKOUT_MUTATION(
    $title: String!
    $isoDate: String!
    $detail: String!
    $type: String!
    $userId: ID!
  ) {
    createWorkout(
      data: {
        title: $title
        detail: $detail
        date: $isoDate
        type: $type
        user: { connect: { id: $userId } }
      }
    ) {
      user {
        name
      }
      date
      title
      detail
    }
  }
`;

export default function CreateWorkout() {
  const [workout, setWorkout] = useState({
    title: '跑步',
    detail: '',
    date: '2022-01-01',
    isoDate: '',
    type: 'TRAINING',
    userId: '',
  });

  const { data, error, loading } = useQuery(ALL_USER_QUERY);

  const [
    createWorkout,
    { data: mutationData, error: mutationError, loading: mutationLoading },
  ] = useMutation(CREATE_WORKOUT_MUTATION, {
    variables: workout,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (mutationLoading) return <p>Submitting...</p>;
  if (mutationError) return <p>Submission Error: {mutationError.message}</p>;

  return (
    <div className="relative bg-blueGray-100 rounded-lg shadow-lg">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">新增課表</h6>
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
            console.log(workout);
            const res = await createWorkout();
            console.log(res);
            console.log(mutationData);
          }}
        >
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3 mt-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="title"
                >
                  主要課表
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={workout.title}
                  placeholder="今天的主要課表"
                  onChange={(e) => {
                    e.preventDefault();
                    setWorkout({ ...workout, title: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3 lg:mt-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="type"
                >
                  類別
                </label>
                <select
                  id="type"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={workout.type}
                  onChange={(e) => {
                    e.preventDefault();
                    setWorkout({ ...workout, type: e.target.value });
                  }}
                >
                  <option value="REST">休息</option>
                  <option value="TRAINING">訓練</option>
                  <option value="EVENT">比賽</option>
                </select>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="type"
                >
                  對象
                </label>
                <select
                  id="type"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={workout.useId}
                  onChange={(e) => {
                    e.preventDefault();
                    setWorkout({ ...workout, userId: e.target.value });
                  }}
                >
                  {data.allUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="date"
                >
                  訓練日期
                </label>
                <input
                  type="date"
                  id="date"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value={workout.date}
                  onChange={(e) => {
                    e.preventDefault();
                    const d = new Date();
                    const offset = d.getTimezoneOffset() / 60;
                    const o = offset < 0 ? '+' : '-';
                    const s = Math.abs(offset)
                      .toString()
                      .padStart(2, '0')
                      .padEnd(4, '0');
                    const offsetTime = `${e.target.value}T00:00${o}${s}`;
                    // console.log(offsetTime);
                    setWorkout({
                      ...workout,
                      isoDate: offsetTime,
                      date: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="detail"
                >
                  課表內容
                </label>
                <textarea
                  type="text"
                  id="detail"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  rows="4"
                  placeholder="今天的訓練內容"
                  value={workout.detail}
                  onChange={(e) => {
                    e.preventDefault();
                    setWorkout({ ...workout, detail: e.target.value });
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
