const routes = require('./routes');
const DB = require('./db');
const swagger = require('./config/swagger');
const app = require('fastify')({
  logger: true
});

app.register(require('fastify-swagger'), swagger.options);

DB.init();

routes.forEach((route, index) => {
  app.route(route);
});

const start = async () => {
  try {
    await app.listen(3000);
    app.swagger();
    app.log.info(`server listening on ${app.server.address().port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
