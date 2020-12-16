import io from 'socket.io-client';

class Socket {
	constructor() {
		this.init();
	}

	init() {
		this.socket = io('ws//localhost:6003', { path:'/sockets' });
	}

	on(path, callback) {
		this.socket.on(path, callback);
	}

	emit(path, data) {
		this.socket.emit(path, data);
	}
}

const socket = new Socket();
export default socket;