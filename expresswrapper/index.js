const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
//the app is express lmao idk what's happening but trust
const app = express();

//------------------PLACE ALL QUERIES HERE--------------
const selectAllAdmins = 'SELECT * FROM Admin';
const selectALLUsers = 'SELECT * FROM User';
//----------------------------END-----------------------

//create the connection instance
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', //insert ur password here.
    //this is why you shouldn't be editing master.
    database: 'TMB'
});

//actually connect
connection.connect(err => {
    if(err){
        return err;
    }
    //if error is encountered just return it.
});
//just checking the conneciton deets:
console.log(connection);

//boilerplate:
app.use(cors());

//--------------------set up json responses.-------------
//json requests pulled from root ('/'), with request and
//response inputs. This one just prints shit
app.get('/', (req, res) => {
    res.send('hello from the TMB server')
});
//and this one gets actual data.
const req
app.get('/', (req, res) => {

})
//--------------------------END---------------------------

app.listen(3000, () => {
    console.log("TMB server listening on port 3000")
});