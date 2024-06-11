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
const http_client_plugins_1 = require("./plugins/http-client.plugins");
const logger_puglin_1 = require("./plugins/logger.puglin");
const app_1 = require("./app");
const logger = (0, logger_puglin_1.buildLogger)("index.ts");
const find = (0, app_1.findHeroes)(4);
logger.log(find);
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5174;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/api", (0, cors_1.default)(), (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ message: "Hola desde el servidor!" });
}));
app.get("/api/:actorId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { actorId } = req.params;
    // ! fetching data of actor
    const data = yield http_client_plugins_1.httpClientData.actorFullData(`https://api.jikan.moe/v4/people/${actorId}/full`);
    // ! variables that going to change
    let actorAbout;
    let age;
    let birthday;
    // ! conditional to calculate Birthday
    if (data.birthday !== null) {
        const datesplit = data.birthday.split("T");
        const dayMonthYear = datesplit[0];
        const day = dayMonthYear.split("-")[2];
        const month = dayMonthYear.split("-")[1];
        const year = dayMonthYear.split("-")[0];
        const nowDate = new Date();
        birthday = `${day} / ${month} / ${year}`;
        const restYear = nowDate.getFullYear() - Number(year);
        const actualMonth = nowDate.getMonth();
        if (actualMonth < Number(month)) {
            age = restYear - 1;
        }
        else {
            age = restYear;
        }
    }
    else {
        age = "No info";
        birthday = "No info";
    }
    // ! conditional if there is no about info and spliting about info and returning an object of it
    if (data.about !== null) {
        const infoSplit = data.about.split("\n");
        let object = {};
        infoSplit.forEach((element) => {
            let newSplit = [];
            if (!element.includes(": ") && element.length > 0) {
                object = Object.assign(Object.assign({}, object), { "Personal info": element });
            }
            else {
                newSplit = element.split(": ");
                const key = newSplit[0];
                if (newSplit[0].length > 100) {
                    const newJoin = newSplit.join(": ");
                    object = Object.assign(Object.assign({}, object), { "Personal info": newJoin });
                }
                else if (key.length !== 0 && !key.includes("Profile")) {
                    if (key.includes("&amp;")) {
                        const newKey = key.replace("&amp;", "&");
                        object = Object.assign(Object.assign({}, object), { [newKey]: newSplit[1].trimStart() });
                    }
                    else {
                        object = Object.assign(Object.assign({}, object), { [key]: newSplit[1].trimStart() });
                    }
                }
            }
        });
        actorAbout = object;
    }
    else {
        actorAbout = "No info";
    }
    // ! function to sort and check if repeated id Anime exist
    const newArray = [];
    const dataSorted = data.voices.sort((a, b) => a.role.localeCompare(b.role));
    dataSorted.forEach((element, index1) => {
        let indexArray = newArray.length;
        if (newArray.length === 0) {
            newArray.push(element);
        }
        if (index1 < dataSorted.length) {
            for (let index = indexArray; indexArray > 0; index--) {
                if (element.anime.mal_id === newArray[index - 1].anime.mal_id) {
                    newArray[index - 1].roleArray = [
                        newArray[index - 1].role,
                        element.role,
                    ];
                    newArray[index - 1].voiceArray = [
                        newArray[index - 1].character.name,
                        element.character.name,
                    ];
                    return;
                }
                else {
                    if (index - 1 === 0) {
                        newArray.push(element);
                        return;
                    }
                }
            }
        }
    });
    // ! object to return all info
    const infoActor = {
        id: data.mal_id,
        images: data.images,
        name: data.name,
        popularity: data.favorites,
        voices: newArray,
    };
    // ! returning response
    res.json({ actorAbout, age, birthday, infoActor });
}));
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    console.log("dasda");
});
