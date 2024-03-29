//External module imports
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

/*
loads  environment variables from a .env file
 */
dotenv.config();

//Internal module imports
const sequelize = require("./util/database");
const job = require("./jobs/cron");

//Model imports
const User = require("./models/userModel");
const Chat = require("./models/chatModel");
const Group = require("./models/groupModel");
const UserGroup = require("./models/userGroup");

//Routers
const mainroute =require("./router/mainroute")
const userRouter=require('./router/userRouter')
const chatRouter = require("./router/chatRouter");
const groupRouter = require("./router/groupRouter");

// express app initialization
const app = express();

/*
- Middleware
*/
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("../FrontEnd/public"));
//This server can receive request from any client for GET AND POST requests
app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
// Parse incoming JSON data and make it available in req.body


//Routes
app.use(mainroute)
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/group", groupRouter);

//Sequelize Model Associations

//user-chat
//when a user is deleted all related chats will also be deleted
User.hasMany(Chat, { onDelete: "CASCADE" });
Chat.belongsTo(User);

//user-userGroup
User.hasMany(UserGroup);
UserGroup.belongsTo(User);

//chat-group
Group.hasMany(Chat);
Chat.belongsTo(Group);

//Group-userGroup
Group.hasMany(UserGroup);
UserGroup.belongsTo(Group);

//initiates the cron job and begins its scheduled execution.
job.start();

/* Syncs Sequelize models with the database( tabels are created or updated )
 and starts the server on port 4000.
 */
sequelize.sync().then((result) => {
  app.listen(4000);
});
