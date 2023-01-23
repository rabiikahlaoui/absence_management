const usersResolvers = require('./users');
const employeesResolvers = require('./employees');
const absencesResolvers = require('./absences');

module.exports = {
  Query: {
    ...employeesResolvers.Query,
    ...absencesResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...employeesResolvers.Mutation,
    ...absencesResolvers.Mutation
  }
};
