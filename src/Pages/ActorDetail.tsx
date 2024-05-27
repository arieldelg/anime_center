import { useLocation } from "react-router-dom";
import { Location } from "../lib/types";

const ActorDetail = () => {
  const url: Location = useLocation();
  console.log(url);
  return <div>ActorDetail</div>;
};

export default ActorDetail;
