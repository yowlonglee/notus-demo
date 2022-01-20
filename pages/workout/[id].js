import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Layout from '../../components/Layout';

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
      comment
      image {
        id
        image {
          id
          path
        }
        description
      }
    }
  }
`;

export default function WorkoutPage({ query }) {
  const { data, error, loading } = useQuery(SINGLE_WORKOUT_QUERY, {
    variables: { id: query.id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const workout = data.Workout;
  console.log(workout);
  return (
    <Layout>
      <Head>
        <title>KRC - {workout.title}</title>
      </Head>
      <p>This is a single workout page!</p>
      <p>ID: {query.id}</p>
    </Layout>
  );
}