import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddProduct(){
  const [form, setForm] = useState({name:'',description:'',price:0,category:'',stock:0});
  const navigate = useNavigate();

  const onChange = e => setForm({...form,[e.target.name]: e.target.value});
  const onSubmit = async e=>{
    e.preventDefault();
    await fetch('/api/products', {
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + (localStorage.getItem('token')||'')
      },
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)
    });
    navigate('/');
  };

  return (
    <div className="container card">
      <h3>Add Product</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"><label>Product Name</label><input name="name" value={form.name} onChange={onChange} required /></div>
        <div className="form-group"><label>Description</label><textarea name="description" value={form.description} onChange={onChange} /></div>
        <div className="form-group"><label>Price</label><input type="number" name="price" value={form.price} onChange={onChange} required /></div>
        <div className="form-group"><label>Category</label><input name="category" value={form.category} onChange={onChange} /></div>
        <div className="form-group"><label>Stock Quantity</label><input type="number" name="stock" value={form.stock} onChange={onChange} required /></div>
        <button className="btn primary" type="submit">Add Product</button>
      </form>
    </div>
  );
}
