import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ScrollToTop from './utils/scrollToTop';
import
{
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/useAuth';

const queryClient = new QueryClient()

function App ()
{
  return (
    <AuthProvider>
      <QueryClientProvider client={ queryClient }>
        <ToastContainer />
        <ScrollToTop />
        <Outlet />
        <ReactQueryDevtools initialIsOpen={ false } />
      </QueryClientProvider>
    </AuthProvider>

  );
}

export default App;
