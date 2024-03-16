import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import {Layout} from './components';
import PrivateRoute from './components/PrivateRoute';
import { Register, Login, Dashboard } from './views';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout/>}>
    <Route path='login' element={<Login/>}/>
    <Route path='register' element={<Register/>}/>
    <Route element={<PrivateRoute/>}>
      <Route path='dashboard' element={<Dashboard/>}/>
    </Route>
  </Route>
))
function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
