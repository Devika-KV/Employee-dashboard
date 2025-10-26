import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async ()=>{
    setLoading(true);
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(()=>{ fetchProducts(); }, []);

  const handleDelete = async (id)=>{
    if(!window.confirm('Delete this product?')) return;
    await fetch('/api/products/'+id, { method: 'DELETE', headers:{ 'Authorization': 'Bearer ' + (localStorage.getItem('token')||'') } });
    setProducts(p=>p.filter(x=>x._id!==id));
  };

  if(loading) return <div className="container card">Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        <h3>Products</h3>
        <table className="table">
          <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
          <tbody>
            {products.map(p=>(
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <Link to={'/edit/'+p._id}><button className="btn">Update</button></Link>
                  <button className="btn danger" style={{marginLeft:8}} onClick={()=>handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
