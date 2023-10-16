import axios from 'axios'
import { Command } from "../handle/Command";
import { MessageMedia } from 'whatsapp-web.js';


export const Preco = new Command(["preco","precogame","game"], async ({ client, command, msg, params }) => {
    console.log(params.slice(0).join(''))
    return axios(`https://www.cheapshark.com/api/1.0/games?title=${params.slice(0).join('')}&limit=1`).then(async (res) => {
    if (res.data.length === 0) return msg.reply("Não foi encontrado game")
        console.log(res.data)
        const image = await MessageMedia.fromUrl(res.data[0].thumb)
        return msg.reply(image,undefined, {caption: `${res.data[0].external} \n preço: $${res.data[0].cheapest}`})
    }).catch(err => {
        console.log(err)
        return msg.reply('Ocorreu um erro ao encontrar o game.')
    })
})