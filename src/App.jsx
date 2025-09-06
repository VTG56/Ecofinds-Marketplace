import AppRouter from "./router";
import { AuthProvider } from "./context/AuthContext";
import "./styles/globals.css";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}


export default App;
