import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5174;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", cors(), async (req, res) => {
  res.send({ message: "Hola desde el servidor!" });
});

app.post("/api/test", (req, res) => {
  let { id } = req.body;
  console.log(id);
  // fetch(`https://api.jikan.moe/v4/people/${id}/full`)
  // res.send({ message: "Esto es una prueba!" });
  res.send({ data: "puto" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  console.log("dasda");
});
