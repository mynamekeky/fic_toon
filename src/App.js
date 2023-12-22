import { Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './Component/Login';
import Main_page from './Component/Main';
import Homepage from './Component/Homepage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="main_page" element={<Main_page/>} />
      </Routes>
    </div>
  );
}

export default App;
