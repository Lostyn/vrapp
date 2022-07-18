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

export default function electron(done) {
	onDone = done;
	electronServer.start(callback);

	return onDone;
}