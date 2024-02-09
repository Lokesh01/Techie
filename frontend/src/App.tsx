import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Chat, Home, Login, Notfound, Signup } from "./pages";
import { useAuth } from "./context/AuthContext";

function App() {
  const auth = useAuth();
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {auth?.isLoggedIn && auth?.user && (
          <Route path="/chat" element={<Chat />} />
        )}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </main>
  );
}

export default App;
