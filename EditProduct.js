import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProduct(){
  const { id } = useParams();
  const [form, setForm] = useState({name:'',description:'',price:0,category:'',stock:0});
  const navigate = useNavigate();

  useEffect(()=>{
    const load = async ()=>{
      const res = await fetch('/api/products/'+id);
      if(res.ok){
        const data = await res.json();
        setForm(data);
      } else {
        alert('Product not found');
        navigate('/');
      }
    };
    load();
  },[id]);

  const onChange = e => setForm({...form,[e.target.name]: e.target.value});
  const onSubmit = async e=>{
    e.preventDefault();
    await fetch('/api/products/'+id, {
      headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer ' + (localStorage.getItem('token')||'') },
      method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)
    });
    navigate('/');
  };

  return (
    <div className="container card">
      <h3>Edit Product</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"><label>Product Name</label><input name="name" value={form.name||''} onChange={onChange} required /></div>
        <div className="form-group"><label>Description</label><textarea name="description" value={form.description||''} onChange={onChange} /></div>
        <div className="form-group"><label>Price</label><input type="number" name="price" value={form.price||0} onChange={onChange} required /></div>
        <div className="form-group"><label>Category</label><input name="category" value={form.category||''} onChange={onChange} /></div>
        <div className="form-group"><label>Stock Quantity</label><input type="number" name="stock" value={form.stock||0} onChange={onChange} required /></div>
        <button className="btn primary" type="submit">Save Changes</button>
      </form>
    </div>
  );
}
