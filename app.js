var ApiBuilder = require('claudia-api-builder'),
  api = new ApiBuilder();

module.exports = api;

api.get('/hello', function () {
  return 'hello lukes world';
});

api.get('/users', function () {
	return 'something about users!';
  });