import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashbord from "./pages/Admin/AdminDashbord";
import AddProduct from "./pages/Admin/AddProduct";
import Login from "./pages/Login";
import Footer from "./Components/Footer";
import SellPage from "./pages/Sell";
import AllProducts from "./pages/Admin/AllProducts";

import Categories from "./pages/Categories";
import DeleteProducts from "./pages/DeleteProducts"; 
import NotFound from "./pages/Notfound";

function App() {
  return (
    <Router>
     
  
      
      <Routes>
        {/* 👤 User Side Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="*" element={<NotFound />} />
        {/* Delete Products - OUTSIDE Admin */}
        <Route path="/delete-products" element={<DeleteProducts />} />
        
        {/*  Admin Side - NESTED Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashbord />} />
          <Route path="dashboard" element={<AdminDashbord />} />
          <Route path="all-products" element={<AllProducts />} />
          <Route path="add-product" element={<AddProduct />} />
        </Route>
      </Routes>

      {/* Footer always visible */}
      <Footer />
    </Router>
  );
}

export default App;
