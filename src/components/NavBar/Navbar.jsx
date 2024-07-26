import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-blue-300 dark:bg-slate-900 sticky top-0 z-50">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2">
            <Link href={"/"} className="text-lg font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="150"
                height="40"
                viewBox="0 0 500 100"
              >
                <text
                  x="10"
                  y="80"
                  className="font-sayyeda"
                  fontSize="100"
                  fill="white"
                  stroke="black"
                  strokeWidth="2"
                >
                  VAL DATABASE
                </text>
              </svg>
            </Link>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              <li>
                <Link href="/">Movie</Link>
              </li>
              <li>
                <Link href="/anime">Anime</Link>
              </li>
              <li>
                <Link href="/drama">Drama Series</Link>
              </li>
            </ul>
          </div>
          <ThemeToggle />
        </div>
      </div>
      <div className="drawer-side z-[40]">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu py-20 w-80 min-h-full bg-base-200">
          <li>
            <Link href="/">Movie</Link>
          </li>
          <li>
            <Link href="/anime">Anime</Link>
          </li>
          <li>
            <Link href="/drama">Drama Series</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
