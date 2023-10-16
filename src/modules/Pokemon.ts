import { MessageMedia } from "whatsapp-web.js";
import { Command } from "../handle/Command";
import { pokeData } from "../utils/data/pokedata";

export const Pokemon = new Command(["poke","pokemon","pokémon","pokemo","pkm"], async ({ client, command, msg, params }) => {
    //@ts-ignore
    const poke = pokeData.find(poke => poke.name.replace("-","").replace(".","").toLowerCase().startsWith(params.join('').toLowerCase()) || poke.num === (isNaN(params[0]) ? parseInt(params[0]) : -1))
    if (!poke) return msg.reply("Não encontrei um pokemon com esse nome!")
    const image = await MessageMedia.fromUrl(`https://play.pokemonshowdown.com/sprites/dex/${poke.name.toLowerCase()}.png`)
    return msg.reply(image, undefined, {caption: `*${poke.name}* N° ${poke.num} \n Habilidade: ${poke.abilities["0"]} \n ${poke.types.join('/')} 
    \n _hp ${poke.baseStats.hp}_
    \n _atk ${poke.baseStats.atk}_
    \n _def ${poke.baseStats.def}_
    \n _spa ${poke.baseStats.spa}_
    \n _spd ${poke.baseStats.spd}_
    \n _spe ${poke.baseStats.spe}_  
    \n _total: ${Object.values(poke.baseStats).reduce((a, b) => ( a+b ))}_
    `})
})