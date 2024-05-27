// import { useState } from "react";
import News from "./News";
// import NavBarCellphone from "../Components/NavBarCellphone";
import TabBar from "../Components/TabBar";
import AnimePage from "./AnimePage";
import { useBoundStore } from "../Stores/boundleStore";
import NavBarCellphone from "../Components/NavBarCellphone";

const CoverPage = () => {
  const changeSection = useBoundStore((state) => state.changeSection);

  return (
    <main className="w-full h-full flex max-sm:flex-col space-y-3">
      <NavBarCellphone />
      {changeSection === "news" && <News />}
      {changeSection === "categoryAnime" && <AnimePage />}
      <TabBar />
    </main>
  );
};

export default CoverPage;
