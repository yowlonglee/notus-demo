import Head from 'next/head';
import AdminNavbar from '../components/Navbars/AdminNavbar';
import FooterAdmin from '../components/Footers/FooterAdmin';
import Sidebar from '../components/Sidebar/Sidebar';
import WeekPlan from '../components/WeekPlan';
import WeekList from '../components/WeekList';
import workoutData from '../fakedata/fakeWorkouts';

export default function WorkoutsPage() {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Workout Plan</title>
      </Head>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <WeekList weekLength={12} />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12 px-4">
              <WeekPlan workoutData={workoutData.data} />
            </div>
          </div>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
