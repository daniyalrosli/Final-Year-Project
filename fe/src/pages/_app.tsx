import { AppProps } from 'next/app';
import { AuthProvider } from '@/context/AuthContext'; // Import the AuthProvider

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Wrap the entire app with the AuthProvider
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;