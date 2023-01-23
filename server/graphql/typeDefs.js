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
  type Query {
    getEmployees: [Employee]
    getEmployee(employeeId: ID!): Employee
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createEmployee(employeeInput: EmployeeInput!): Employee!
    updateEmployee(employeeId: ID!, employeeInput: EmployeeInput!): Employee!
    deleteEmployee(employeeId: ID!): String!
  }
`;
