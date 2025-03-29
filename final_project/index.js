const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
if(req.session && req.session.user)
{
    next();
}
else
{
  res.status(401).json({message:"Unauthorized: Please log in first"})
}
});
 
// const PORT =5001;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

const PORT = process.env.PORT || 5001; // Theia IDE ka port use karein

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
