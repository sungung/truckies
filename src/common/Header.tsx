import routes from "./routes";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-teal-5">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-set">
        <div className="lg:flex flex-grow items-center flex">
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            {routes.map((route, i) => (
              <li key={i} className="nav-item">
                <Link to={route.path}>{route.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;