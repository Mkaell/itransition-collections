import { Container } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Navigation from './routes/Navigation';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<NavBar/>
				<Container maxWidth="lg">
					<Navigation/>
				</Container>
			</div>
		</BrowserRouter>	
	);
}

export default App;
