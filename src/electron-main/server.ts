import fs from 'fs';
import express from 'express';
import https from 'https';
import path from 'path';
import cors from 'cors';
import { address } from './utils/ip';

class Server {
	_app;
	_httpServer;

	public get httpServer() { return this._httpServer; }

	constructor(port: number, key: any, cert: any) {
		this._app = express();
		this._app.use(cors());
		this._httpServer = https.createServer({ key, cert }, this._app);

		// const staticPath = path.resolve(__dirname, '../../vrView');
		// this._app.use(express.static(staticPath));

		this._app.get('/test', (req, res) => res.send('Hello world'));

		const localIp = address();
		this._httpServer.listen(port, () => {
			console.log(`Https is runing at https://${localIp}:${port}`);
		});
	}

	close() {
		this._httpServer.close();
	}
}

export default Server;