import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { Tdata } from "@backend/types";
import { useBoundStore } from "../Stores/boundleStore";

const Home = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const setGenre = useBoundStore((state) => state.setGenre);
  useEffect(() => {
    return () => {
      try {
        fetch("https://api.jikan.moe/v4/genres/anime")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Status is no in the 200s range");
            }
            return response.json();
          })
          .then((data) => {
            const newData: Tdata[] = data.data;
            function compare(a: Tdata, b: Tdata): number {
              const genreA = a.name.toUpperCase();
              const genreB = b.name.toUpperCase();
              let comparison = 0;
              if (genreA > genreB) {
                comparison = 1;
              } else if (genreB > genreA) {
                comparison = -1;
              }
              return comparison;
            }

            newData.sort(compare);
            setGenre(newData);
          })
          .catch(() => {
            setError("Something went wrong");
          });
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
  return (
    <>
      {!error ? (
        <>
          <NavBar open={open} setOpen={setOpen} />
        </>
      ) : (
        <p>Error en el Navbar</p>
      )}
      <main
        className="w-screen h-screen lg:max-w-7xl lg:m-auto "
        onClick={() => setOpen(false)}
      >
        <Outlet />
      </main>
    </>
  );
};

export default Home;
