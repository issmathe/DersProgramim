import React, { useState } from "react";
import axios from "axios";

const KayitEkleme = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [idDegeri, setIdDegeri] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleIdDegeriChange = (event) => {
    setIdDegeri(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users/add", {
        name,
        surname,
        idDegeri
      });
      
      setSuccessMessage("Kayıt başarıyla eklendi!");
      setName("");
      setSurname("");
      setIdDegeri("");
    } catch (error) {
      setErrorMessage("Kayıt eklenirken bir hata oluştu.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Kayıt Ekleme</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ad:</label>
          <input type="text" value={name} onChange={handleNameChange} required />
        </div>
        <div>
          <label>Soyad:</label>
          <input type="text" value={surname} onChange={handleSurnameChange} required />
        </div>
        <div>
          <label>ID Değeri:</label>
          <input type="text" value={idDegeri} onChange={handleIdDegeriChange} required />
        </div>
        <button type="submit">Kaydet</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default KayitEkleme;
