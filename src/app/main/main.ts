import { app, BrowserWindow } from 'electron';
import path from "path";
import Server from './server';
import url from "url";
import SocketServer from './socketServer';
import { address } from './utils/ip';

class Main {
	isDev: boolean;
	mainWindow: BrowserWindow | undefined;
	server: Server;
	socket: SocketServer;

	constructor() {
		this.isDev = process.env.NODE_ENV === 'development';

		if (!app.requestSingleInstanceLock())
			app.exit();

		// used to remove warning
		//  Passthrough is not supported, GL is disabled, ANGLE is
		app.disableHardwareAcceleration();
	}

	start(): void {
		try {
			this.startup();
		} catch (error) {
			app.exit(1);
		}
	}

	private startup() {
		const localIp = address();

		const serverPort = 3002;
		//
		this.server = new Server(serverPort);
		this.socket = new SocketServer();

		// Electron part
		app.on('ready', async () => {
			// TODO: instantiationService ?
			this.mainWindow = new BrowserWindow(
				{
					width: 800,
					height: 185,
					webPreferences: {
						nodeIntegration: true,
						contextIsolation: false
					},
					show: false
				}
			);

			this.mainWindow.loadURL(url.format({
				pathname: path.join(__dirname, '../renderer/index.html'),
				protocol: 'file:',
				slashes: true
			}));

			const mainReadyToShow = new Promise(resolve => this.mainWindow?.once('ready-to-show', resolve));
			await mainReadyToShow;
			this.mainWindow.show();

			if (this.isDev) {
				this.connectElectronClient();
			}
		})

		app.on('window-all-closed', () => {
			this.server.close();
			this.socket.close();
			app.quit();
		})

		console.log(`Https is runing at https://${localIp}:${serverPort}`);
	}

	connectElectronClient() {
		var { client } = require('electron-connect');
		client.create(this.mainWindow, { port: 30030 });
		this.mainWindow?.webContents.openDevTools();
	}
}

const main = new Main();
main.start();