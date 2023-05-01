import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import Rutas from "./routes";
import NavbarComponent from "./components/Navbar/Navbar";

export default function App() {
  return (
    <BrowserRouter>

      <NavbarComponent/>
      <Rutas />
    </BrowserRouter>
  );
}
