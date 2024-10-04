import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DescriptionIcon from '@mui/icons-material/Description';
import { createTheme } from "@mui/material";
import Box from '@mui/material/Box';
import { AppProvider, DashboardLayout, Navigation, Router } from "@toolpad/core";
import { useMemo, useState } from "react";
import DashboardPage from '../../pages/dashboard/DashboardPage';
import UserPage from '../../pages/user/UserPage';
import OrderPage from '../../pages/order/OrderPage';
import LabPage from '../../pages/lab/LabPage';
import Logout from '../../pages/logout/Logout';
import theme from '../../theme';

type Props = {}
const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'users',
    title: 'Users',
    icon: <ManageAccountsIcon />,
  },
  {
    segment: 'labs',
    title: 'Labs',
    icon: <DescriptionIcon />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'logout',
    title: 'Logout',
    icon: <LogoutIcon />,
  },
];

function PageContent ( { pathname }: { pathname: string } )
{
  return (
    <Box
      sx={ {
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      } }
    >
      {
        pathname === '/dashboard' && <DashboardPage />
      }
      {
        pathname === '/orders' && <OrderPage />
      }
      {
        pathname === '/users' && <UserPage />
      }
      {
        pathname === '/labs' && <LabPage />
      }
      {
        pathname === '/logout' && <Logout />
      }
    </Box>
  );
}
const Main = ( props: Props ) =>
{
  const [ pathname, setPathname ] = useState( '/dashboard' );

  const router = useMemo<Router>( () =>
  {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: ( path ) => setPathname( String( path ) ),
    };
  }, [ pathname ] );
  return (
    <AppProvider
      navigation={ NAVIGATION }
      router={ router }
      theme={ theme }
      branding={ {
        logo: <img src="https://www.crunchlabs.com/cdn/shop/files/CrunchLabs_icon_translucent.png?crop=center&amp;height=32&amp;v=1649084500&amp;width=32" />,
        title: 'KALS',

      } }
      session={ {
        user: {
          name: 'John Doe',
          email: '',
          image: 'https://mui.com/static/logo.png',
        },
      } }
    >
      <DashboardLayout>
        <PageContent pathname={ pathname } />
      </DashboardLayout>
    </AppProvider>
  )
}

export default Main