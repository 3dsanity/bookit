import Layout from '../components/layout/Layout';
import { AppWrapper } from '../contexts/state';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const { ssrState, ...props } = pageProps;

  return (
    <AppWrapper ssrState={ssrState}>
      <Component {...props} />
    </AppWrapper>
  );
}

export default MyApp;

