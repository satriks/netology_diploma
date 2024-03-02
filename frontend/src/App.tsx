import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// import FileItem from "./components/FileItem/FileItem";
import FileList from "./components/FIleList/FIleList";

function App() {
  const [count, setCount] = useState(0);
  const list = [1, 2, 3, 4, 5];
  return (
    <>
      <Header />
      <FileList />
      <Footer />
    </>
  );
}

export default App;
