# Typescript Tips

## children props - JSX.Element | JSX.Element[]
const NavbarItem = ({ children }}) => <li className={style.item}>{children}</li>;
const NavbarItem = (prop: { children: JSX.Element | JSX.Element[] }) => <li className={style.item}>{prop.children}</li>;

## optional - active?: boolean
const NavbarLink = (prop: { children: string, href: string, active?: boolean, activeClass?: string }) => (
  <a href={prop.href} className={prop.active ? prop.activeClass : ''}>
    {prop.children}
  </a>
);

## object key type - type key = keyof typeof object
const NavbarNav = (prop: { children: JSX.Element | JSX.Element[] , orientation: navKey }) => (
  <ul className={style.nav[prop.orientation]}>{prop.children}</ul>
);

const style = {
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

type collapseKey = keyof typeof style.collapse;
type navKey = keyof typeof style.nav;

## window event listener - Event, as Node
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

## useContext type
type NavbarContext = {
  open: boolean,
  toggle: () => void,
}
const Context = React.createContext({} as NavbarContext);
...
const useToggle = () => React.useContext(Context);
const { toggle } = useToggle();