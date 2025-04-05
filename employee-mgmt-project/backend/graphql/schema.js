const { GraphQLSchema, GraphQLObjectType } = require('graphql');

// Queries
const {
    Login,
    getAllEmployees,
    getEmployeeByID,
    searchEmployees
  } = require('./queries');

// Mutations
const {
  Signup,
  AddEmployee,
  UpdateEmployee,
  DeleteEmployee
} = require('./mutations');

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    Login,
    getAllEmployees,
    getEmployeeByID,
    searchEmployees
  }
});

// Root Mutation
const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    Signup,
    AddEmployee,
    UpdateEmployee,
    DeleteEmployee
  }
});

// Export the complete schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
