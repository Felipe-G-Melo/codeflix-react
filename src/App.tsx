import { Box, ThemeProvider } from '@mui/material';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { appTheme } from './config/theme';
import { Routes, Route } from 'react-router-dom';
import { ListCategory } from './features/categories/ListCategory';
import { CreateCategory } from './features/categories/CreateCategory';
import { EditCategory } from './features/categories/EditCategory';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box component='main' sx={{ height: '100vh', backgroundColor: '#222' }}>
          <Header />
          <Layout>
            <Routes>
              <Route path='/' element={<ListCategory />} />
              <Route path='/categories' element={<ListCategory />} />
              <Route path='/categories/create' element={<CreateCategory />} />
              <Route path='/categories/edit/:id' element={<EditCategory />} />
              <Route path='*' element={<Box>erro 404</Box>} />
            </Routes>
          </Layout>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
