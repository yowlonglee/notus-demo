import { ApolloProvider } from '@apollo/client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import withData from '../lib/withData';
import '../styles/tailwind.css';

export function App({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />;
    </ApolloProvider>
  );
}

App.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(App);
