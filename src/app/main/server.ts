import fs from 'fs';
import express from 'express';
import https from 'https';
import path from 'path';

const port = 3002;
class Server {
	_app;
	_httpServer;

	constructor() {
		const [key, cert] = this.loadCert();

		this._app = express();
		this._httpServer = https.createServer({ key, cert }, this._app);

		const staticPath = path.resolve(__dirname, '../../vrView');
		this._app.use(express.static(staticPath));

		this._httpServer.listen(port, () => {
			console.log(`Server running at *:${port}`);
		});
	}

	loadCert() {
		const basePath = path.resolve(__dirname, '../../cert');
		const key = fs.readFileSync(`${basePath}/key.pem`);
		const cert = fs.readFileSync(`${basePath}/cert.pem`);
		return [key, cert];
	}

	close() {
		this._httpServer.close();
	}
}

export default Server;