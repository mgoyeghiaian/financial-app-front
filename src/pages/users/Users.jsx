import React, { useState, useEffect } from 'react';
import './Users.css';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const Users = () => {
  const [admin, setAdmin] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editName, setEditName] = useState('');
const [editEmail, setEditEmail] = useState('');
const [editPassword, setEditPassword] = useState('');

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    const result = await axios.get('http://localhost:8000/api/users');
    const latest1 = result.data.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setAdmin(latest1);
  };

  const deleteAdmin = async (id) => {
    const token = sessionStorage.getItem('userToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`http://localhost:8000/api/users/${id}`, config);
    loadAdmins();
  };
  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setEditName(admin.name);
    setEditEmail(admin.email);
    setEditPassword(admin.password);
    setShowEdit(true);
  };

  const handleSave = async () => {
    const token = sessionStorage.getItem('userToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.put(`http://localhost:8000/api/users/${selectedAdmin.id}`, {
      name: editName,
      email: editEmail,
      password: editPassword,
    }, config);
    setEditName('');
    setEditEmail('');
    setEditPassword('');
    setSelectedAdmin({});
    setShowEdit(false);
    loadAdmins();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const token = sessionStorage.getItem('userToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.post('http://localhost:8000/api/register', formData, config);
      loadAdmins();
      e.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="users-body">
      <div className="users-left">
        <Navbar />
      </div>
      <div className="users-right">
        <header className="users-header">
          <h1>Add Users?</h1>
          <form onSubmit={handleSubmit} className="users-form">
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="usr-frm-sbmt">
              Add User
            </button>
          </form>
        </header>
        <h2 className='users-h2'>Users</h2>
        <main className="users-main">
          {admin.map((admin, index) => (
            <div key={index}>
              <p>{admin.name}</p>
              <p>{admin.email}</p>
              <p>{admin.id}</p>
              <button className="tbl-btn" onClick={() => handleEdit(admin)}>
                Edit
              </button>
              <button className="tbl-btn" onClick={() => deleteAdmin(admin.id)}>
                Delete
              </button>
            </div>
          ))}
        </main>
        {showEdit && (
          <div className="edit-form">
            <h2>Edit User</h2>
            <form onSubmit={handleSave}>
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  required 
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                />
              </div>
              <button type="submit">Save</button>
            </form>
          </div>
        )}
        </div>
    </div>
  )
}

 export default Users