import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
// import PropTypes from 'prop-types';
import Workout from './Workout';
// import WeekPlan from './WeekPlan';

function getDateRange(someDate) {
  const date = someDate ? new Date(someDate) : new Date();
  const dateRange = { start: '', end: '' };
  date.setHours(0, 0, 0, 0);
  if (date.getDay() > 0) {
    const off = 7 - date.getDay();
    date.setDate(date.getDate() + off);
  }
  dateRange.end = date.toISOString();

  date.setDate(date.getDate() - 6);
  dateRange.start = date.toISOString();

  // console.log(dateRange);
  return dateRange;
}

const ALL_WORKOUTS_QUERY = gql`
  query ALL_WORKOUTS_QUERY($start: String!, $end: String!) {
    allWorkouts(where: { date_gte: $start, date_lte: $end }, orderBy: "date") {
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

export default function Calendar({ date }) {
  const { start, end } = getDateRange(date);
  const { data, error, loading } = useQuery(ALL_WORKOUTS_QUERY, {
    variables: {
      start,
      end,
    },
  });
  console.log({ data, error, loading });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="block w-full overflow-x-auto">
      {data.allWorkouts.map((workout) => (
        <Workout key={workout.id} workout={workout} />
      ))}
    </div>
  );
}
