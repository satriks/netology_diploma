import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import FileList from "./components/FIleList/FIleList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/Profile";

function App() {
  // const list = [1, 2, 3, 4, 5];
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<FileList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<FileList />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
