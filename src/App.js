import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import { grey } from '@mui/material/colors';
import DetailNews from './pages/DetailNews';
import Error505 from './pages/Error505';
import Error404 from './pages/Error404';
import Register from './pages/Register';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: grey[200],
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Playfair Display"',
      'serif'
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/Error505' element={<Error505/>}/>
          <Route path='/' element={<Layout/>}>
            <Route index element={<HomePage />} />
            <Route path='/testing' element={<></>}/>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/detail/:newsID' element={<DetailNews/>}/>
          </Route>
          <Route path='*' element={<Error404/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
