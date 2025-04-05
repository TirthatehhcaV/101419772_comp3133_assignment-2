const { GraphQLString, GraphQLList, GraphQLID } = require('graphql');
const { UserType, EmployeeType } = require('../types');
const mongoose = require('mongoose');

const User = require('../../models/User');
const Employee = require('../../models/Employee');
const bcrypt = require('bcryptjs');
const { createToken } = require('../../utils/auth');

const { validateLogin } = require('../../validations/userValidations');
const { validateInput } = require('../../utils/validateInput');

// Login Query
const Login = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    await validateInput(validateLogin, args);

    const user = await User.findOne({ email: args.email });
    if (!user) throw new Error('User not found');

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) throw new Error('Incorrect password');

    const token = createToken(user);
    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      token
    };
  }
};

// Get All Employees
const getAllEmployees = {
  type: new GraphQLList(EmployeeType),
  async resolve(parent, args, context) {
    if (!context.verifiedUser) throw new Error('Unauthenticated');
    return await Employee.find();
  }
};

// Get Employee by ID
const getEmployeeByID = {
  type: EmployeeType,
  args: {
    id: { type: GraphQLString }
  },
  async resolve(parent, args, context) {
    if (!context.verifiedUser) throw new Error('Unauthenticated');
    return await Employee.findById(args.id);
  }
};


  // Search Employees by department/designation
  const SearchEmployee = {
    type: new GraphQLList(EmployeeType),
    args: {
      designation: { type: GraphQLString },
      department: { type: GraphQLString }
    },
    async resolve(_, args, context) {
      if (!context.verifiedUser) throw new Error('Unauthorized');
  
      const query = {};
      if (args.designation) query.designation = args.designation;
      if (args.department) query.department = args.department;
  
      return await Employee.find(query);
    }
  };
  
// Change exports to match the imports in schema.js
module.exports = {
    Login,
    getAllEmployees,  // Changed from getAllemployees
    getEmployeeByID,  // Changed from getEmployeebyID
    searchEmployees: SearchEmployee  // Alias to match import
  };