import Head from 'next/head';
import Layout from '../../components/Layout';
import SingleWorkout from '../../components/SingleWorkout';

export default function SingleWorkoutPage({ query }) {
  return (
    <Layout>
      <Head>
        {/* <title>KRC - {workout.title}</title> */}
        <title>KRC</title>
      </Head>
      <div className="flex flex-wrap">
        <div className="w-full mb-12 px-4">
          <SingleWorkout id={query.id} />
        </div>
      </div>
    </Layout>
  );
}
