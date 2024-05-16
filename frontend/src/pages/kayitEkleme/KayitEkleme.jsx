import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../components/header/Header";

const KayitEkleme = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null); // Giriş yapan kullanıcının ID'sini saklayacak state

  useEffect(() => {
    // Tüm kullanıcıları almak için API'ye istek yap
    axios.get('http://localhost:5000/api/users/get-all')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users: ', error);
      });

    // Örnek olarak, giriş yapan kullanıcının JWT'sini aldığımızı varsayalım ve onun ID'sini belirleyelim
    const loggedInUserJWT = localStorage.getItem('userJWT'); // Örnek: localStorage'da kullanıcının JWT'sini saklamışsınız
    if (loggedInUserJWT) {
      // Kullanıcı JWT'sini kullanarak, giriş yapan kullanıcının ID'sini belirleyin
      axios.post('http://localhost:5000/api/users/get-user-id', { jwt: loggedInUserJWT })
        .then(response => {
          setLoggedInUserId(response.data.userId);
        })
        .catch(error => {
          console.error('Error fetching logged in user ID: ', error);
        });
    }
  }, []); // Boş bağımlılık dizisi, yalnızca bir kez yürütülmesini sağlar

  return (
    <div>
      <Header />
      <h2>Kullanıcılar</h2>
      <ul>
  {users.map((user, index) => (
    <li key={index}>
      Adı: {user.username}  ID: {user._id}
      {loggedInUserId === user._id && <span> (Giriş yapan kullanıcı)</span>}
    </li>
  ))}
</ul>

    </div>
  );
};

export default KayitEkleme;
