"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
let actorData = {};
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5174;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/api", (0, cors_1.default)(), (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ message: "Hola desde el servidor!" });
}));
app.post("/api/actorId", (req, _) => {
    let { id } = req.body;
    console.log(id);
    fetch(`https://api.jikan.moe/v4/people/${id}/full`)
        .then((res) => res.json())
        .then((data) => (actorData = data));
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
