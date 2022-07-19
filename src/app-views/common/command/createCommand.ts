import registerCommand, { Command } from './command';

export class CreateCommand implements Command<string> {
	objStr: string;

	constructor(objStr: string) {
		this.objStr = objStr;
	}

	exec(state: any, payload: string) {

	}

	toMsg(): { type: string; payload: any[]; } {
		return { type: 'create', payload: [this.objStr] }
	}
}

registerCommand('create', CreateCommand);