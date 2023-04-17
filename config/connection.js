const { connect, connection } = require('mongoose');

// need to include collection after local host ip address
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';

  connect(connectionString);

module.exports = connection;
