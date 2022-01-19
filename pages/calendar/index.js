import Head from 'next/head';
import { useRouter } from 'next/router';
import AppNavbar from '../../components/AppNavbar';
import AppFooter from '../../components/AppFooter';
import Sidebar from '../../components/Sidebar';
import Calendar from '../../components/Calendar';

export default function CalendarPage() {
  const router = useRouter();
  // console.log(router);
  function setDate(flow) {
    const date = router.query.date ? new Date(router.query.date) : new Date();
    if (flow === 'next') {
      date.setDate(date.getDate() + 7);
    } else if (flow === 'prev') {
      date.setDate(date.getDate() - 7);
    }
    return date.toISOString().split('T')[0];
  }

  function handleClick(e) {
    e.preventDefault();
    if (e.target.name === 'today') {
      router.push('/');
    } else {
      const newDate = setDate(e.target.name);
      router.push(`/calendar/week/${newDate}`);
    }
  }
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
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-sm rounded bg-blueGray-700 text-white">
                <div className="px-4 py-3">
                  <button
                    type="button"
                    name="today"
                    className="mr-3"
                    onClick={handleClick}
                  >
                    今天
                  </button>
                  <button
                    type="button"
                    name="prev"
                    className="mr-3"
                    onClick={handleClick}
                  >
                    上週
                  </button>
                  <button
                    type="button"
                    name="next"
                    className="mr-3"
                    onClick={handleClick}
                  >
                    下週
                  </button>
                </div>
              </div>
              <Calendar date={router.query.date} />
            </div>
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  );
}
