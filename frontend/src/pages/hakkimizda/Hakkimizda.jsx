import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import { message } from "antd";

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
      const foundUser = data.find(
        (u) =>
          u.username === JSON.parse(loggedInUser).username &&
          u.email === JSON.parse(loggedInUser).email
      );
      if (foundUser) {
        setLoggedInUserId(foundUser._id);
      } else {
        message.error("Kullanıcı veritabanında bulunamadı!"); // Hata mesajı
      }
    } catch (error) {
      console.error("Error fetching logged in user id:", error); // Hata mesajı
    }
  };

  // Verileri almak için fonksiyon
  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/api"
      );
      setData(response.data); // Verileri ayarla
    } catch (error) {
      console.error("Error fetching data:", error); // Hata mesajı
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
      await axios.post(process.env.REACT_APP_SERVER_URL + "/api", newFormData);
      fetchData(); // Verileri yeniden al
      setFormData({ name: "", surname: "" }); // Form verilerini temizle
    } catch (error) {
      console.error("Error adding data:", error); // Hata mesajı
    }
  };

  // Öğeyi silmek için fonksiyon
  const handleDelete = async (itemId) => {
    try {
      await axios.delete(process.env.REACT_APP_SERVER_URL + `/api/${itemId}`);
      fetchData(); // Verileri yeniden al
    } catch (error) {
      console.error("Error deleting data:", error); // Hata mesajı
    }
  };

  return (
    <div className="container mx-auto">
      <Header />
      <div className="mx-96 my-6">
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
            className="border rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Surname"
            required
            className="border rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Add
          </button>
        </form>
        <ul className="">
          {data
            .filter((item) => item.id === loggedInUserId) // Sadece giriş yapan kullanıcının ID'sine sahip verileri filtrele
            .map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b py-2"
              >
                <span>
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
