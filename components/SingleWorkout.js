import Head from 'next/head';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

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

// const USER_EDIT_WORKOUT_MUTATION = gql`
//   mutation USER_EDIT_WORKOUT_MUTATION(
//     $note: String
//   ) {

//   }
// `;

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
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const workout = data.Workout;
  console.log(workout);

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
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              自我評量
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="feel"
                  >
                    體感
                  </label>
                  <input id="feel" type="range" />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    訓練結果
                  </label>
                  <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
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
                    htmlFor="grid-password"
                  >
                    備註
                  </label>
                  <textarea
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    rows="4"
                    value={workout.note}
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
    </>
  );
}
