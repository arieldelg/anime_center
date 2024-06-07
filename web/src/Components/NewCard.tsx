import {
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BookmarkIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

type TnewCardProps = {
  img: string;
  user: string;
  lastPublish: string;
  text: string;
};

const NewCard = (props: TnewCardProps) => {
  const [openNote, setOpenNote] = useState<boolean>(false);
  const handleLikeButton = () => {
    //aqui manejar estados
  };
  return (
    <div>
      <div className="py-4 flex items-center gap-2">
        <div className="h-12 w-12 rounded-full bg-black">
          <img
            src={props.img}
            alt="imagen de perfil"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <p className="text-xl font-bold">{props.user}</p>
        <p className="text-xs text-white/50">{props.lastPublish}</p>
      </div>
      <div className="border-2 border-white/30 rounded-md px-4 py-2 w-96">
        <p className="text-justify">{props.text}</p>
      </div>
      <div className="w-full py-2 px-8 border-y-[1px] border-white/30 my-4 flex justify-between items-center">
        <HeartIcon className="w-8" onClick={handleLikeButton} />
        <BookmarkIcon className="w-8" />
        <ChatBubbleOvalLeftEllipsisIcon
          className="w-8"
          onClick={() => setOpenNote((prev) => !prev)}
        />
      </div>

      {openNote && (
        <section
          className={`w-full  transition-all duration-500 ease-in-out transform -translate-y-700`}
        >
          <textarea
            name="note"
            id="note"
            placeholder="Publica Algo"
            className="w-full pl-2 pr-14 py-1 bg-color-anime border-2 border-white/20 rounded-lg outline-none"
          />
          <div className="w-10 h-10 bg-color-anime/50 rounded-full absolute top-[10px] right-2">
            <ArrowUpCircleIcon className="w-full h-full text-white" />
          </div>
        </section>
      )}
    </div>
  );
};

export default NewCard;
