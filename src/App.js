import './App.css';
import { Route, Routes, BrowserRouter, Router } from 'react-router-dom';
import Login from './pages/login/Login';
import Expenses from './pages/main/components/Expenses/Expenses';
import Home from './pages/main/components/Home/Home';
import Income from './pages/main/components/Income/Income';
import Total from './pages/main/components/Total/Total';
import Manage from './pages/main/components/Manage/Manage';
import Users from "./pages/users/Users"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='home' element={<Home />} />
        <Route path='income' element={<Income />} />
        <Route path='expenses' element={<Expenses />} />
        <Route path='total' element={<Total />} />
        <Route path='manage' element={<Manage />} />
        <Route path='users' element={<Users />} />
      </Routes>
    </BrowserRouter >

  );
}

export default App;
