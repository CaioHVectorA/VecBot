import axios from 'axios'
// import {  } from 'node'
import { Command } from "../handle/Command";
import { Message, MessageMedia } from 'whatsapp-web.js';
import { config } from 'dotenv'
import { promises as fs } from 'fs';
import { translate } from 'bing-translate-api'
function errormsg(msg: Message) {msg.reply('```Ocorreu um erro ao gerar sua imagem```')}
config()
const negative_prompt = "out of frame, lowres, text, error, cropped, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username, watermark, signature,"
const API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";
const headers = {
    Authorization: `Bearer ${process.env.HUGGING_FACE_KEY}`
}
export const Diffusion = new Command(["image","imagine","imaginar","gerar","img","stable","diffusion"], async ({ client, command, msg, params }) => {
    if (params.length === 0) return msg.reply('```Você deve fornecer um prompt para gerar uma imagem```')
    const translated = await translate(params.join(' '),null,'en')
    const data = {
        inputs: params.join(' '),
        negative_prompt,
        wait_for_model: true
    }
    fetch(API_URL, {
        headers,
        method: "POST",
        body: JSON.stringify(data),
      }).then(async res => {
        const response = await res.arrayBuffer().catch(err =>{errormsg(msg)})
        // console.log(response)
        if (!response) return
        const path = process.cwd()+'/public/'+'STABLE_IMAGE'+'.png'
        await fs.writeFile(path,Buffer.from(response)).catch(err => errormsg(msg))
        const media = MessageMedia.fromFilePath(path)
        msg.reply(media)
      }).catch(err => {
        console.log(err)
        errormsg(msg)
      })
    // axios.post(API_URL, {
    //     headers,
    //     data: JSON.stringify({inputs: params.slice(1).join(' ')})
    // }).then(async (response) => {
    //     const res = await response.data.arrayBuffer()
    //     const image = new MessageMedia('png',res)
    //     msg.reply(image)
    // }).catch(err => {
    //     console.log(err)
    //     errormsg(msg)})
    return msg.reply('Sua imagem já está sendo carregada!')
})