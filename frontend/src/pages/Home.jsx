import React, { useState, useEffect } from 'react';
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";

const Home = () => {
  const navigate = useNavigate();
  const [firstUser, setFirstUser] = useState(null); // İlk kullanıcıyı saklamak için state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Oturum durumunu saklamak için state

  useEffect(() => {
    const loggedInUser = localStorage.getItem("posUser");
    if (loggedInUser) {
      setIsLoggedIn(true); // Kullanıcı oturum açmış olarak işaretle
      fetchUserData(loggedInUser); // Kullanıcı bilgilerini getir
    } else {
      navigate("/login");
      message.error("Giriş yapmadınız!");
    }
  }, [navigate]);

  const fetchUserData = (loggedInUser) => {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/users/get-all")
      .then(response => response.json())
      .then(data => {
        const foundUser = data.find(u => u.username === JSON.parse(loggedInUser).username
          && u.email === JSON.parse(loggedInUser).email);
        if (foundUser) {
          setFirstUser(foundUser);
        } else {
          message.error("Kullanıcı veritabanında bulunamadı!");
        }
      })
      .catch(error => console.error('Error fetching users:', error));
  };

  const handleLogout = () => {
    localStorage.removeItem("posUser");
    setIsLoggedIn(false); // Oturum kapatıldığında işareti kaldır
    navigate("/login");
    message.success("Başarıyla çıkış yaptınız.");
  };

  return (
    <>
      <Header />
      <div className="h-screen flex justify-center items-center">
        {isLoggedIn ? (
          firstUser ? (
            <div className="text-center">
              <h1 className="text-3xl mb-4">Hoş geldin, {firstUser.username}</h1>
              <p className="mb-8">E-posta: {firstUser.email}</p>
              <p className="mb-8">İd: {firstUser._id}</p>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
              >
                Çıkış Yap
              </button>
            </div>
          ) : (
            <p>
              Kullanıcı bilgileri yükleniyor...
            </p>
          )
        ) : null}
      </div>
    </>
  );
};

export default Home;
