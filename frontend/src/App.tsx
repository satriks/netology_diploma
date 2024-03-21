import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import FileList from "./components/Files/FIleList/FIleList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import AuthorisationForm from "./components/LoginForm/AuthorisationForm";
import { useAppSelector } from "./models/hooks";
import ChangeFileForm from "./components/Files/ChangeFileForm/ChangeFileForm";
import AdminPanel from "./components/AdminPanel/AdminPanel";

function App() {
  const authorization = useAppSelector((state) => state.authorization);

  // const list = [1, 2, 3, 4, 5];
  return (
    <BrowserRouter>
      <Header />
      {authorization && <AuthorisationForm />}
      {/* <ChangeFileForm /> */}
      {/* <AddNewFile /> */}
      <Routes>
        <Route path="/" element={<FileList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPanel />} />y
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
