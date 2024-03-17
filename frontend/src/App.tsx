import './App.css';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import {Layout} from './components';
import PrivateRoute from './components/PrivateRoute';
import { Register, Login, Dashboard, EditPage } from './views';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout/>}>
    <Route index element={<Navigate to={'/dashboard'}/>}/>
    <Route path='login' element={<Login/>}/>
    <Route path='register' element={<Register/>}/>
    <Route element={<PrivateRoute/>}>
      <Route path='dashboard' element={<Dashboard/>}/>
      <Route path='edit/:_id' element={<EditPage/>}/>
    </Route>
  </Route>
))
function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
