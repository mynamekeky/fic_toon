import { Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './Component/Login';
import Main_page from './Component/Main';
import Homepage from './Component/Homepage';
import Register from './Component/Register';
import Createpage from './Component/Createpage';
import Workpage from './Component/Workpage';
import Storypage from './Component/Storypage';
import Storyupdate from './Component/Storyupdate';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="main_page" element={<Main_page/>} />
        <Route path="register" element={<Register/>} />
        <Route path="createpage" element={<Createpage/>} />
        <Route path="workpage" element={<Workpage/>} />
        <Route path="storypage/:id" element={<Storypage/>} />
        <Route path="storyupdate/:id" element={<Storyupdate/>} />
        

      </Routes>
    </div>
  );
}

export default App;
