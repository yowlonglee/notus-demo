import Head from 'next/head';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Loading from './Loading';

const SINGLE_WORKOUT_QUERY = gql`
  query SINGLE_WORKOUT_QUERY($id: ID!) {
    Workout(where: { id: $id }) {
      title
      user {
        name
        id
      }
      type
      date
      detail
      status
      feels
      note
      images {
        id
        image {
          id
          path
        }
        description
      }
      comments {
        content
        date
        user {
          name
          id
        }
      }
    }
  }
`;

const UPDATE_ANALYSIS_MUTATION = gql`
  mutation UPDATE_ANALYSIS_MUTATION(
    $id: ID!
    $status: String!
    $note: String
    $feels: Int!
  ) {
    updateWorkout(
      id: $id
      data: { status: $status, feels: $feels, note: $note }
    ) {
      status
      feels
      note
    }
  }
`;

const workoutTypes = {
  REST: 'fa-couch',
  TRAINING: 'fa-running',
  EVENT: 'fa-trophy',
};

const status = [
  { value: 'UNPLANNED', label: '未進行' },
  { value: 'MISSED', label: '跳過' },
  { value: 'AWESOME', label: '非常好' },
  { value: 'GOOD', label: '很好' },
  { value: 'OKAY', label: '剛剛好' },
  { value: 'BAD', label: '有點差' },
  { value: 'WORST', label: '非常差' },
];

export default function SingleWorkout({ id }) {
  const { data, error, loading } = useQuery(SINGLE_WORKOUT_QUERY, {
    variables: { id },
  });

  const workout = data?.Workout;
  console.log(workout);

  const [analysis, setAnalysis] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // This function runs when the things we are watching change
    setAnalysis({
      id,
      status: workout?.status || '',
      feels: workout?.feels || 0,
      note: workout?.note || '',
    });
  }, [data]);

  const [
    updateAnalysis,
    {
      data: updateAnalysisData,
      error: updateAnalysisError,
      loading: updateAnalysisLoading,
    },
  ] = useMutation(UPDATE_ANALYSIS_MUTATION, {
    variables: analysis,
  });

  function handleAnalysisChange(e) {
    e.preventDefault();
    setAnalysis({
      ...analysis,
      [e.target.name]: e.target.value,
    });
    console.log(analysis);
  }

  async function handleAnalysisSubmit(e) {
    e.preventDefault();
    await updateAnalysis();
  }

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  const date = new Date(workout.date);
  const formattedDate = new Intl.DateTimeFormat('zh-Hant-tw', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'long',
  }).format(date);

  return (
    <>
      <Head>
        <title>
          {formattedDate} - {workout.title}
        </title>
      </Head>
      <div className="relative bg-blueGray-100 rounded-lg shadow-lg">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className=" flex flex-wrap">
            <div className="relative w-auto flex-initial pr-4">
              <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blueGray-600">
                <i className={`fas ${workoutTypes[workout.type]}`} />
              </div>
            </div>
            <div className="w-full relative flex-grow flex-1 pl-4">
              <span className="text-xs text-blueGray-400 font-bold">
                {formattedDate}
              </span>
              <h6 className="text-blueGray-700 font-bold">{workout.title}</h6>
            </div>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            課表內容
          </h6>

          <div className="flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                <p className=" px-3 py-3 text-blueGray-600 bg-white rounded text-sm w-full whitespace-pre">
                  {workout.detail}
                </p>
              </div>
            </div>
          </div>

          <hr className="mt-6 border-b-1 border-blueGray-300" />

          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            自我分析
          </h6>
          <form id="analysis" onSubmit={handleAnalysisSubmit}>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="feel"
                  >
                    體感
                  </label>
                  <input
                    id="feels"
                    name="feels"
                    type="range"
                    value={analysis.feels}
                    onChange={handleAnalysisChange}
                    disabled={!editing}
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="status"
                  >
                    訓練結果
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleAnalysisChange}
                    value={analysis.status}
                    disabled={!editing}
                  >
                    {status.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="note"
                  >
                    備註
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    rows="4"
                    value={analysis.note}
                    onChange={handleAnalysisChange}
                    disabled={!editing}
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                hidden={editing}
                onClick={() => {
                  setEditing(true);
                }}
              >
                編輯
              </button>
              <button
                type="submit"
                form="analysis"
                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                hidden={!editing}
              >
                確定變更
              </button>
              <button
                type="button"
                className="bg-white text-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 border border-solid border-red-500 active:bg-red-600 active:border-red-600 active:text-white"
                hidden={!editing}
                onClick={() => {
                  setEditing(false);
                  setAnalysis({
                    status: workout.status,
                    feels: workout.feels,
                    note: workout.note,
                  });
                }}
              >
                取消
              </button>
            </div>
          </form>

          <hr className="mt-6 border-b-1 border-blueGray-300" />

          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            附加檔案
          </h6>

          <hr className="mt-6 border-b-1 border-blueGray-300" />
          <p>Comments</p>
        </div>
      </div>
    </>
  );
}
