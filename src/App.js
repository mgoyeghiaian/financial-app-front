import { Route, Routes, } from 'react-router-dom';
import Login from './pages/login/Login';
import Expenses from './pages/main/components/Expenses/Expenses';
import Home from './pages/main/components/Home/Home';
import Income from './pages/main/components/Income/Income';
import Total from './pages/main/components/Total/Total';
import Users from "./pages/users/Users"
function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='home' element={<Home />} />
      <Route path='income' element={<Income />} />
      <Route path='expenses' element={<Expenses />} />
      <Route path='total' element={<Total />} />
      <Route path='users' element={<Users />} />
    </Routes>
  );
}

export default App;
