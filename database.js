import mysql from 'mysql2';




function getConnection() {
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '2005',
        database: 'unihomes'
    });
    db.connect((err) => {
        if (err) {
            console.error("An error occurred while trying to make a connection", err);
            return;
        }
        console.log("Connected to MySQL Database Unihomes");
    });
    return db;
}

function check(email, password, callback) {
    var query = 'SELECT system_id FROM login_data WHERE email=? AND password=?';
    var con = getConnection();
    con.query(query, [email, password], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            callback(err, null); // Pass the error to the callback
            return;
        }
        if (result.length > 0) {
            var id = result[0].system_id;
            console.log('User Found:', id);
            callback(null, id); // Pass the result to the callback
        } else {
            console.log('User not found');
            callback(null, null); // Pass null to indicate user not found
        }
    });
}
function getData(id, callback) {
    var query = 'SELECT * FROM userdata WHERE System_Id=?';
    var con = getConnection();
    con.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            callback(err, null); // Pass the error to the callback
            return;
        }
        if (result.length > 0) {
            var data= result[0];
            console.log('User Found:', id);
            callback(null, data); // Pass the result to the callback
        } else {
            console.log('User not found');
            callback(null, null); // Pass null to indicate user not found
        }
    });
}
function getMatch(id, callback) {
    var query = 'SELECT * FROM userdata WHERE System_Id IN (?)';
    var con = getConnection();
    con.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            callback(err, null); // Pass the error to the callback
            return;
        }
        if (result.length > 0) {
            var data = result;
            // console.log('User Found:', data);
            callback(null, data); // Pass the result to the callback
        } else {
            console.log('User not found');
            callback(null, null); // Pass null to indicate user not found
        }
    });
    
}

function putUserData(userdata, callback){
    const sql = 'INSERT INTO userdata (Name, System_Id, Course, Branch, Year, State, Religion, Food, Language, Sleep, Smoke_Drink, Shared_Room_Before, Cleanliness) VALUES (?, ?, ?, ?,?,?,?,?,?,?,?,?,?)';
    var con = getConnection();
    con.query(sql, [userdata.name,userdata.username,userdata.course,userdata.branch,userdata.year,userdata.state,userdata.religion,userdata.food,userdata.language,userdata.sleep,userdata.smoke,userdata.shared,userdata.clean], (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err.message);
            
        } else {
            console.log('Data inserted successfully.');
            callback(null, 'Done');
        }
    });
}
function putLoginData(userdata, callback){
    const sql = 'INSERT INTO login_data (Name, system_id, email, password) VALUES (?, ?, ?, ?)';
    var con = getConnection();
    var data='Done';
    con.query(sql, [userdata.name,userdata.username,userdata.email,userdata.password], (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err.message);
            
        } else {
            console.log('Login Data inserted successfully.');
            callback(null, 'Done');
        }
    });
}

// getMatch([2022548738, 2022477888, 2022543048, 2022579523, 2022005748], function(err, results){} );


export default { getConnection, check, getData,  getMatch ,putLoginData, putUserData};
