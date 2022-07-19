
import { io, Socket } from "socket.io-client";

class SocketClientService {
	_ws: Socket;

	public get ws() { return this._ws };

	constructor(ip: string, coType: string) {
		this._ws = io(`wss://${ip}:3002`, {
			secure: true,
			reconnectionDelayMax: 10000,
			rejectUnauthorized: false, // Important for self-signed cert !!!!!
			query: {
				"type": coType
			}
		});

		this._ws.on("connect", () => {
			console.log(this._ws.id);
		});

		this._ws.on('error', (err) => {
			console.error(err);
		})
	}

	sync(o) {
		this._ws.emit('syncCommand', o);
	}

	close = () => {

	}


}

export default SocketClientService;