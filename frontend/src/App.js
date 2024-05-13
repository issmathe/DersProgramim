import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import İletisim from "./pages/iletisim/İletisim.jsx"
import Deneme from "./pages/deneme/Deneme.jsx";
import Hakkimizda from "./pages/hakkimizda/Hakkimizda.jsx";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";


function App() {
  return (
      <Routes>
      <Route path="/" element={<Home/>} />  
      <Route path="/iletisim" element={<İletisim/>} />
      <Route path="/deneme" element={<Deneme/>} />
      <Route path="/hakkimizda" element={<Hakkimizda/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      </Routes>
  );
}
export default App;