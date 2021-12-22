import Head from 'next/head';
import AdminNavbar from '../components/Navbars/AdminNavbar';
import FooterAdmin from '../components/Footers/FooterAdmin';
import Sidebar from '../components/Sidebar/sidebar';
import CardTable from '../components/Cards/CardTable';
import HeaderStats from '../components/Headers/HeaderStats';

export default function Training() {
  return(
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Training</title>
      </Head>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12 px-4">
              <CardTable />
            </div>
          </div>
          <FooterAdmin />
        </div>
      </div>
    </>
  )
}