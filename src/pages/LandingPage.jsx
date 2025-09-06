import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 flex flex-col justify-between">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-20 px-4">
        <h1 className="text-5xl font-extrabold text-green-800 mb-4">
          Welcome to EcoFinds 🌿
        </h1>
        <p className="text-lg text-green-700 max-w-xl mb-8">
          Discover and buy eco-friendly products from local sellers.  
          Save the planet while shopping smart!
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-white border-2 border-green-600 text-green-600 font-semibold rounded-lg shadow hover:bg-green-100 transition"
          >
            Login
          </button>
        </div>
      </section>

      {/* Features / Info Section */}
      <section className="flex flex-col items-center text-center mb-20 px-4">
        <h2 className="text-3xl font-bold text-green-800 mb-6">
          Why EcoFinds?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          <div className="p-4 bg-white rounded-xl shadow">
            <h3 className="font-semibold text-green-700 mb-2">Eco-Friendly</h3>
            <p>All products are sustainable and good for the environment.</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow">
            <h3 className="font-semibold text-green-700 mb-2">Local Sellers</h3>
            <p>Support small businesses and local artisans in your community.</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow">
            <h3 className="font-semibold text-green-700 mb-2">Easy & Safe</h3>
            <p>Secure checkout, smooth shopping experience, all in one place.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
