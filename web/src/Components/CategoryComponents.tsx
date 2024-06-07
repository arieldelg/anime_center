import { NavLink, useLocation } from "react-router-dom";
import { useBoundStore } from "../Stores/boundleStore";
import { Tdata } from "../lib/types";

// custom types

type CategoryComponentsProps = {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

// type for useLocation()

interface Location<State = any> extends Path {
  state: State;
  key: string;
}

interface Path {
  pathname: string;
  search: string;
  hash: string;
}

// component starts here

const CategoryComponents = ({ setOpen }: CategoryComponentsProps) => {
  const setReset = useBoundStore((state) => state.setReset);
  const setGenrePage = useBoundStore((state) => state.setGenrePage);
  const setCurrentSet = useBoundStore((state) => state.setCurrentSet);
  const setGenreArray = useBoundStore((state) => state.setGenreArray);
  const setCurrentPages = useBoundStore((state) => state.setCurrentPages);
  const genre = useBoundStore((state) => state.genre);
  const url: Location = useLocation();

  const handleReset = () => {
    if (url.pathname.length > 1) {
      setReset(true);
      setGenrePage(1);
      setCurrentSet(1);
      setGenreArray([]);
      setCurrentPages([]);
    }
  };
  if (genre.length > 0) {
    return (
      <section className="h-full px-8 py-4">
        <ul className="flex flex-wrap flex-col h-full w-full gap-2 text-sm">
          {genre?.map((element: Tdata) => {
            console.log(element.name);
            return (
              <li
                key={element.mal_id}
                className="cursor-pointer"
                onClick={() => {
                  if (setOpen) {
                    setOpen(false);
                  }
                }}
              >
                <NavLink
                  to={`genre/${element.name}`}
                  state={{ name: element.name, id: element.mal_id }}
                  onClick={() => handleReset()}
                >
                  {element.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
};

export default CategoryComponents;
