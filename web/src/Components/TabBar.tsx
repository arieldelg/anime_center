import {
  MagnifyingGlassIcon,
  UserIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

const TabBar = () => {
  return (
    <div className="w-full h-[58px] bg-gray-800 px-4 fixed bottom-0 left-0 lg:hidden">
      <ul className="w-full h-full flex justify-between items-center">
        <li>
          <UserIcon className="w-10" />
        </li>
        <li>
          <NavLink to="/search">
            <MagnifyingGlassIcon className="w-10" />
          </NavLink>
        </li>
        <li>
          <Cog6ToothIcon className="w-10" />
        </li>
      </ul>
    </div>
  );
};

export default TabBar;
