import express from "express";
import cors from "cors";
import routeActor from "./routes/actorData";
// import { About, Voice } from "./lib/types";
// import { dataActor } from "./services";
// import yarg from "./plugins/yargs.plugins";

const app = express();
const PORT = process.env.PORT || 5174;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", cors(), async (_, res) => {
  res.send({ message: "Hola desde el servidor!" });
});

app.use("/api", routeActor);

// app.use("/api", routeActor);

// console.log(yarg);
// app.use('/api)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  console.log("dasda");
});

console.log(process.argv);
