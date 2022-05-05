import React from 'react';
import { Container, CssBaseline, Paper, ScopedCssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Navigation from './routes/Navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import  {reducers}   from './store/reducers';

const store = createStore(reducers , {}, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
export const ColorModeContext = React.createContext({ toggleColorMode: () => {} })


function App() {
	const [mode, setMode] = React.useState('dark');
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
			<Provider store={store}>
				<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
						<NavBar/>
						<Container maxWidth="xl">
							<Navigation/>
						</Container>
					</ThemeProvider>
				</ColorModeContext.Provider>
			</Provider>	
		</BrowserRouter>	
	);
}

export default App;
