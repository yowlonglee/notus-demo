import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { CURRENT_USER_QUERY } from './useUser';

export const LOGOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function Logout({ className }) {
  const router = useRouter();
  function redirect() {
    router.push('/login');
  }
  const [logout] = useMutation(LOGOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    onCompleted: redirect,
  });
  return (
    <button type="button" onClick={logout} className={className}>
      登出
    </button>
  );
}
