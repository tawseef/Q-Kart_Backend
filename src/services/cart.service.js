const httpStatus = require("http-status");
const { Cart, Product,User } = require("../models");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");
const { userService } = require("./user.service");

// TODO: CRIO_TASK_MODULE_CART - Implement the Cart service methods

/**
 * Fetches cart for a user
 * - Fetch user's cart from Mongo
 * - If cart doesn't exist, throw ApiError
 * --- status code  - 404 NOT FOUND
 * --- message - "User does not have a cart"
 *
 * @param {User} user
 * @returns {Promise<Cart>}
 * @throws {ApiError}
 */
// const getCartByUser = async (user) => {
//   console.log("getCartByUser");
//   const findingCart = await Cart.find({email: user.email})
//   if(findingCart === null) throw new ApiError(httpStatus.NOT_FOUND, "User does not have a cart");

//   return findingCart;
// };
const getCartByUser = async (user) => {
  const cart = await Cart.findOne({email:user.email})
  if(!cart){
    throw new ApiError(httpStatus.NOT_FOUND,"User does not have a cart")
  }
  return cart;
};


/**
 * Adds a new product to cart
 * - Get user's cart object using "Cart" model's findOne() method
 * --- If it doesn't exist, create one
 * --- If cart creation fails, throw ApiError with "500 Internal Server Error" status code
 *
 * - If product to add already in user's cart, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product already in cart. Use the cart sidebar to update or remove product from cart"
 *
 * - If product to add not in "products" collection in MongoDB, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product doesn't exist in database"
 *
 * - Otherwise, add product to user's cart
 *
 *
 *
 * @param {User} user
 * @param {string} productId
 * @param {number} quantity
 * @returns {Promise<Cart>}
 * @throws {ApiError}
 */
// const addProductToCart = async (user, productId, quantity) => {
//   console.log("user AddProductToCart")
//   let cart = await Cart.findOne({email: user.email});
//   if(!cart){
//     try{
//       cart = await Cart.create({
//         email: user.email,
//         cartItems: [],
//         paymentOption: "PAYMENT_OPTION_DEFAULT"
//       })
//     }catch(error){
//       throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "500 Internal Server Error");
//     }
//   }
//   if(cart === null) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "500 Internal Server Error");

//   let pointer = -1;
//   for(let i=0; i<cart.cartItems.length; i++){
//     if(productId === cart.cartItems[i].product._id){
//       pointer = i;
//       break;
//     }
//   }
  
//   if(pointer===-1){
//     let product = await Product.findById(productId) // was findOne({ _Id:productId })

//     if(product===null) throw new ApiError(httpStatus.BAD_REQUEST, "Product doesn't exist in database");

//     cart.cartItems.push({product, quantity})
//   }else{
//     throw new ApiError(httpStatus.BAD_REQUEST, "Product already in cart. Use the cart sidebar to update or remove product from cart");
//   }
  
//   await cart.save();
//   return cart;
// };
const addProductToCart = async (user, productId, quantity) => {
  let cart = await Cart.findOne({email:user.email});

  if (!cart){
    try{
       cart = await Cart.create({
        email:user.email,
        cartItems:[],
        paymentOption:config.default_payment_option,
        });
        await cart.save();
    }catch(e){
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"User cart creation failed");
    }
  }
  // if (!cart.cartItems.length === 0) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, "Bad request");
  // }

  // if(cart.cartItems.find((item)=>{
  //   item["product"]["_id"] === productId}))
  // {
  // throw new ApiError(httpStatus.BAD_REQUEST,"Product already in cart. Use the cart sidebar to update or remove product from cart")
  // }

// const exists = cart.cartItems.some((item) => item.product._id.equals(productId));
let exists = cart.cartItems.some((item) => item.product._id.equals(productId));

if (exists) {
  throw new ApiError(
    httpStatus.BAD_REQUEST,
    "Product is already present in cart, Use the cart side bar to update or remove from the cart"
  );
}


///////////////////impleme mins
// console.log(cart.cartItems);
// // console.log(cart.cartItems.length);
// // console.log(cart.cartItems[0].product._id);
// let pointer = -1;
//   for(let i=0; i<cart.cartItems.length; i++){
//     if(productId === cart.cartItems[i].product._id){
//       pointer = i;
//       break;
//     }
//   }
//   if (pointer===-1) {
//     throw new ApiError(
//       httpStatus.BAD_REQUEST,
//       "Product is already present in cart, Use the cart side bar to update or remove from the cart"
//     );
//     }


///////////////////impleme mins


const product = await Product.findOne({_id:productId})

if(!product){
  throw new ApiError(httpStatus.BAD_REQUEST,"product doesn't exist in the database")
}

cart.cartItems.push({ product:product,quantity:quantity});
await cart.save();

return cart;
};

/**
 * Updates the quantity of an already existing product in cart
 * - Get user's cart object using "Cart" model's findOne() method
 * - If cart doesn't exist, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "User does not have a cart. Use POST to create cart and add a product"
 *
 * - If product to add not in "products" collection in MongoDB, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product doesn't exist in database"
 *
 * - If product to update not in user's cart, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product not in cart"
 *
 * - Otherwise, update the product's quantity in user's cart to the new quantity provided and return the cart object
 *
 *
 * @param {User} user
 * @param {string} productId
 * @param {number} quantity
 * @returns {Promise<Cart>}
 * @throws {ApiError}
 */
// const updateProductInCart = async (user, productId, quantity) => {
//   let cart = await Cart.find({email: user.email});  ///was   findOne({email: user.email})
//   console.log("This");
//   if(cart===null){
//     throw new ApiError(httpStatus.BAD_REQUEST, "User does not have a cart. Use POST to create cart and add a product");
//   }
   
//   let product = await Product.find({email: user.email});   /// was findOne({email: user.email})
  
//   if(product===null){
//     throw new ApiError(httpStatus.BAD_REQUEST, "Product doesn't exist in database");
//   }
//   console.log("cart");
//   // console.log(cart[0].cartItems.length);
//   console.log(cart.length);

//   let pointer = -1;
//   for(let j=0; j<cart.length; j++)
//   for(let i=0; i<cart[j].cartItems.length; i++){
//     if(productId === cart[j].cartItems[i].product._id){
//       pointer = i;
//       break;
//     }
//   }

//   if(pointer===-1){
//     throw new ApiError(httpStatus.BAD_REQUEST, "Product not in cart");
//   }else{
//     cart.cartItems[pointer].quantity = quantity;
//   }

//   await cart.save();

//   return cart;
// };
const updateProductInCart = async (user, productId, quantity) => {
  const cart = await Cart.findOne({email:user.email});
  

  if (!cart){
  
      throw new ApiError(httpStatus.BAD_REQUEST,"User does not have a cart. Use POST to create cart and add a product");
    
  }


  //[ {P:{id},Q} , {P:{id},Q} , {P:{id},Q} , {P:{id},Q} ]

  const product = await Product.findOne({_id: productId});
  
  if(!product){
    throw new ApiError(httpStatus.BAD_REQUEST,"Product doesn't exist in database");
  }

  // const productIndex = cart.cartItems.findIndex(item => item.product._id.toString() == productId.toString());

  //  if(productIndex ===-1){
  //   throw new ApiError(httpStatus.BAD_REQUEST,"Product not in cart")
  //  }

  //  cart.cartItems[productIndex].quantity = quantity;

  //  await cart.save();
  //  return cart;
  //console.log("ssssssssssssssss");
  const productIndex = cart.cartItems.findIndex(item => item.product._id == productId);

 if(productIndex ===-1){
  throw new ApiError(httpStatus.BAD_REQUEST,"Product not in cart")
 }

 cart.cartItems[productIndex].quantity = quantity;
  
  await cart.save();
  return cart

};

/**
 * Deletes an already existing product in cart
 * - If cart doesn't exist for user, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "User does not have a cart"
 *
 * - If product to update not in user's cart, throw ApiError with
 * --- status code  - 400 BAD REQUEST
 * --- message - "Product not in cart"
 *
 * Otherwise, remove the product from user's cart
 *
 *
 * @param {User} user
 * @param {string} productId
 * @throws {ApiError}
 */
const deleteProductFromCart = async (user, productId) => {
  const cart = await Cart.findOne({email:user.email});
  if(!cart) throw new ApiError(httpStatus.BAD_REQUEST,"User does not have a cart");
  // if(productId !== Product._id) throw new ApiError(httpStatus.BAD_REQUEST,"Product not in cart");
  
  // await Cart.findByIdAndDelete({_id: productId})
  const productExist = cart.cartItems.findIndex((item) => item.product._id.equals(productId));
  if (productExist === -1) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Product not in cart");
  }
  cart.cartItems.splice(productExist, 1);
  cart.save();
  return await cart;

};


// TODO: CRIO_TASK_MODULE_TEST - Implement checkout function
/**
 * Checkout a users cart.
 * On success, users cart must have no products.
 *
 * @param {User} user
 * @returns {Promise}
 * @throws {ApiError} when cart is invalid
 */

const checkout = async (user) => {
  
  const getUserCart = await Cart.findOne({email:user.email})
 
  if(getUserCart == null){
    throw new ApiError(httpStatus.NOT_FOUND,"User does not have a cart");
  }
  if(getUserCart.cartItems.length==0)
  {
    throw new ApiError(httpStatus.BAD_REQUEST,"User does not have items in the cart");
  }

  const hasDefaultAddress = await user.hasSetNonDefaultAddress();
  
  if(!hasDefaultAddress){
    throw new ApiError(httpStatus.BAD_REQUEST,"Address not set");
  }


  const totalCost = getUserCart.cartItems.reduce((acc,item)=>{return acc = acc+ item.product.cost *item.quantity}, 0)

  if(totalCost > user.walletMoney){
    throw new ApiError(httpStatus.BAD_REQUEST,"User does not have sufficient balance");
  }

  user.walletMoney = user.walletMoney - totalCost;
  user=new User(user)
  await user.save();

  const success = getUserCart;
  
  if(!Boolean(success)){
    throw new ApiError(httpStatus.NOT_FOUND,"Cart not exist")
  }


  
  const cartId = await Cart.findOne({email:user.email})
  await Cart.findByIdAndRemove(cartId._id);

  getUserCart.cartItems= []
  await getUserCart.save();
  // return success;  
};

module.exports = {
  getCartByUser,
  addProductToCart,
  updateProductInCart,
  deleteProductFromCart,
  checkout,
};
