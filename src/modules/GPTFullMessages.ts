import axios from "axios";
import { Chat, ChatTypes, Contact, Message } from "whatsapp-web.js";
import { Command } from "../handle/Command";

async function getResponse(message: Message) {
    const chat = await message.getChat()
    console.log('Pegou chat, agora vai fetchar as msgs')
    const msgs = await chat.fetchMessages({ limit: 20 })
    const tempChats: Promise<Contact>[] = []; msgs.forEach(i => tempChats.push(i.getContact()))
    const chats = await Promise.all(tempChats)
    console.log('deu o fetch nas msgs')
    const prompt = (`Você é uma IA treinada para atuar como "IAManson", você deve ter um sotaque puxado mineiro, falando gírias mineiras como "trem", "nu!", "zé", "disgraça" e outras coisas, dessa forma, você não precisa estar preso a escrita perfeita, podendo abreviar palavras como q(que), vc(você) e entre outros, e urgentemente: Não use pontuação(exclamação, e evite os pontos finais.). 
    Você deve ser carismático, sempre fazendo os outros rir com o seu sotaque mineiro e com colocações únicas e inusitadas. Sua função, como o IAManson, é ler o conjunto de mensagens abaixo e, com a instruções que lhe dei, se infiltrar na conversa, falando algo que tenha a ver com o assunto na conversa ou algo que pode ser adicionado. Lembre-se: Foque no humor, na brincadeira, independente do assunto! 
    
    Outro detalhe: Sempre inicie suas mensagens com um "IAManson aqui", "Chamaram o IAManson?", "IAManson na área", "IAManson na voz", ou algo que se auto identifique!
    Abaixo estão as mensagens. Ela irão num modelo HTML que contém um atributo correspondente ao nome dos mensageiros. Você pode citar o nome deles em sua resposta!
    Repito: Evite exclamações ao máximo e pontos finais só usualmente.
    <conversa>
    ${msgs.slice(0,msgs.length - 2).map((msg, index) => `<mensagem user="${chats[index].pushname || '[Sem nome]'}">${msg.body}</mensagem>`)}
    </conversa>`)
    console.log(prompt)
    const url = 'https://nyx-beta.samirawm7.repl.co/openai/chat/completions';
    
    const headers = {
        // You can add headers if needed
    };
    
    const data = {
        "messages": [
            {
                "role": "system",
                "content": `${prompt}`
            }
        ],
        "stream": false,
        "model": "gpt-3.5-turbo",
        "temperature": 0.5,
        "presence_penalty": 0,
        "frequency_penalty": 0,
        "top_p": 1,
        "max_tokens": 100,
        "wait_for_model": true
    };
    
    const response = (await axios.post(url, data, { headers }).catch(err => console.log(err)))
    if (!response?.data) return 'Ocorreu um erro'
    console.log(response.data)
    return response.data.choices[0].message.content as string
}

export const FullGPT = new Command(['🤖'], async function ({ client,command,msg,params, }) {
    console.log('teste')
    const response = await getResponse(msg)
    console.log(response)
    return await msg.reply(response) 
})