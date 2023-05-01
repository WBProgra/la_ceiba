import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/home/Home";
import Category from "./Pages/category/Category";
import Product from "./Pages/product/Product";
import Report from "./Pages/reports/Report";

const Rutas = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="category" element={<Category />} />
      <Route path="products" element={<Product />} />
      <Route path="reports" element={<Report />} />
      
    </Routes>
  );
};

export default Rutas;
