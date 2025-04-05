const { GraphQLString, GraphQLFloat, GraphQLID } = require('graphql');

const UserType = require('../types/UserType');
const EmployeeType = require('../types/EmployeeType');

const User = require('../../models/User');
const Employee = require('../../models/Employee');

const { createToken } = require('../../utils/auth');
const { validateInput } = require('../../utils/validateInput');
const { validateSignup } = require('../../validations/userValidations');
const { validateEmployee } = require('../../validations/employeeValidations');

// Signup Mutation
const Signup = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve(_, args) {
    await validateInput(validateSignup, args);

    const existingUser = await User.findOne({
      $or: [{ email: args.email }, { username: args.username }]
    });

    if (existingUser) throw new Error('User already exists');

    const user = new User(args);
    await user.save();

    const token = createToken(user);

    return {
      id: user._id,
      username: user.username,
      email: user.email,
      token
    };
  }
};

// Add Employee
const AddEmployee = {
  type: EmployeeType,
  args: {
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
    designation: { type: GraphQLString },
    salary: { type: GraphQLFloat },
    date_of_joining: { type: GraphQLString },
    department: { type: GraphQLString },
    employee_photo: { type: GraphQLString }
  },
  async resolve(_, args, context) {
    if (!context.verifiedUser) throw new Error('Unauthorized');

    await validateInput(validateEmployee, args);

    const exists = await Employee.findOne({ email: args.email });
    if (exists) throw new Error('Employee already exists');

    const employee = new Employee(args);
    return await employee.save();
  }
};

// Update Employee
const UpdateEmployee = {
  type: EmployeeType,
  args: {
    id: { type: GraphQLID },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
    designation: { type: GraphQLString },
    salary: { type: GraphQLFloat },
    date_of_joining: { type: GraphQLString },
    department: { type: GraphQLString },
    employee_photo: { type: GraphQLString }
  },
  async resolve(_, args, context) {
    if (!context.verifiedUser) throw new Error('Unauthorized');

    const employee = await Employee.findById(args.id);
    if (!employee) throw new Error('Employee not found');

    Object.keys(args).forEach((key) => {
      if (args[key] !== undefined && key !== 'id') {
        employee[key] = args[key];
      }
    });

    return await employee.save();
  }
};

// Delete Employee
const DeleteEmployee = {
  type: EmployeeType,
  args: {
    id: { type: GraphQLID }
  },
  async resolve(_, args, context) {
    if (!context.verifiedUser) throw new Error('Unauthorized');

    const employee = await Employee.findById(args.id);
    if (!employee) throw new Error('Employee not found');

    await employee.deleteOne();
    return employee;
  }
};

module.exports = {
  Signup,
  AddEmployee,
  UpdateEmployee,
  DeleteEmployee
};
