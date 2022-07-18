import { electronServer } from '../common/electron';

const reload = (done) => {
	electronServer.reload();
	done();
}
export default function viewsWatch(done) {
	done();
}