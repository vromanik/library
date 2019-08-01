const express = require('express')
const router = express.Router()
var mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'node',
    password : '123456',
    database:'library'
});

function getConnection(){
    return pool
};

router.get('/', function (req, res) {
  res.render('homePage')
  });

router.get('/registration', function (req, res) {
    res.render('userRegForm')
  });

router.post('/registration', function (req, res) {
  
  let firstName = req.body.userFirstName;
  let lastName = req.body.userLastName;
  email = req.body.userEmail;
  let birthDate = req.body.userBirthDate;
  let gender = req.body.userGender;
  let password = req.body.userPassword;
  let admin = false;
  
   const queryString = "INSERT INTO users(firstName, lastName, email, birthDate, gender, password, admin) VALUES (?, ?, ?, ?, ?, ?, ?)"
    getConnection().query(queryString,[firstName, lastName, email, birthDate, gender, password, admin], (err, results, fields) => {
      if (err) {
          console.log("Failed to insert new user: " + err)
          res.sendStatus(500)
      return
      }
    })
    res.render('userContactInfo')
});

router.post('/userContactInfo', function (req, res) {

    console.log(email);
  
    let homeNumber = req.body.userHomeNumber;
    let workNumber = req.body.userWorkNumber;
    let mobileNumber = req.body.userMobileNumber;

    let country = req.body.userCountry;
    let region = req.body.userRegion;
    let city = req.body.userCity;
    let streetAddress1 = req.body.userStreetAddress1;
    let streetAddress2 = req.body.userStreetAddress2;
    let postalCode = req.body.userPostalCode;

     const queryString = "SELECT user_id FROM users WHERE email = ?"
        getConnection().query(queryString,[email], (err, rows, fields) => {
            if (err) {
              console.log("Failed to insert new user address: " + err)
              res.sendStatus(500)
              return
            }
            else
              callback(null, rows[0].user_id);
              //res.value
              //return
        });

    // const queryString1 = "INSERT INTO user_addresses(fk_user_id, country, region, city, streetAddress1, streetAddress2, postalCode) VALUES (?, ?, ?, ?, ?, ?, ?)"
    //     getConnection().query(queryString1,[userId, country, region, city, streetAddress1, streetAddress2, postalCode], (err, results, fields) => {
    //       {
    //       if (err) {
    //           console.log("Failed to insert new user address: " + err)
    //           res.sendStatus(500)
    //       return
    //       }
    //     }
    //   })
  
    //   const queryString2 = "INSERT INTO user_phone_numbers(fk_user_id, homeNumber, workNumber, mobileNumber) VALUES (?, ?, ?, ?)"
    //   getConnection().query(queryString2,[userId, homeNumber, workNumber, mobileNumber], (err, results, fields) => {
    //     {
    //       if (err) {
    //           console.log("Failed to insert new user_address: " + err)
    //           res.sendStatus(500)
    //       return
    //       }
    //     }
    //   })

    res.send('Registration complete')
});

module.exports = router