import Link from "next/link";

const NavBar = () => {

  return (
    <div className="justify-between flex p-4 border-b bg-slate-900 text-white">
      <Link href="/" className="text-xl font-bold">
        VAL DATABASE
      </Link>

      <ul className="flex gap-4">
        <li>
          <Link href="/">Movie</Link>
        </li>
        <li>
          <Link href="/anime">Anime</Link>
        </li>
        <li>
          <Link href="/drama-korea">Drama Korea</Link>
        </li>
      </ul>
    </div>
  );
};
export default NavBar;
