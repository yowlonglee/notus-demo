import CreateWorkout from '../components/CreateWorkout';
import Layout from '../components/Layout';

export default function CreateWorkoutPage() {
  return (
    <Layout>
      <div className="flex flex-wrap">
        <div className="w-full mb-12 px-4">
          <CreateWorkout />
        </div>
      </div>
    </Layout>
  );
}
