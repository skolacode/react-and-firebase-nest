import {
  Outlet,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#e9f910',
    },
    secondary: {
      main: '#100202',
    },
    myColors: {
      main: '#3e590a'
    }
  }
});

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <div>
        <NavBar />
        <main>
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App;
