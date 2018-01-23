const app = require('./config/express')();

require('dotenv').config()
require('./config/database');


app.listen(app.get('port'), () => {
  console.log(`Servidor rodando na porta ${app.get('port')}...`);
});


