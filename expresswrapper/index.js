const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
//the app is express lmao idk what's happening but trust
const app = express();

//------------------PLACE ALL QUERIES HERE--------------
const SELECT_ALL_ADMINS = 'SELECT * FROM Admin';
const SELECT_ALL_USERS = 'SELECT * FROM User';
const CHECK_FOR_VAL = "SELECT * FROM *TABLE* WHERE *COLUMN* = *VALUE*";
const CHECK_FOR_VAL_EXISTS = 'SELECT CASE WHEN EXISTS (SELECT * FROM *TABLE* WHERE *COLUMN* = *VALUE*) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END'
const SELECT_ADMIN_BLANK = 'SELECT *BLANK* FROM Admin';
const SELECT_USER_BLANK = 'SELECT *BLANK* FROM User';

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
    //if error is encounteSred just return it.
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
//and this one gets all values in user as a test
app.get('/users', (req, res) => {
    connection.query(SELECT_ALL_USERS, (err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});
//FUNCTION FOR CHECKING FOR A GIVEN VALUE
// ENTER THE *TABLE*, *COLUMN* AND *VALUE*
function checkVal(table, column, value) {
    app.get('/check_for_value', (req, res) => {
        //format a query with the input values.
        var query = CHECK_FOR_VAL.replace("*TABLE*", table);
        query = query.replace("*COLUMN*", column);
        query = query.replace("*VALUE*", value);
        console.log(query);
        connection.query(query, (err, results) => {
            if(err) {
                return res.send(err)
            } else {
                return res.json({
                    data: results
                })
            }
        });
    })
}
checkVal("User", "ID", "'testusr2'");
//--------------------------END---------------------------

app.listen(3000, () => {
    console.log("TMB server listening on port 3000")
});