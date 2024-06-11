"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findHeroes = void 0;
const heroes = [
    {
        id: 1,
        name: "spiderman",
        owner: "Marvel",
    },
    {
        id: 2,
        name: "Iron Man",
        owner: "Marvel",
    },
    {
        id: 3,
        name: "Superman",
        owner: "DC",
    },
];
const findHeroes = (id) => {
    return heroes.find((element) => element.id === id);
};
exports.findHeroes = findHeroes;
