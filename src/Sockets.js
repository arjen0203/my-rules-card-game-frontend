import io from 'socket.io-client';
import { SOCKETSURL } from './Constants';

class Socket {
	constructor() {
		this.init();
	}

	init() {
		this.socket = io(SOCKETSURL, { path:'/sockets' });
		
		this.socket.on('error', (data) => console.log(data))
	}

	on(path, callback) {
		this.socket.on(path, callback);
	}

	emit(path, data) {
		this.socket.emit(path, data);
	}

	off(path) {
		this.socket.removeAllListeners(path);
	}
	
}

const socket = new Socket();
export default socket;