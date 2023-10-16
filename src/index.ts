import { Client, LocalAuth } from 'whatsapp-web.js'
import { translate } from 'bing-translate-api'
import qrcodeterminal from 'qrcode-terminal'
import { FormatMessage } from './handle/FormatMessage'
import { config } from 'dotenv'
config()
const client = new Client({
    authStrategy: new LocalAuth(),
    qrMaxRetries: 0
})
client.on('qr', (qr) => qrcodeterminal.generate(qr, { small: true }))
client.on('message_create', (msg) => {
    if (msg.body.startsWith('!')) {
        FormatMessage(msg.body,client,msg);
    }
})
client.on('ready', () => console.log('servidor pronto!'));

// client.on('message_reaction', (reac) => {
//     console.log(reac.reaction)
//     console.log('ID:', reac.msgId._serialized)
//         client.getMessageById(reac.msgId._serialized).then(msg => {
//             if (reac.reaction === "👀" && msg.hasMedia) { msg.downloadMedia().then(media => client.sendMessage(reac.senderId, media)).catch(err => console.log(err)) }
//             if (reac.reaction === "🇪🇸") translate(msg.body, null, 'es').then((t) => {msg.reply(t.translation) ; msg.react('🌐').catch(err => console.log(err))}).catch(err => console.error(err))
//             if (reac.reaction === "🇺🇸") translate(msg.body, null, 'en').then((t) => {msg.reply(t.translation) ; msg.react('🌐').catch(err => console.log(err))}).catch(err => console.error(err))
//             if (reac.reaction === "🇷🇺") translate(msg.body, null, 'ru').then((t) => {msg.reply(t.translation) ; msg.react('🌐').catch(err => console.log(err))}).catch(err => console.error(err))
//             if (reac.reaction === "🇧🇷" ) translate(msg.body, null, 'pt').then((t) => {msg.reply(t.translation) ; msg.react('🌐').catch(err => console.log(err))}).catch(err => console.error(err))
//             if (reac.reaction === "🇫🇷" ) translate(msg.body, null, 'fr').then((t) => {msg.reply(t.translation) ; msg.react('🌐').catch(err => console.log(err))}).catch(err => console.error(err))
//             if (reac.reaction === "🇩🇪" ) translate(msg.body, null, 'de').then((t) => {msg.reply(t.translation) ; msg.react('🌐').catch(err => console.log(err))}).catch(err => console.error(err))
//             // console.log(msg.fromMe)
//             // if (!msg.fromMe) return
//         }).catch(err => console.log(err))
// })

client.initialize() 