import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar(){
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  return (
    <nav className="nav">
      <h2 style={{margin:0}}>Admin</h2>
      <div style={{flex:1}} />
      <NavLink to="/" end className={({isActive})=>isActive? 'active' : ''}>Dashboard</NavLink>
      <NavLink to="/add" className={({isActive})=>isActive? 'active' : ''}>Add Product</NavLink>
      {token ? (
        <a href="#" onClick={()=>{localStorage.removeItem('token');window.location.reload();}}>Logout</a>
      ) : (
        <NavLink to="/login" className={({isActive})=>isActive? 'active' : ''}>Login</NavLink>
      )}
    </nav>
  );
}
