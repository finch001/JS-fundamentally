const personController = require('../controllers/PersonController');

const routes = [
  {
    method: 'GET',
    url: '/api/people',
    handler: personController.getPeople
  },
  {
    method: 'GET',
    url: '/api/people/:id',
    handler: personController.getSinglePerson
  },
  {
    method: 'PUT',
    url: '/api/people/:id',
    handler: personController.addPerson
  },
  {
    method: 'DELETE',
    url: '/api/people/:id',
    handler: personController.deletePerson
  }
];

module.exports = routes;
