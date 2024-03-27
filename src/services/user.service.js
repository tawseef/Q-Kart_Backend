const { User } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement getUserById(id)
/**
 * Get User by id
 * - Fetch user object from Mongo using the "_id" field and return user object
 * @param {String} id
 * @returns {Promise<User>}
 */
 const getUserById = async (id) => {
    //     // console.log("id>>>>>>>>>>>>", id)
    //     // const response = await User.find(id);
    //     const result = await User.findById({ _id: id });
    //     console.log(result)
    //     //
    //   return result;
    try {
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      // console.log(id)
      const data = await User.findById(id);
  
      if (!data) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }
  
      return data;
    } catch (error) {
      if (error.name === "CastError" && error.kind === "ObjectId") {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid userId format");
      }
      throw error; // Rethrow other errors
    }
  };

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement getUserByEmail(email)
/**
 * Get user by email
 * - Fetch user object from Mongo using the "email" field and return user object
 * @param {string} email
 * @returns {Promise<User>}
 */
 const getUserByEmail = async (email) => {
    const response = await User.findOne({ email: email });
    if (!response) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        '""email"" must be a present before'
      );
    }
  
    return response;
  };

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement createUser(user)
/**
 * Create a user
 *  - check if the user with the email already exists using `User.isEmailTaken()` method
 *  - If so throw an error using the `ApiError` class. Pass two arguments to the constructor,
 *    1. “200 OK status code using `http-status` library
 *    2. An error message, “Email already taken”
 *  - Otherwise, create and return a new User object
 *
 * @param {Object} userBody
 * @returns {Promise<User>}
 * @throws {ApiError}
 *
 * userBody example:
 * {
 *  "name": "crio-users",
 *  "email": "crio-user@gmail.com",
 *  "password": "usersPasswordHashed"
 * }
 *
 * 200 status code on duplicate email - https://stackoverflow.com/a/53144807
 */
 const createUser = async (body) => {
    console.log("Create User in User Service");
    if(User.isEmailTaken(body.email)){
        throw new ApiError(400, "Email is already taken.");
    }else{
        const result = await User.create(body);
        return result;
    }

    // /   User EmailAlreadyTaken Method from user Model
  };
  
  const getUsers = async () => {
    const res = await User.find();
    return res;
  };
  

module.exports = {getUserById, createUser, getUserByEmail}