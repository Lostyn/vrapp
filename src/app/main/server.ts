import express from 'express';
import http from 'http';
import path from 'path';

const port = 3002;
class Server {
	_app;
	_httpServer;

	constructor() {

		this._app = express();
		this._httpServer = http.createServer(this._app);

		const staticPath = path.resolve(__dirname, '../../vrView');
		this._app.use(express.static(staticPath));

		this._httpServer.listen(port, () => {
			console.log(`Server running at *:${port}`);
		});
	}

	close() {
		this._httpServer.close();
	}
}

export default Server;