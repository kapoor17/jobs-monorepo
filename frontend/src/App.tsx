import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import {Layout, LoginModal, RegisterModal, Dashboard} from './components';
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout/>}>
    <Route path='login' element={<LoginModal/>}/>
    <Route path='register' element={<RegisterModal/>}/>
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
