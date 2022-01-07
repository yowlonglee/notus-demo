import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Workout from './Workout';

const ALL_WORKOUTS_QUERY = gql`
  query ALL_WORKOUTS_QUERY {
    allWorkouts {
      id
      user {
        id
        name
      }
      title
      date
      type
      detail
      status
    }
  }
`;

export default function Calendar({ color }) {
  const { data, error, loading } = useQuery(ALL_WORKOUTS_QUERY);
  console.log({ data, error, loading });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div
      className={`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ${
        color === 'light' ? 'bg-white' : 'bg-blueGray-700 text-white'
      }`}
    >
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3
              className={`font-semibold text-lg ${
                color === 'light' ? 'text-blueGray-700' : 'text-white'
              }`}
            >
              Calendar toolbar
            </h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        {data.allWorkouts.map((workout) => (
          <Workout key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}

Calendar.defaultProps = {
  color: 'light',
};

Calendar.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
};
