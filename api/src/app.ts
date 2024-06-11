import { Heroes } from "./lib/types";

const heroes: Heroes[] = [
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

const findHeroes = (id: number): Heroes | undefined => {
  return heroes.find((element) => element.id === id);
};

export { findHeroes };
