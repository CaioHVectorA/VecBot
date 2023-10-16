import { Command } from "../handle/Command";

export const Sticker = new Command(["sticker","s","figurinha","figurinha"], async ({ client, command, msg, params }) => {
    if (!msg.hasMedia) return msg.reply('Você não providenciou uma imagem para ser transformada em figurinha.')
    const image = await msg.downloadMedia()
    return msg.reply(image,undefined,{sendMediaAsSticker: true})
})