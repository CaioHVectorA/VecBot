import { Client, Message } from 'whatsapp-web.js'
import { FindCommandAndRun } from './FindCommandAndRun'
export function FormatMessage(input: string,client: Client, message: Message) {
    const command = input.split(' ')[0].toLowerCase().trim().replace("!",'')
    const params = input.toLowerCase().trim().replace("!",'').split(' ').slice(1)
    FindCommandAndRun(command,params,client,message)
}