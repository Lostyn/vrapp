import { Server } from 'socket.io';
import { createServer } from "https";
import { address } from './utils/ip';

class SocketServer {
	_io: Server;
	_connections: { co: any, role: string }[];

	constructor(port: number, key: any, cert: any) {
		const httpServer = createServer({ key, cert });

		this._io = new Server(httpServer, { /* options */ });
		this._connections = [];

		this._io.on('connect', socket => {
			console.log(`Connection: ${socket.id}`);

			const coType = socket.handshake.query.type as string;
			this._connections.push({
				co: socket,
				role: coType
			})

			// socket.on('syncCommand', (msg) => {
			// 	console.log(msg);
			// 	this._connections.forEach(co => {
			// 		co.co.emit('execCommand', msg);
			// 	});
			// })
		})

		const localIp = address();
		httpServer.listen(port, () => {
			console.log(`Socket is runing at wss://${localIp}:${port}`);
		});
	}

	close = () => {
		this._io.close();
	}
}

export default SocketServer;