import { useEffect } from "react";
import Button from "../Button/Button";
import "./Login.css";
import { isLoggedIn } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedIn = await isLoggedIn();
        if (loggedIn) {
          navigate("/welcome");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogin = () =>
    (window.location.href =
      "http://localhost:8080/oauth2/authorization/google");

  return (
    <div>
      <h2>Klikk for å logge inn eller registrere bruker:</h2>
      <Button className="login_button" onClick={handleLogin}>
        <p>Logg inn med Google</p>
      </Button>
    </div>
  );
};

export default Login;
