import { Client, Message } from 'whatsapp-web.js'
import { commandData } from '../data/commands'
export function FindCommandAndRun(command: string, params: string[], client: Client, msg: Message ) {
    const commandFound = commandData.find(c => c.identifiers.includes(command))
    console.log('teste:',commandFound, command)
    if (!commandFound) return // msg.reply("Não entendi o que você quis dizer. Faça um comando apropriado!")
    // if (!commandFound) return msg.reply("Não entendi o que você quis dizer. Faça um comando apropriado!")
    console.log(commandFound.identifiers)
    commandFound.run({
        client,
        command,
        params,
        msg
    })
}