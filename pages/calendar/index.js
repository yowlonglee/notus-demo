import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
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
    <Layout>
      <Head>
        <title>KRC - 行事曆</title>
      </Head>
      <div className="flex flex-wrap">
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
    </Layout>
  );
}
