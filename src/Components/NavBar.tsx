import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import CategoryComponents from "./CategoryComponents";
import { useBoundStore } from "../Stores/boundleStore";
import React from "react";

type NavBarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBar = ({ open, setOpen }: NavBarProps) => {
  const navigate = useNavigate();
  const setReset = useBoundStore((state) => state.setReset);
  const setGenrePage = useBoundStore((state) => state.setGenrePage);
  const setCurrentSet = useBoundStore((state) => state.setCurrentSet);
  const setGenreArray = useBoundStore((state) => state.setGenreArray);
  const setCurrentPages = useBoundStore((state) => state.setCurrentPages);
  const setSearch = useBoundStore((state) => state.setSearch);
  const tailwindStyles =
    "text-xl cursor-pointer hover:bg-gray-700 h-full flex items-center px-2";
  const events = () => {
    setReset(true);
    setGenrePage(1);
    setCurrentSet(1);
    setGenreArray([]);
    setCurrentPages([]);
  };
  const handleHome = () => {
    navigate("/");
    events();
  };
  return (
    <nav className=" relative w-screen flex justify-between px-4 bg-gray-800 h-16 items-center shadow-xl max-sm:hidden">
      <ul className=" flex gap-2 h-full items-center">
        <li className="cursor-pointer" onClick={handleHome}>
          HomePage
        </li>
        <li
          className={`${tailwindStyles}`}
          onClick={() => setOpen((prev) => !prev)}
        >
          Categorias
        </li>
        <li className={`${tailwindStyles}`}>Novedades</li>
      </ul>
      <ul className="flex gap-2 h-full items-center">
        <li
          className={`${tailwindStyles}`}
          onClick={() => {
            setSearch("");
            navigate("/search");
            setOpen(false);
            events();
          }}
        >
          <MagnifyingGlassIcon className="w-8 " />
        </li>
        <li className={`${tailwindStyles}`}>Login</li>
      </ul>
      {open && (
        <div className="absolute top-[78px] left-[100px] w-[1100px] h-[350px] bg-gray-800 shadow-3xl rounded-md z-10">
          <CategoryComponents setOpen={setOpen} />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
