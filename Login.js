import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({username:'', password:''});
  const navigate = useNavigate();

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});
  const onSubmit = async e=>{
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)
    });
    if(res.ok){
      const data = await res.json();
      localStorage.setItem('token', data.token);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container card">
      <h3>Admin Login</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"><label>Username</label><input name="username" value={form.username} onChange={onChange} required /></div>
        <div className="form-group"><label>Password</label><input type="password" name="password" value={form.password} onChange={onChange} required /></div>
        <button className="btn primary" type="submit">Login</button>
      </form>
    </div>
  );
}
