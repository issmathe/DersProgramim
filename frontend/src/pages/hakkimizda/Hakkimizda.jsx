import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import { message } from "antd";

// Mesaj konfigürasyonunu global olarak ayarlıyoruz
message.config({
  top: 80, // Mesajın ekranın üstünden uzaklığı (piksel cinsinden)
  duration: 2, // Mesajın ekranda kalma süresi (saniye cinsinden)
  maxCount: 3, // Aynı anda gösterilebilecek maksimum mesaj sayısı
});

const Hakkimizda = () => {
  const [data, setData] = useState([]); // Veri durumu
  const [formData, setFormData] = useState({ name: "", surname: "" }); // Form veri durumu
  const [loggedInUserId, setLoggedInUserId] = useState(""); // Giriş yapan kullanıcının kimliği

  useEffect(() => {
    fetchData(); // Verileri almak için useEffect kullanımı
    const loggedInUser = localStorage.getItem("posUser");
    if (loggedInUser) {
      fetchLoggedInUserId(loggedInUser); // Giriş yapan kullanıcının kimliğini almak için useEffect kullanımı
    } else {
      message.error("Giriş yapmadınız!!"); // Hata mesajı
    }
  }, []);

  // Giriş yapan kullanıcının kimliğini almak için fonksiyon
  const fetchLoggedInUserId = async (loggedInUser) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/get-all`);
      const data = await response.json();
      const parsedUser = JSON.parse(loggedInUser);
      const foundUser = data.find(
        (u) => u.username === parsedUser.username && u.email === parsedUser.email
      );
      if (foundUser) {
        setLoggedInUserId(foundUser._id);
      } else {
        message.error("Kullanıcı veritabanında bulunamadı!"); // Hata mesajı
      }
    } catch (error) {
      console.error("Error fetching logged in user id:", error); // Hata mesajı
      message.error("Giriş yapan kullanıcının kimliği alınamadı!");
    }
  };

  // Verileri almak için fonksiyon
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api`);
      setData(response.data); // Verileri ayarla
    } catch (error) {
      console.error("Error fetching data:", error); // Hata mesajı
      message.error("Veriler alınamadı!");
    }
  };

  // Form değerlerini güncellemek için fonksiyon
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form gönderildiğinde çalışan fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = loggedInUserId; // Giriş yapan kullanıcının kimliğini al
      const newFormData = { ...formData, id }; // Kullanıcının kimliği ile formData'yı güncelle
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api`, newFormData);
      fetchData(); // Verileri yeniden al
      setFormData({ name: "", surname: "" }); // Form verilerini temizle
      message.success("Veri başarıyla eklendi!"); // Başarı mesajı
    } catch (error) {
      console.error("Error adding data:", error); // Hata mesajı
      message.error("Veri eklenemedi!");
    }
  };

  // Öğeyi silmek için fonksiyon
  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/${itemId}`);
      fetchData(); // Verileri yeniden al
      message.success("Veri başarıyla silindi!"); // Başarı mesajı
    } catch (error) {
      console.error("Error deleting data:", error); // Hata mesajı
      message.error("Veri silinemedi!");
    }
  };

  return (
    <div className="container mx-auto">
      <Header />
      <div className="mx-4 md:mx-24 lg:mx-48 xl:mx-96 my-6">
        <h1 className="text-3xl font-bold mb-4 text-center bg-slate-300">
          Kayıtlar bunlar
        </h1>
        <h1 className="text-xl font-bold mb-4 text-center">
          Giriş yapan kullanıcının ID'si: {loggedInUserId}
        </h1>
        <form onSubmit={handleSubmit} className="mb-4 text-center">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="border rounded-md px-4 py-2 mr-2 mb-2 w-full md:w-auto focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Surname"
            required
            className="border rounded-md px-4 py-2 mr-2 mb-2 w-full md:w-auto focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full md:w-auto"
          >
            Add
          </button>
        </form>
        <ul>
          {data
            .filter((item) => item.id === loggedInUserId) // Sadece giriş yapan kullanıcının ID'sine sahip verileri filtrele
            .map((item, index) => (
              <li
                key={index}
                className="flex flex-col md:flex-row items-center justify-between border-b py-2"
              >
                <span className="mb-2 md:mb-0">
                  {item.name} - {item.surname}
                </span>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600"
                >
                  silmek
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Hakkimizda;
