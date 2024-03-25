const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorController = require('./controllers/error');

const User= require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('65df3e8baab3731f38b29457')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "***********MONGO DB URL******************",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(async result => {


    
    //***************************************************************** */
    const fetchUsers= await User.find({name:"Sohail"})
    if (fetchUsers.length==0) {
    const sohail= User(
      {name:"Sohail"
      ,email:"sa472811@gmail.com"
      , cart: { items: [] }
    })

    sohail.save()
    .then( result =>{
      console.log("User is created");
    })
    .catch(err=>console.log(err))
    }
    //****************************************************************** */
    app.listen(3000,()=>{
      console.log("app listening********");
    });
  })
  .catch(err => {
    console.log(err);
  })
 
