import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import AdminPannel from './Components/AdminPannel.jsx'
import AddProduct from './Components/AddProduct.jsx'
import ViewData from './Components/ViewData.jsx'
import UpdateProduct from './Components/UpdateProduct.jsx'
import ClientApp from './ClientApp.jsx'
import Home from './client/Home.jsx'
import AdminLogin from './Components/AdminLogin.jsx'
import Protected from './Components/Protected.jsx'
import Cart from './client/Cart.jsx'
import ClientLogin from './client/ClientLogin.jsx'
import ClientRegister from './client/ClientRegister.jsx'
import ClientDetail from './client/ClientDetail.jsx'


const router = createBrowserRouter(
  createRoutesFromElements( 

    <>  
    {/* This files display user side------------------------------ */}
    <Route path='/' element={<ClientApp/>}>
     <Route path='' element={<Home/>}/>
     <Route path='/cart' element={<Cart/>} />
     <Route path='/clientLogin' element={<ClientLogin/>}/>
     <Route path='/clientSignup' element={<ClientRegister/>}/>
     <Route path='/clientDetail' element={<ClientDetail/>}/>
    </Route>


{/* Files to manage by Admin and display Admin side------------------------- */}
    <Route path='/admin' element={<App/>}>
    {/* <Route path='' element={<AdminPannel/>}/> */}
    <Route path='' element={
      <Protected>
        <AdminPannel/>
      </Protected>
    }/>

    {/* <Route path='/admin/addProduct' element={<AddProduct/>}/> */}
    <Route path='/admin/addProduct' element={
      <Protected> 
        <AddProduct/>
      </Protected>  // protected to protect the page by hiding, when you login then show the page
    }/>

    <Route path='/admin/viewData/:id' element={<ViewData/>}/>
    <Route path='/admin/updateData/:id' element={<UpdateProduct/>}/>
    <Route path='/admin/adminLogin/' element={<AdminLogin/>}/>
     </Route>

     </>  // it is a fragment use for grouping
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<RouterProvider router={router}/>
  </React.StrictMode>,
)
