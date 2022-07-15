import { Command, _command } from '../../command/command';
import SocketClientService from '../SocketClientService';
import { _reduce } from './createReducer';

export type State = {
	test: string
}

const initialState: State = {
	test: 'a'
}

export class StateService {
	state: State;

	_event: { (state: State): void }[] = [];
	_ws: SocketClientService;

	constructor(ws: SocketClientService) {
		this.state = initialState;
		this._ws = ws;
		ws.ws.on('execCommand', this.execCommand);
	}

	dispatchCommand(action: { type: string, data: any }) {
		this._ws.sync(action);
	}

	execCommand = (msg) => {
		const cmd: Command<any> = _command.commands[msg.type];
		cmd.exec(this.state, msg.data);

		this._event.forEach(
			event => event(this.state)
		);
	}

	connect = (callback: (state: State) => void): () => void => {
		this._event.push(callback);

		return () => {
			this._event = this._event.filter(o => o != callback);
		};
	}
}