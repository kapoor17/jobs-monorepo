import './App.css';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import {Layout, PublicRoute, PrivateRoute} from './components';
import { Register, Login, Dashboard, EditPage } from './views';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout/>}>
    {/**
     * This is the Route to redirect users to /dashboard
     * when the user visits the index route
     */}
    <Route index element={<Navigate to={'/dashboard'}/>}/>
    {/**
     * This is the Route for all the Public Route
     * This Route redirects to /dashboard if user is 
     * authenticated
     */}
    <Route element={<PublicRoute/>}>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
    </Route>
    {/**
     * This is the Route for all the Private Route
     * This Route redirects to /login if user is not
     * authenticated
     */}
    <Route element={<PrivateRoute/>}>
      <Route path='dashboard' element={<Dashboard/>}/>
      <Route path='edit/:_id' element={<EditPage/>}/>
    </Route>
  </Route>
))
function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
