import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AppNavbar from './AppNavbar';
import AppFooter from './AppFooter';
import Sidebar from './Sidebar';
import { useUser } from '../lib/useUser';

export default function Layout({ children }) {
  const me = useUser();
  console.log(me);
  // const router = useRouter();

  // useEffect(() => {
  //   if (!me) router.push('/login');
  // });
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Kobe Run Club</title>
      </Head>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AppNavbar />
        <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <p className="text-white">Add something here</p>
          </div>
        </div>

        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <AppFooter />
        </div>
      </div>
    </>
  );
}
