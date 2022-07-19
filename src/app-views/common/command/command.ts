
export type Command<T> = {
	exec(state: any, payload: T);
	toMsg(): { type: string, payload: any[] }
};

export namespace _command {
	export const commands = new Map<string, Command<any>>();

	export function registerCommand(type: string, command: any) {
		_command.commands[type] = command;
	}
}

const registerCommand = _command.registerCommand;
export default registerCommand;
