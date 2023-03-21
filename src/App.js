import './App.css';
import { BrowserRouter, HashRouter, Route, Routes, } from 'react-router-dom';
import { Navigate, Outlet } from "react-router-dom";
import Login from './pages/login/Login';
import Expenses from './pages/main/components/Expenses/Expenses';
import Home from './pages/main/components/Home/Home';
import Income from './pages/main/components/Income/Income';
import Users from "./pages/users/Users"

function App() {
  const useAuth = () => {
    const userToken = sessionStorage.getItem('userToken');
    return userToken;
  }

  const useAdmin = () => {
    const userType = sessionStorage.getItem('userType');
    return userType === "1";
  }

  return (
      <Routes>
        <Route path='/' element={<Login />} exact />
        <Route element={useAuth() ? <Outlet /> : <Navigate to="/" />}>
          <Route path='home' element={<Home />} />
          <Route path='income' element={<Income />} />
          <Route path='expenses' element={<Expenses />} />
        </Route>
        <Route element={useAdmin() ? <Outlet /> : <Navigate to="/home" />}>
          <Route path='users' element={<Users />} />
        </Route>
      </Routes>

  );
}

export default App;