import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import FileList from "./components/Files/FIleList/FIleList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import AuthorisationForm from "./components/LoginForm/AuthorisationForm";
import { useAppSelector } from "./models/hooks";
import AddNewFile from "./components/Files/AddNewFileForm/AddNewFile";

function App() {
  const isLogin = useAppSelector((state) => state.token);

  // const list = [1, 2, 3, 4, 5];
  return (
    <BrowserRouter>
      <Header />
      {!isLogin && <AuthorisationForm />}
      {/* <AddNewFile /> */}
      <Routes>
        <Route path="/" element={<FileList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<FileList />} />y
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
