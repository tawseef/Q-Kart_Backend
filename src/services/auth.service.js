const httpStatus = require("http-status");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");
const User = require("../models");
const bcrypt = require("bcryptjs");

/**
 * Login with username and password
 * - Utilize userService method to fetch user object corresponding to the email provided
 * - Use the User schema's "isPasswordMatch" method to check if input password matches the one user registered with (i.e, hash stored in MongoDB)
 * - If user doesn't exist or incorrect password,
 * throw an ApiError with "401 Unauthorized" status code and message, "Incorrect email or password"
 * - Else, return the user object
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
// const loginUserWithEmailAndPassword = async (email, password) => {
//   const user = await userService.getUserByEmail(email);
//   // console.log("await user.isPasswordMatch(password)");
//   // console.log(await User.isPasswordMatch(password));
//   // if(!user || !(await user.isPasswordMatch(password))){ 
//   //   throw new  ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
//   // }
//   if(!user){ 
//     throw new ApiError(httpStatus.UNAUTHORIZED);
//   }
//   else if(!(await user.isPasswordMatch(password))){
//     throw new ApiError(httpStatus.UNAUTHORIZED);
//   }
//   return user;
// };
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email)
  if(!user || !(await user.isPasswordMatch(password)))
  {
    throw new ApiError(httpStatus.UNAUTHORIZED,"Incorrect Credentials")
  }
  // return {_id:user._id,walletMoney:parseInt(user.walletMoney),name:user.name,email:user.email,password:user.password,address:user.address};
  return user
};


module.exports = {
  loginUserWithEmailAndPassword,
};
