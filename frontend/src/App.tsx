import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import {Layout, LoginModal, RegisterModal} from './components';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout/>}>
    <Route path='login' element={<LoginModal/>}/>
    <Route path='register' element={<RegisterModal/>}/>
  </Route>
))
function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
