import axios from "axios";

export default axios.create({
  baseURL: "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/"
});
