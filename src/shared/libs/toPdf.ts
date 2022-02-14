import fs from "fs";
import pdf from "html-pdf";
import { API_URI } from "../config";
import Pokemon from "../../pokemon-management/pokemon/domain/Pokemon";
import ejs from "ejs";

const createBuffer = (content) =>
  new Promise((resolve, reject) => {
    pdf.create(content).toBuffer((err, buffer) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(buffer);
      }
    });
  });

const htmlProcess = async (pokemon: Pokemon) => {
  const html = await fs.readFileSync(
    `${__dirname}/../assets/file_pokemon.html`,
    "utf8"
  );
  let pathFile: String = "static/default.png";
  if (pokemon.filePath.length > 0) {
    pathFile = pokemon.filePath;
  }
  const obj = {
    name: pokemon.name,
    hp: pokemon.health,
    attack: pokemon.attack,
    defense: pokemon.defense,
    urlType1: `${API_URI}/static/imagens/types/${pokemon.type}.png`,
    urlType2: "",
    urlSimbol: `${API_URI}/static/imagens/simbol.png`,
    urlPhotoPokemon: `${API_URI}/${pathFile}`,
  };
  const process = ejs.render(html, obj);
  return process;
};

const toBuffer = async (pokemon: Pokemon) => {
  const html = await htmlProcess(pokemon);
  return await createBuffer(html);
};

export default { toBuffer };
