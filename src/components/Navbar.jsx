import { Link } from "react-router-dom";
import "../styles/components/navbar.css"
function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">EcoFinds</h1>
      <div className="space-x-4">
        <Link to="/home">Home</Link>
        <Link to="/add-product">Add Product</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/history">History</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;
