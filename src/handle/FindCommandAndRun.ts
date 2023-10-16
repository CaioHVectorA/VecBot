import { Client, Message } from 'whatsapp-web.js'
import { commandData } from '../data/commands'
export function FindCommandAndRun(command: string, params: string[], client: Client, msg: Message ) {
    const commandFound = commandData.find(c => c.identifiers.includes(command))
    if (!commandFound) return msg.reply("Não entendi o que você quis dizer. Faça um comando apropriado!")
    commandFound.run({
        client,
        command,
        params,
        msg
    })
}