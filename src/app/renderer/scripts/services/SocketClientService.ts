
import { io, Socket } from "socket.io-client";

class SocketClientService {
	_ws: Socket;

	public get ws() { return this._ws };

	constructor(ip: string) {

		this._ws = io(`https://${ip}:3456/`, { secure: true });

		this._ws.on("connect", () => {
			console.log(this._ws.id);
		});

		this._ws.on('askRole', () => {
			this._ws.emit('setRole', { role: 'app' });
		})
	}

	sync(o) {
		this._ws.emit('syncCommand', o);
	}

	close = () => {

	}


}

export default SocketClientService;