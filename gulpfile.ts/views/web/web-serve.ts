import browserSync from 'browser-sync';
import historyFallback from "connect-history-api-fallback";


export default function webServer(done) {
	browserSync.init({
		port: 3003,
		server: {
			baseDir: `dist/app-views/web`
		},
		middleware: [historyFallback()]
	})

	done();
}