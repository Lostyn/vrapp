
export type Command<T> = {
	exec(state: any, payload: T);
};

export namespace _command {
	export const commands = new Map<string, Command<any>>();

	export function registerCommand(type: string, command: Command<any>) {
		_command.commands[type] = command;
	}
}

export class TestCommand implements Command<string> {
	exec(state: any, payload: string) {
		state.test = payload;
	}
}

_command.registerCommand('test', new TestCommand());
