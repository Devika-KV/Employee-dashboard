import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

export default function App(){
  return (
    <div>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/add" element={<AddProduct/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/edit/:id" element={<EditProduct/>} />
        </Routes>
      </main>
    </div>
  );
}
