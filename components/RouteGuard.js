import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from './useUser';

export default function RouteGuard({ children }) {
  const router = useRouter();
  const { data, loading } = useUser();
  const [authState, setAuthState] = useState(false);

  function authCheck() {
    if (!data?.authenticatedItem) {
      setAuthState(false);
      router.push({
        pathname: '/login',
        query: {
          returnUrl: router.asPath,
        },
      });
    } else {
      setAuthState(true);
    }
  }

  useEffect(() => {
    if (!loading) {
      authCheck();
    }
  }, [loading]);

  return authState && children;
}
