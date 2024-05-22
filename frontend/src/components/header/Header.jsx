import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("posUser");
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between w-full h-16 bg-gray-800 px-8">
      <div className="h-16 w-16"></div>
      <nav>
        <ul className="flex gap-4 text-sm md:text-base">
          <li>
            <Link to="/" className="text-white">
              ANASAYFA
            </Link>
          </li>
          <li>
            <Link to="/hakkimizda" className="text-white">
              HAKKIMIZDA
            </Link>
          </li>
          <li>
            <Link to="/deneme" className="text-white">
              DENEME
            </Link>
          </li>
          <li>
            <Link to="/iletisim" className="text-white">
              İLETİŞİM
            </Link>
          </li>
          <li>
            <Link to="/kayit" className="text-white">
              KAYIT
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex gap-4">
        <button
          className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm md:text-base"
          onClick={handleLogout}
        >
          Çıkış
        </button>
      </div>
    </header>
  );
};

export default Header;
