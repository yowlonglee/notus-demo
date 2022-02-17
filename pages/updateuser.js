import UpdateUser from '../components/UpdateUser';
import Layout from '../components/Layout';

export default function UpdateUserPage() {
  return (
    <Layout pageTitle="編輯個人資料">
      <div className="flex flex-wrap">
        {/* <div className="w-full mb-12 px-4"> */}
        <UpdateUser />
        {/* </div> */}
      </div>
    </Layout>
  );
}
