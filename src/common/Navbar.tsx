/**
 * Credit to https://github.com/enochndika/kimia-UI
 */
import React from "react";
import { JsxElement } from "typescript";
import { Link } from "react-router-dom";
import useUser from "./UserContext";
import routes from "./routes";

export const NavbarPage = () => {
  const { state } = useUser();
  return (
    state.currentUser ?
      <Navbar className="bg-gray-700 text-white">
        <NavbarBrand href="#">
          <svg className="w-9 h-9" preserveAspectRatio="xMidYMid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.999 489.999">
            <g>
              <path fill="#FFBF00" d="M258.742,69.599H15.843v232.19h242.899V69.599z M237.438,280.484H37.147V90.903h200.29V280.484z"/>
              <path fill="#D4E6F1" d="M317.724,148.408v72.802h105.502l-58.452-72.802H317.724z M339.029,199.906v-30.194h15.531l24.249,30.194H339.029z"/>
              <path fill="#D4E6F1" d="M468.415,345.437V211.749l-89.295-107.77h-99.313v241.458h-85.343c-8.26-19.017-27.216-32.355-49.235-32.355
                c-22.018,0-40.975,13.338-49.235,32.355H0v21.304h91.573c0.001,29.589,24.072,53.659,53.656,53.659
                c29.585,0,53.655-24.07,53.656-53.659H320.46c0.001,29.589,24.072,53.659,53.656,53.659c29.585,0,53.655-24.07,53.656-53.659
                h62.228v-21.304H468.415z M145.229,399.096c-17.84,0-32.352-14.517-32.352-32.357c0-17.841,14.511-32.353,32.352-32.353
                s32.352,14.511,32.352,32.353C177.581,384.58,163.07,399.096,145.229,399.096z M374.116,399.096
                c-17.84,0-32.352-14.517-32.352-32.357c0-17.841,14.511-32.353,32.352-32.353c17.84,0,32.352,14.511,32.352,32.353
                C406.467,384.58,391.956,399.096,374.116,399.096z M447.111,345.437h-23.76c-8.26-19.017-27.216-32.355-49.235-32.355
                c-22.018,0-40.974,13.338-49.235,32.355h-23.77V125.283h68.001l77.998,94.143V345.437z"/>
              <path fill="#FFBF00" d="M70.155,215.9h63.226v19.598c0.45,12.139,13.628,12.35,17.434,8.218l60.387-49.802c2.869-2.178,7.229-9.996,0-16.436
                l-60.387-49.806c-4.941-4.551-16.639-3.217-17.434,8.218v19.603H70.155c-5.888,0-10.652,4.769-10.652,10.652v39.103
                C59.503,211.13,64.267,215.9,70.155,215.9z M80.807,176.797h63.226c5.889,0,10.652-4.77,10.652-10.652v-7.662l32.997,27.213
                l-32.997,27.207v-7.655c0-5.883-4.764-10.652-10.652-10.652H80.807V176.797z"/>
            </g>
          </svg>
        </NavbarBrand>
        <NavbarToggler />
        <NavbarCollapse>
          <NavbarNav orientation="start">
            <NavbarItem>
              <NavbarLink href="#" active={true} activeClass="text-lg text-blue-200 font-bold">
                TruckieApp
              </NavbarLink>
            </NavbarItem>        
          </NavbarNav>  
          <NavbarNav orientation="end">
            {routes.map((route, i) => (
              route.name === "Login" ?
                <></>  
              :
                <NavbarItem key={route.name}><NavbarLink href={route.path}>{route.name}</NavbarLink></NavbarItem>
            ))}
          </NavbarNav>
        </NavbarCollapse>
      </Navbar>
    :
      null
  );
};

/* Navbar logic */

const style = {
  navbar: `fixed px-4 py-2 shadow top-0 w-full lg:flex lg:flex-row lg:items-center lg:justify-start lg:relative`,
  brand: `cursor-pointer font-bold inline-block mr-4 py-1.5 text-2xl whitespace-nowrap hover:text-gray-200`,
  toggler: `block float-right text-4xl lg:hidden focus:outline-none focus:shadow`,
  item: `whitespace-pre cursor-pointer px-4 py-3 hover:text-gray-200`,
  collapse: {
    default: `border-t border-gray-400 fixed left-0 mt-2 shadow py-2 text-center lg:border-none lg:flex lg:flex-grow lg:items-center lg:mt-0 lg:py-0 lg:relative lg:shadow-none`,
    open: `h-auto visible transition-all duration-500 ease-out w-full opacity-100 lg:transition-none`,
    close: `h-auto invisible w-0 transition-all duration-300 ease-in lg:opacity-100 lg:transition-none lg:visible`,
  },
  nav: {
    start: `block mb-0 mr-auto pl-0 lg:flex lg:mb-0 lg:pl-0`,
    middle: `block mb-0 ml-auto pl-0 lg:flex lg:pl-0 lg:mb-0 lg:mx-auto`,
    end: `block pl-0 mb-0 ml-auto lg:flex lg:pl-0 lg:mb-0`,
  },
};

type navKey = keyof typeof style.nav;

type NavbarContext = {
  open: boolean,
  toggle: () => void,
}

const Context = React.createContext({} as NavbarContext);

const Navbar = (prop: { children: JSX.Element | JSX.Element[], className: string }) => {
  const [open, setOpen] = React.useState(false);
  const navbarRef = React.useRef<HTMLButtonElement>(null);

  const toggle = React.useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  // close navbar on click outside when viewport is less than 1024px
  React.useEffect(() => {
    const handleOutsideClick = (ev: Event) => {
      if (window.innerWidth < 1024) {
        if (!navbarRef.current?.contains(ev.target as Node)) {
          if (!open) return;
          setOpen(false);
        }
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [open, navbarRef]);

  return (
    <Context.Provider value={{ open, toggle }}>
      <nav ref={navbarRef} className={`${prop.className} ${style.navbar}`}>
        {prop.children}
      </nav>
    </Context.Provider>
  );
};

const useToggle = () => React.useContext(Context);

const NavbarBrand = (prop: { children: JSX.Element | JSX.Element[], href: string }) => (
  <a href={prop.href} className={style.brand}>
    <strong>{prop.children}</strong>
  </a>
);

const NavbarToggler = () => {
  const { toggle } = useToggle();
  return (
    <button
      type="button"
      aria-expanded="false"
      aria-label="Toggle navigation"
      className={style.toggler}
      onClick={toggle}
    >
      &#8801;
    </button>
  );
};

const NavbarCollapse = (prop: { children: JSX.Element | JSX.Element[] }) => {
  const { open } = useToggle();
  return (
    <div
      style={{ backgroundColor: 'inherit' }}
      className={`${style.collapse.default}
        ${open ? style.collapse.open : style.collapse.close}`}
    >
      {prop.children}
    </div>
  );
};

const NavbarNav = (prop: { children: JSX.Element | JSX.Element[] , orientation: navKey }) => (
  <ul className={style.nav[prop.orientation]}>{prop.children}</ul>
);

const NavbarItem = (prop: { children: JSX.Element | JSX.Element[] }) => <li className={style.item}>{prop.children}</li>;

const NavbarLink = (prop: { children: string, href: string, active?: boolean, activeClass?: string }) => (
  <Link to={prop.href} className={prop.active ? prop.activeClass : ''}>
    {prop.children}
  </Link>
);