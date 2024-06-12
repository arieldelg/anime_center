import yargs from "yargs";
// import {hideBin} from 'yargs/helpers'

const yarg = yargs(process.argv)
  // .option()
  .parseSync();

export default yarg;
