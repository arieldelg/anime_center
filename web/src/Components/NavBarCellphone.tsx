import { useEffect, useState } from "react";
import { useBoundStore } from "../Stores/boundleStore";
import { useLocation, useNavigate } from "react-router-dom";

type Scroll = {
  y: number;
  yLast: number;
};

const NavBarCellphone = () => {
  const url = useLocation();
  const navigate = useNavigate();

  const [scrollData, setScrollData] = useState<Scroll>({
    y: 0,
    yLast: 0,
  });
  const [hideNav, setHideNav] = useState<string>("");
  const setChangeSection = useBoundStore((state) => state.setChangeSection);
  useEffect(() => {
    const handleScroll = () => {
      setScrollData((prevState) => {
        return {
          y: window.scrollY,
          yLast: prevState.y,
        };
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (scrollData.y === 0) {
      setHideNav("inicialPosition");
    }
    if (scrollData.y > 22) {
      setHideNav("scrollDown");
    }
    if (scrollData.yLast > scrollData.y && scrollData.y > 22) {
      setHideNav("scrollUp");
    }
  }, [scrollData]);
  const scrollCLass = () => {
    let classScroll: string = "";
    if (hideNav === "scrollDown") {
      classScroll = "transform -translate-y-full";
    }
    if (hideNav === "scrollUp") {
      classScroll = "shadow-lg shadow-slate-700";
    }
    if (hideNav === "initialPosition") {
      return null;
    }
    return classScroll;
  };
  return (
    <>
      <div
        className={`w-full h-24 pt-2 flex flex-col items-center justify-between lg:hidden bg-gray-800 fixed top-0 left-0 transition-all duration-300 ease-in-out ${scrollCLass()}`}
      >
        <p className="font-bold text-2xl">Anime Heaven</p>
        <div className="w-full h-10 bg-slate-800">
          <button
            className="h-10 w-2/4 text-lg font-bold outline-none"
            onClick={() => {
              if (url.pathname !== "/") {
                navigate("/");
              }
              setChangeSection("news");
            }}
          >
            News
          </button>
          <button
            className="h-10 w-2/4 text-lg font-bold outline-none"
            onClick={() => {
              if (url.pathname !== "/") {
                navigate("/");
              }
              setChangeSection("categoryAnime");
            }}
          >
            Anime
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBarCellphone;
