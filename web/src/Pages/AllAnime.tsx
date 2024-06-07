import { NavLink } from "react-router-dom";
import Pagination from "../Components/Pagination";
import { TAnimeGenerics, TcategoryMovieData } from "../lib/types";

type TallAnimeProps = {
  anime: TAnimeGenerics[];
  info: TcategoryMovieData;
};

const AllAnime = ({ info, anime }: TallAnimeProps) => {
  return (
    <section className="w-full flex flex-col gap-4">
      <div className="w-full h-full flex flex-wrap justify-between items-center gap-4">
        {anime?.map((element) => {
          return (
            <NavLink
              to={`/${element.title}`}
              state={element}
              key={element.mal_id}
            >
              <figure className="w-[225px] flex flex-col items-center ">
                <img
                  src={element.images.jpg.image_url}
                  alt={element.title}
                  width={225}
                />
                <p>{element.title}</p>
              </figure>
            </NavLink>
          );
        })}
      </div>
      {anime?.length > 0 && <Pagination pagination={info.pagination} />}
    </section>
  );
};

export default AllAnime;
