import CreateUser from '../components/CreateUser';
import Layout from '../components/Layout';

export default function CreateUserPage() {
  return (
    <Layout>
      <div className="flex flex-wrap">
        <div className="w-full mb-12 px-4">
          <CreateUser />
        </div>
      </div>
    </Layout>
  );
}
