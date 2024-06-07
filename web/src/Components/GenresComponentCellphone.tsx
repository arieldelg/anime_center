import { To, useNavigate } from "react-router-dom";
import { Tdata } from "../../../lib/types";
import { useBoundStore } from "../Stores/boundleStore";

//custom types

type NewElement = {
  name: string;
  id: number;
};

// type for useNavigate()

interface NavigateFunction {
  (to: To, options?: NavigateOptions): void;
  (delta: number): void;
}

interface NavigateOptions {
  replace?: boolean;
  state?: any;
  preventScrollReset?: boolean;
  relative?: RelativeRoutingType;
  unstable_flushSync?: boolean;
  unstable_viewTransition?: boolean;
}

type RelativeRoutingType = "route" | "path";

const GenresComponentCellphone = () => {
  const nagivate: NavigateFunction = useNavigate();
  const genre = useBoundStore((state) => state.genre);
  const handleNavigate = (element: string) => {
    const newElement: NewElement = JSON.parse(element);
    nagivate(`genre/${newElement.name}`, {
      state: { name: newElement.name, id: newElement.id },
    });
  };
  return (
    <div className="h-full py-4 lg:hidden">
      <select
        className="grid grid-cols-3 h-18 w-full mt-20 py-2 space-x-4 space-y-4 text-lg font-bold"
        name="category"
        id="category-select"
        onChange={(e) => handleNavigate(e.target.value)}
      >
        <option value="">--- Choose a genre ---</option>
        {genre?.map((element: Tdata) => {
          return (
            <option
              value={JSON.stringify({
                name: element.name,
                id: element.mal_id,
              })}
              key={element.mal_id}
            >
              {element.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default GenresComponentCellphone;
