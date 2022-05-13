import React, { createContext, useMemo, useState } from 'react';
import { Container, CssBaseline,} from '@mui/material';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {IntlProvider} from "react-intl";
import Navigation from './routes/Navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import locales from "./utils/localizations/constant/locales";
import  {reducers}   from './store/reducers';
import enMessages from "./utils/localizations/en.json";
import ruMessages from "./utils/localizations/ru.json";
import plMessages from "./utils/localizations/pl.json";
import * as local from '@mui/material/locale';
import localesMui from './utils/localizations/constant/localesMui';
import Navbar from './components/NavBar/Navbar';

const store = createStore(reducers , {}, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
export const ColorModeContext = createContext({ toggleColorMode: () => {} })

const messages = {
	[locales.EN]: enMessages,
	[locales.RU]: ruMessages,
	[locales.PL]: plMessages
};

function App() {

	const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');
	const [currentLocale, setCurrentLocale] = useState(localStorage.getItem('app.localization') || locales.EN);

	useEffect(() => {
		localStorage.setItem('theme', mode);
	}, [mode])
	
	const colorMode = useMemo(
	  () => ({
		toggleColorMode: () => {	
		  	setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
		},
	  }),
	  [],
	);
	
	const theme = useMemo(
	  () => createTheme({
		  palette: {
			primary: {
				main: '#ff9800',
			  },
			  secondary: {
				main: '#f50057',
			  },
			  info: {
				main: '#ff9800',
			  },
			mode,
		  },
		}, local[localesMui[currentLocale]] ),
	  [currentLocale, mode],
	);

	return (
		
		<BrowserRouter>
			<Provider store={store}>
				<IntlProvider locale={currentLocale} messages={messages[currentLocale]}>
					<ColorModeContext.Provider value={colorMode}>
						<ThemeProvider theme={theme}>
							<CssBaseline />
							<Navbar
								currentLocale={currentLocale}
								setCurrentLocale={setCurrentLocale}/>
							<Container maxWidth="lg">
								<Navigation/>
							</Container>
						</ThemeProvider>
					</ColorModeContext.Provider>
				</IntlProvider>	
			</Provider>	
		</BrowserRouter>	
	);
}

export default App;
