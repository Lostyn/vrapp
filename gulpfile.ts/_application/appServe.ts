import gulp from 'gulp';
import electronConnect from 'electron-connect';


let onDone;
export const electronServer = electronConnect.server.create({
	port: 30030,
	stopOnClose: true
})
const callback = function (electronProcState) {
	console.log('electron process state: ' + electronProcState);
	if (electronProcState == 'stopped') {
		onDone();
		process.exit();
	}
};

export default function appServer(done) {
	onDone = done;
	electronServer.start(callback);

	return onDone;
}