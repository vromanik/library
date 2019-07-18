const express = require('express')
const router = express.Router()
var mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'Localhost',
    user: 'node',
    password : '123456',
    database:'library'
});

function getConnection(){
    return pool
};

router.get('/', function (req, res) {
    res.send('API home page')
  });

router.get('/registration', function (req, res) {
    res.render('registrationForm')
  });

router.post('/registration', function (req, res) {
    
    data = req.body
    console.log(data); 
  
    let firstName = req.body.userFirstName;
    let lastName = req.body.userLastName;
    let email = req.body.userEmail;
    let birthDate = req.body.userBirthDate;
    let gender = req.body.userGender;
    let password = req.body.userPassword;
    let admin = false;

    let country = req.body.userCountry;
    let region = req.body.userRegion;
    let city = req.body.userCity;
    let streetAddress1 = req.body.userStreetAddress1;
    let streetAddress2 = req.body.userStreetAddress2;
    let postalCode = req.body.userPostalCode;
    

    const queryString = "INSERT INTO user_addresses(country, region, city, streetAddress1, streetAddress2, postalCode) VALUES (?, ?, ?, ?, ?, ?)"
    getConnection().query(queryString,[country, region, city, streetAddress1, streetAddress2, postalCode ], (err, results, fields) => {
      if (err) {
          console.log("Failed to insert new user_address: " + err)
          res.sendStatus(500)
      return
      }
    })

    // queryString = "INSERT INTO users(firstName, lastName, email, birthDate, gender, password, admin) VALUES (?, ?, ?, ?, ?, ?, ?)"
    // getConnection().query(queryString,[firstName, lastName, email, birthDate, gender, password, admin], (err, results, fields) => {
    //   if (err) {
    //       console.log("Failed to insert new user: " + err)
    //       res.sendStatus(500)
    //   return
    //   }
    // })
      //console.log("Inserted a new user with ID: ", results.insertedID);
      
      res.send('New user has been created')
   
});

module.exports = router