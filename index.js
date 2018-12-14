var ws = require('nodejs-websocket');
var userArr = {};//保存用户
console.log('服务器启动');
var server = ws.createServer(function (conn) {
	console.log('New connection');
	let note = conn.path.split('?')[1].split('=')[1];//根据连接的地址来判断连接进来用户，
	if (!userArr[note]) {
		userArr[note] = conn;
	};
	conn.on('text', function (str) {
		str = JSON.parse(str);
		if(userArr[str.to]){
			userArr[str.to].sendText(str.msg);
		}else{
			userArr[note].sendText('该用户已离线');
		}
	});
	conn.on('error', function (code, reason) {
		console.log('Connection error');
		delete userArr[note];
	});
	conn.on('close', function (code, reason) {
		console.log('Connection closed');
		delete userArr[note];
	});
}).listen(3000);