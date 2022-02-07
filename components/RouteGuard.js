import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from './useUser';

export default function RouteGuard({ children }) {
  const router = useRouter();
  const me = useUser();
  const [authState, setAuthState] = useState(false);

  function authCheck() {
    // console.log(url);
    console.log(authState);
    // const publicPaths = ['/login'];
    // const path = url.split('?')[0];
    if (!me) {
      // setAuthState(false);
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
    authCheck(router.asPath);
    // router.events.on('routeChangeStart', () => setState(false));
    // router.events.on('routeChangeComplete', authCheck);
    // return () => {
    //   router.events.off('routeChangeStart', () => setState(false));
    //   router.events.off('routeChangeComplete', authCheck);
    // };
  });

  return authState && children;
}
