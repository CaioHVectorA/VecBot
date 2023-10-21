import { Client, LocalAuth } from 'whatsapp-web.js'
import { translate } from 'bing-translate-api'
import * as qrcodeterminal from 'qrcode-terminal'
import { FormatMessage } from './handle/FormatMessage'
import { config } from 'dotenv'
config()
let readyDate: Date;
const client = new Client({
    authTimeoutMs: 3000000,
    puppeteer: {
        
        executablePath: "/usr/bin/chromium-browser",
        args: ['--no-sandbox','--disable-setuid-sandbox']
    }
    // authStrategy: new LocalAuth(),
    // qrMaxRetries: 0
})
client.on('qr', (qr) => qrcodeterminal.generate(qr, { small: true }))
client.on('message_create', (msg) => {
    if (msg.timestamp !== null) {
        const msgTimestamp = new Date(msg.timestamp * 1000)
        console.log(readyDate, msgTimestamp)
        if (readyDate === null) return
        if (msgTimestamp < readyDate) return
    }
    if (msg.body.startsWith('!')) {
        FormatMessage(msg.body,client,msg);
    }
})
client.on('ready', () => {
    readyDate = new Date()
    console.log('servidor pronto!')
});

client.on('message_reaction', (reac) => {
    if (reac.timestamp !== null) {
        const reacTimestamp = new Date(reac.timestamp * 1000)
        if (readyDate === null) return
        if (reacTimestamp < readyDate) return
    }
        client.getMessageById(reac.msgId._serialized).then(msg => {
            //if (reac.reaction === "👀" && msg.hasMedia) { msg.downloadMedia().then(media => client.sendMessage(reac.senderId, media)).catch(err => console.log(err)) }
            if (reac.reaction === "🇪🇸") translate(msg.body, null, 'es').then((t) => {msg.reply(t.translation) ; msg.react('🌐').catch(err => console.log(err))}).catch(err => console.error(err))
            if (reac.reaction === "🇺🇸") translate(msg.body, null, 'en').then((t) => {msg.reply(t.translation) ; msg.react('🌐').catch(err => console.log(err))}).catch(err => console.error(err))
            if (reac.reaction === "🇷🇺") translate(msg.body, null, 'ru').then((t) => {msg.reply(t.translation) ; msg.react('🌐').catch(err => console.log(err))}).catch(err => console.error(err))
            if (reac.reaction === "🇧🇷" ) translate(msg.body, null, 'pt').then((t) => {msg.reply(t.translation) ; msg.react('🌐').catch(err => console.log(err))}).catch(err => console.error(err))
            //if (reac.reaction === "🇫🇷" ) translate(msg.body, null, 'fr').then((t) => {msg.reply(t.translation) ; msg.react('🌐').catch(err => console.log(err))}).catch(err => console.error(err))
            //if (reac.reaction === "🇩🇪" ) translate(msg.body, null, 'de').then((t) => {msg.reply(t.translation) ; msg.react('🌐').catch(err => console.log(err))}).catch(err => console.error(err))
            // console.log(msg.fromMe)
            // if (!msg.fromMe) return
        }).catch(err => console.log(err))
})

client.initialize() 