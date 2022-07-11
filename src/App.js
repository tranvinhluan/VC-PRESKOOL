import React from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRouter from "./components/PrivateRouter";
import routers from "./routers/router";
import { setUser } from "./redux/_user";
import Home from "./pages/Home.jsx";

function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {routers.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                route.private === true ? (
                  <PrivateRouter>{route.element}</PrivateRouter>
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Routes>
      </BrowserRouter>

      <Home />
    </div>
  );
}

export default App;
