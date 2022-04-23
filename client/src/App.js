import React from 'react';
import { Container, Paper } from '@mui/material';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Navigation from './routes/Navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';



export const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

// const theme = createTheme({
// 	palette: {
// 		mode: 'light',
// 	},
//   });
function App() {
	const [mode, setMode] = React.useState('light');
	const colorMode = React.useMemo(
	  () => ({
		toggleColorMode: () => {
		  setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
		},
	  }),
	  [],
	);
  
	const theme = React.useMemo(
	  () =>
		createTheme({
		  palette: {
			mode,
		  },
		}),
	  [mode],
	);

	return (
		
			<BrowserRouter>
			<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
					<Paper style={{height: '100vh'}}>
					<NavBar/>
						<Container maxWidth="lg">
							<Navigation/>
						</Container>
					</Paper>
					
				</ThemeProvider>
			</ColorModeContext.Provider>
				
			</BrowserRouter>	
		
		
	);
}

export default App;
