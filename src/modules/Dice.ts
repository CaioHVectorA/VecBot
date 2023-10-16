import { ICommand, RunFunctionParams, Command } from "../handle/Command";

export const Dice = new Command([
    "dado","d","d6","d20","lancardado","rolardado"
],
    async ({client,command,msg,params}) => {
        if (params.length > 0) {
                //@ts-ignore qual o sentido de isNaN só aceitar number de parametro?
                let rows = !isNaN(params[1]) ? parseInt(params[1]) : 1;
                const number = params[0] || 6
                //@ts-ignore qual o sentido de isNaN só aceitar number de parametro?
                if (isNaN(number)) return msg.reply("Desculpe, mas não encontrei números em sua declaração! Use da seguinte forma: `\n ```!d6```")
                let arrResponses: string[] = []
            for (let index = 0; index < rows; index++) {
                //@ts-ignore
                   const randomized = Math.floor(Math.random() * number) + 1
                   arrResponses.push(`Você rolou um dado de ${number} e tirou ${randomized}`)
                }
                return msg.reply(arrResponses.join("\n"))
        } else {
            const number = (command.replace('d',''))
            //@ts-ignore qual o sentido de isNaN só aceitar number de parametro?
            if (isNaN(number)) return msg.reply("Desculpe, mas não encontrei números em sua declaração! Use da seguinte forma: `\n ```!d6```")
            //@ts-ignore
            const randomized = Math.floor(Math.random() * number) + 1
            return msg.reply(`Você rolou um dado de ${number} e tirou ${randomized}`)
        }
        }
    )