const  {User}   = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const config = require("../../src/config/config");

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement getUserById(id)
/**
 * Get User by id
 * - Fetch user object from Mongo using the "_id" field and return user object
 * @param {String} id
 * @returns {Promise<User>}
 */
 const getUserById = async (id) => {
    
    // try {
      const user = await User.findById(id);
      // if (!user) {
      //   throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      // }
      // console.log(user)
  
      return user;
    // } catch (error) {
    //   if (error.name === "CastError" && error.kind === "ObjectId") {
    //     throw new ApiError(httpStatus.BAD_REQUEST, "Invalid userId format");
    //   }
    //   throw error; // Rethrow other errors
    // }
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
        httpStatus.UNAUTHORIZED,  /// BAD_REQUEST
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
    if(await User.isEmailTaken(body.email)){
        throw new ApiError(httpStatus.OK, "Email is already taken.");
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const result = await User.create({...body, password: hashedPassword});
    
    return result;
  

    // const result = await User.create(body);
    //     return result;

    // /   User EmailAlreadyTaken Method from user Model
  };
  
  const getUsers = async () => {
    const res = await User.find();
    return res;
  };
  



// TODO: CRIO_TASK_MODULE_CART - Implement getUserAddressById()
/**
 * Get subset of user's data by id
 * - Should fetch from Mongo only the email and address fields for the user apart from the id
 *
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */

const getUserAddressById = async (id) => {
  // const user  = await User.findOne({_id:id});    //////////   for TEST
//   const user  = await User.findById(id);
//   return user;
return User.findOne({_id:id},{email:1,address:1})
};


/**
 * Set user's shipping address
 * @param {String} email
 * @returns {String}
 */
const setAddress = async (user, newAddress) => {
  user.address = newAddress;
  await user.save();

  return user.address;
};


module.exports = { getUserById, createUser, getUserByEmail, getUsers, setAddress, getUserAddressById }