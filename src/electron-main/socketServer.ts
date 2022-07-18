import { Server } from 'socket.io';

class SocketServer {
	_io: Server;

	_connections: { co: any, role: string }[];

	constructor() {
		this._io = new Server(3456);
		this._connections = [];

		this._io.on('connect', socket => {
			console.log(`connect ${socket.id}`);

			const coData = { co: socket, role: undefined };
			this._connections.push(coData);

			socket.on('setRole', (msg) => this.handleRole(socket.id, msg))
			socket.emit('askRole');

			socket.on('syncCommand', (msg) => {
				console.log(msg);
				this._connections.forEach(co => {
					co.co.emit('execCommand', msg);
				});
			})
		})
	}

	handleRole = (socketId: string, msg) => {
		const co = this._connections.find(o => o.co.id == socketId);
		co.role = msg.role;
	}

	close = () => {
		this._io.close();
	}
}

export default SocketServer;