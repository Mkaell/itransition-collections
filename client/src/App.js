import React, { useState } from 'react';
import { Container, CssBaseline, Paper, ScopedCssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import {IntlProvider} from "react-intl";
import NavBar from './components/NavBar/NavBar';
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
import ResponsiveAppBar from './components/NavBar/TestNavbar';

const store = createStore(reducers , {}, compose(applyMiddleware(thunk)));
export const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

const messages = {
	[locales.EN]: enMessages,
	[locales.RU]: ruMessages,
	[locales.PL]: plMessages
};

function App() {

	const [mode, setMode] = useState('dark');
	const [currentLocale, setCurrentLocale] = useState(localStorage.getItem('app.localization') || locales.EN);

	const colorMode = React.useMemo(
	  () => ({
		toggleColorMode: () => {
		  setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
		},
	  }),
	  [],
	);
	console.log(local[localesMui.RU]);
	const theme = React.useMemo(
	  () => createTheme({
		  palette: {
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
							{/* <NavBar  
								currentLocale={currentLocale}
								setCurrentLocale={setCurrentLocale}
							/> */}
							<ResponsiveAppBar
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
