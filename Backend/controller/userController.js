
//provides a set of standard operators that can be used in queries to perform complex conditions.
// imports the Op (Operator) object from the Sequelize library
const { Op } = require("sequelize");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sequelize = require("../util/database");

// Imports the root directory path of the Node.js application(app.js)


/*
  This function generates an access token using the provided user ID and email.
  - Utilizes the 'jsonwebtoken' library to sign a token containing the user's ID and email.
  - Returns the generated access token.
  -The `jwt.sign()` function takes two main parameters:
     - Payload:  object with the data you want to encode in the token
     - Secret: A secret key used to sign the token. 
  -The resulting JWT is a string
  - we send this as a token during succesfull login (login function backend)
*/
function generateAccessToken(id, email) {
  //first paramater payload(as an object), second paramater secret key
  return jwt.sign({ userId: id, email: email },'a46142352jay2352morde5674b784hjfiuye68940sjhhreurh34934i');
}

/*
Express route handler : Serves the sign-up page
*/

/*
Express route handler : Serves the login page
*/



exports.postUserSignUp = async (req, res, next) => {

  const t = await sequelize.transaction();
  try {
    //extract data from the request bodypath
    const name = req.body.Name;
    const email = req.body.Email;
    const number = req.body.Number;
    const password = req.body.Password;

    //Find a user in the database where either the email or number matches the provided values
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { number }],
      },
    });
    //if user exists in db return the fumction with 409 status
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "This email or phone number already exists" });
    }

    //hash the password (salt=10)
    const hash = await bcrypt.hash(password, 10);

    //create a new User
    await User.create({
      name: name,
      email: email,
      number: number,
      password: hash,
      transaction: t,
    });
    //commit the transaction if all operations were succesfull
    await t.commit();
    //send a succes response
    res.status(200).json({
      success: true,
      message: "Signup Successful!",
    });
  } catch (err) {
    console.log(err);
    //Rollback the transaction if there's an error
    await t.rollback();
    //send an error response
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/*
  Handles a POST request to the users/login endpoint
  - Extracts user email and password from the request body.
  - Finds the user in the database based on the provided email.
  - Compares the provided password with the hashed password stored in the database.
    - If the user is found and the passwords match, generates an access token and responds with a success status.
    - If the user is found but the passwords don't match, responds with an authentication failure status.
    - If the user is not found, responds with a user-not-found status.
    - Handles potential errors and responds with appropriate error messages.
*/
exports.postUserLogin = async (req, res, next) => {
  try {
    //Extract user email and password
    const email = req.body.email;
    const password = req.body.password;
    console.log("Email", email);
    console.log("Password", password);

    // Find the user in the database
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      // User not found
      return res.status(404).json({
        success: false,
        message: "User doesn't exist!",
      });
    }

    //Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      //generate access token and login
      return res.status(200).json({
        success: true,
        message: "Login Succesfull",
        token: generateAccessToken(user.id, user.email),
      });
    } else {
      //response for incorrect password
      return res.status(401).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    console.error(error);

    //error response
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
