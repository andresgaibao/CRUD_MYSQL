import React from "react"
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import Login from "./components/Login";
import Register from "./components/Register";
import ProducList from "./components/ProducList";
import './../src/index.css';
import ProductForm from "./components/ProductForm";

function App() {
  axios.defaults.baseURL ='http://localhost:3000/api';
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/products' element={<ProducList/>}/>
            <Route path='/products/:id/edit' element={<ProductForm/>}/>
            <Route path='/products/new' element={<ProductForm/>}/> 
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
