const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:$C6m9aramaC753$@ds127126.mlab.com:27126/authjs', { useMongoClient: true });

mongoose.connection.on('connected', () => {
	console.log('Conectado ao banco de dados!');
});

mongoose.connection.on('error', (err) => {
	console.log('Erro na conexão: ' + err);
});

mongoose.connection.on('disconnect', () => {
	console.log('Desconectado :(');
});


