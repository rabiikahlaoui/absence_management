const usersResolvers = require('./users');
const employeeResolvers = require('./employees');

module.exports = {
  Query: {
    ...employeeResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...employeeResolvers.Mutation,
  }
};
