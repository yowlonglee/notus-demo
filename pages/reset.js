import AuthLayout from '../components/AuthLayout';
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  if (!query.token) {
    return (
      <AuthLayout>
        <RequestReset />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <p className="text-blueGray-500">Hey!!! {query.token}</p>
      <Reset token={query.token} />
    </AuthLayout>
  );
}
