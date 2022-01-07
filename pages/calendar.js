import Head from 'next/head';
import AppNavbar from '../components/AppNavbar';
import AppFooter from '../components/AppFooter';
import Sidebar from '../components/Sidebar';
import Calendar from '../components/Calendar';

export default function CalendarPage() {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>行事曆</title>
      </Head>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AppNavbar />
        <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <p className="text-white">Display month here</p>
          </div>
        </div>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12 px-4">
              {/* <WeekPlan workoutData={workoutData.data} /> */}
              <Calendar />
            </div>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  );
}
