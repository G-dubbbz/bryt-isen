import "./Header.css";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import LightButton from "../LightButton/LightButton";


function Header() {
  return (
    <>
      <div className="header-row-1">
        <LightButton />
        <h1>Get2KnowU</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="#ffffff"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
        </svg>
      </div>
      <div className="header-links">
        <CustomLink to="/">Top Games</CustomLink>
        <CustomLink to="/favorites">Favorites</CustomLink>
        <CustomLink to="/all">All Games</CustomLink>
      </div>
    </>
  );
}

function CustomLink({
  to,
  children,
  ...props
}: {
  to: string;
  children: React.ReactNode;
}) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <Link to={to} {...props} className={isActive ? "active" : ""}>
      {children}
    </Link>
  );
}

export default Header;
