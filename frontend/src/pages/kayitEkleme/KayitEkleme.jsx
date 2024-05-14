import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../components/header/Header";

const KayitEkleme = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Tüm kullanıcıları almak için API'ye istek yap
    axios.get('http://localhost:5000/api/users/get-all')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users: ', error);
      });
  }, []); // Boş bağımlılık dizisi, yalnızca bir kez yürütülmesini sağlar

  return (
    <div>
        <Header/>
      <h2>Kullanıcılar</h2>
      <ul>
        {users.map(user => (
          <li key={user.idDegeri}>
            Adı: {user.username}  ID: {user._id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KayitEkleme;
