const { AuthenticationError } = require('apollo-server');

const Employee = require('../../models/Employee');
const checkAuth = require('../../util/check-auth');

module.exports = { 
  Query: {
    async getEmployees(_, {}, context) {
      const user = checkAuth(context);

      try {
        const employees = await Employee.find({ user: user.id }).sort({ createdAt: -1 });
        return employees;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getEmployee(_, { employeeId }, context) {
      const user = checkAuth(context);

      try {
        const employee = await Employee.findOne({ employeeId, user: user.id});
        if (employee) {
          return employee;
        } else {
          throw new Error('Employee not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createEmployee(_, { employeeInput: { fullName, email, address, jobTitle } }, context) {
      const user = checkAuth(context);

      if (fullName.trim() === '') {
        throw new Error('Employee full name must not be empty');
      }

      const newEmployee = new Employee({
        fullName,
        email,
        address,
        jobTitle,
        user: user.id,
        createdAt: new Date().toISOString()
      });

      const employee = await newEmployee.save();

      return employee;
    },
    async updateEmployee(_, { employeeId, employeeInput: { fullName, email, address, jobTitle } }, context) {
      checkAuth(context);

      if (fullName.trim() === '') {
        throw new Error('Employee full name must not be empty');
      }

      await Employee.findByIdAndUpdate(employeeId, { fullName, email, address, jobTitle });
      const employee = await Employee.findById(employeeId);

      return employee;
    },

    async deleteEmployee(_, { employeeId }, context) {
      const user = checkAuth(context);

      try {
        const employee = await Employee.findById(employeeId);
        if (user.id === employee.user) {
          await employee.delete();
          return 'Employee deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
