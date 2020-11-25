import React, { useState } from "react";
import Transcoded from "./components/Transcoded";
import "./App.css";

const App = () => {
  const [userState, setUserState] = useState({
   
    data: {},
    error: "",
  });

  const handleSearch = (data) => {
    setUserState({
      isLoggedIn: true,
      data,
    });
  };
  return (
    <div className="app">
    <Transcoded user={userState} onSearch={handleSearch} />;
    </div>
  );
};

export default App;