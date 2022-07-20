import { Server } from 'socket.io';
import { createServer } from "https";
import { address } from './utils/ip';

class SocketServer {
	_io: Server;
	_connections: { co: any, role: string }[];

	constructor(port: number, key: any, cert: any) {
		const httpServer = createServer({ key, cert });

		this._io = new Server(httpServer, {
			/* options */
			cors: {
				origin: "*"
			}
		});
		this._connections = [];

		this._io.on('connect', socket => {
			const coType = socket.handshake.query.type as string;
			console.log(`Connection: ${socket.id} [${coType}]`);

			this._connections.push({
				co: socket,
				role: coType
			})

			socket.on('scene:rpc', (msg) => {
				console.log(msg);
				this._io.emit('scene:rpc', msg);
			})

			socket.on('disconnect', reason => {
				console.log(`Disconnection: ${socket.id} [${reason}]`);
			})
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