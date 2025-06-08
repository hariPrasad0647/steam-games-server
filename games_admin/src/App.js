import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Components/homePage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path ="/" Component={HomePage} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
