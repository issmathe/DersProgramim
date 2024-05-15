import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import { message } from "antd";

const Hakkimizda = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ name: "", surname: "" });
  const [loggedInUserId, setLoggedInUserId] = useState("");

  useEffect(() => {
    fetchData();
    const loggedInUser = localStorage.getItem("posUser");
    if (loggedInUser) {
      fetchLoggedInUserId(loggedInUser);
    } else {
      message.error("Giriş yapmadınız!!");
    }
  }, []);

  const fetchLoggedInUserId = async (loggedInUser) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/get-all");
      const data = await response.json();
      const foundUser = data.find(
        (u) =>
          u.username === JSON.parse(loggedInUser).username &&
          u.email === JSON.parse(loggedInUser).email
      );
      if (foundUser) {
        setLoggedInUserId(foundUser._id);
      } else {
        message.error("Kullanıcı veritabanında bulunamadı!");
      }
    } catch (error) {
      console.error("Error fetching logged in user id:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/api"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = loggedInUserId; // Giriş yapan kullanıcının ID'sini al
      const newFormData = { ...formData, id }; // Kullanıcının ID'si ile formData'yı güncelle
      await axios.post(process.env.REACT_APP_SERVER_URL + "/api", newFormData);
      fetchData();
      setFormData({ name: "", surname: "" });
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(process.env.REACT_APP_SERVER_URL + `/api/${itemId}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
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