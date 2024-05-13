import React from "react";
import Header from "../../components/header/Header";

const İletisim = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header/>
      <div className="container mx-auto py-20">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Adınız
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="p-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              E-posta Adresiniz
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="p-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-bold mb-2"
            >
              Mesajınız
            </label>
            <textarea
              id="message"
              rows="5"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          <div className="p-4 flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Gönder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default İletisim;
