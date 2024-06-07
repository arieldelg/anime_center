import express from "express";
import cors from "cors";
// import { ActorVoice } from "./lib/types";

// let actorData: ActorVoice | {} = {};

const app = express();
const PORT = process.env.PORT || 5174;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", cors(), async (_, res) => {
  res.send({ message: "Hola desde el servidor!" });
});

app.post("/api/actorId", (req, _) => {
  let { id } = req.body;
  console.log(id);
  fetch(`https://api.jikan.moe/v4/people/${id}/full`).then((res) => res.json());
  // .then((data) => (actorData = data));
  // setTimeout(() => {
  //   console.log(actorData.data.birthday);
  // }, 1000);
  // res.send({ message: "Esto es una prueba!" });
});

// app.get("/api/actorInfo", (req, res) => {
//   // let day
//   // let month
//   // let year
//   // if (actorData.data.birthday !== null) {
//   //   const datesplit = data.data.birthday.split("T");
//   //   const dayMonthYear = datesplit[0];
//   //  day = dayMonthYear.split("-")[2];
//   //   month = dayMonthYear.split("-")[1];
//   //   year = dayMonthYear.split("-")[0];
//   //   const nowDate = new Date();
//   //   setBirthday(`${day}/${month}/${year}`);
//   //   const restYear = nowDate.getFullYear() - Number(year);
//   //   const actualMonth = nowDate.getMonth();
//   //   if (actualMonth < Number(month)) {
//   //     setAge(restYear - 1);
//   //   } else {
//   //     setAge(restYear);
//   //   }
//   // } else {
//   //   setAge("No info");
//   //   setBirthday("No info");
//   // }
//   // const object = {
//   //   birthday: `${day}, ${month}, ${year}`,
//   // };
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  console.log("dasda");
});
