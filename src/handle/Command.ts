import { Message, Client,  } from "whatsapp-web.js"

export type RunFunctionParams = {
    command: string,
    params: string[]
    msg: Message,
    client: Client
}

export interface ICommand {
    identifiers: string[]
    run: (params: RunFunctionParams) => Promise<Message>
}

export class Command implements ICommand {
    identifiers: string[]
    run: (params: RunFunctionParams) => Promise<Message>;
    constructor(identifiers: string[], run: (params: RunFunctionParams) => Promise<Message>) {
        this.identifiers = identifiers;
        this.run = run
    }
}

// export abstract class Command implements ICommand {
//     identifiers: string[]
//     run: (params: RunFunctionParams) => void;
// }


