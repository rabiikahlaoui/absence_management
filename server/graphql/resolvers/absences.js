const { AuthenticationError } = require('apollo-server');

const Absence = require('../../models/Absence');
const checkAuth = require('../../util/check-auth');

module.exports = { 
  Query: {
    async getAbsences(_, {}, context) {
      const user = checkAuth(context);

      try {
        const absences = await Absence.find({ user: user.id }).sort({ startDate: -1, endDate: -1 });
        return absences;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getAbsencesByEmployee(_, { employeeId }, context) {
      const user = checkAuth(context);

      try {
        const absence = await Absence.find({ employeeId, user: user.id });
        return absence;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createAbsence(_, { absenceInput: { employeeId, startDate, endDate } }, context) {
      const user = checkAuth(context);

      const newAbsence = new Absence({
        employeeId,
        startDate,
        endDate,
        user: user.id,
        createdAt: new Date().toISOString()
      });

      const absence = await newAbsence.save();
      return absence;
    },
    async updateAbsence(_, { absenceId, absenceInput: { employeeId, startDate, endDate } }, context) {
      checkAuth(context);

      await Absence.findByIdAndUpdate(absenceId, { employeeId, startDate, endDate });
      const absence = await Absence.findById(absenceId);

      return absence;
    },

    async deleteAbsence(_, { absenceId }, context) {
      const user = checkAuth(context);

      try {
        const absence = await Absence.findById(absenceId);
        if (user.id === absence.user) {
          await absence.delete();
          return 'Absence deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
