import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './app/contexts/AuthContext';
import { TranslationProvider } from './app/contexts/TranslationContext';
import { Router } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>

        <ReactQueryDevtools />
      </TranslationProvider>
    </QueryClientProvider>
  );
}

export default App;
