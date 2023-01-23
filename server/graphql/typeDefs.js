const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  type Employee {
    id: ID!
    fullName: String!
    email: String!
    address: String!
    jobTitle: String!
    createdAt: String!
  }
  type Absence {
    id: ID!
    startDate: String!
    endDate: String!
    employee: Employee!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input EmployeeInput {
    fullName: String!
    email: String!
    address: String!
    jobTitle: String!
  }
  input AbsenceInput {
    startDate: String!
    endDate: String!
    employeeId: ID!
  }
  type Query {
    getEmployees: [Employee]
    getEmployee(employeeId: ID!): Employee
    getAbsences(absenceId: ID!): Absence
    getAbsencesByEmployee(employeeId: ID!): [Absence]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createEmployee(employeeInput: EmployeeInput!): Employee!
    updateEmployee(employeeId: ID!, employeeInput: EmployeeInput!): Employee!
    deleteEmployee(employeeId: ID!): String!
    createAbsence(absenceInput: AbsenceInput!): Absence!
    updateAbsence(absenceId: ID!, absenceInput: AbsenceInput!): Absence!
    deleteAbsence(absenceId: ID!): String!
  }
`;
