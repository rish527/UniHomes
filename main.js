import express from 'express';
import {dirname} from "path";
import { fileURLToPath } from 'url';
import dataBase from './database.js';
import getMatches from './matches.js';
import bodyParser from 'body-parser'; 
import path from 'path';
import cors from 'cors';




const app = express();
const __dirname=dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname+'/Public/LandingPage'));
app.use(express.static(__dirname+'/Public/Dashboard'));
app.use(express.static(__dirname+'/Public/LoginPage'));
app.use(express.static(__dirname+'/Public/Register'));


app.get('/', (req, res) => {
    res.sendFile(__dirname+"/Public/LandingPage/index.html");
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname+"/Public/LoginPage/login.html");
});
app.get('/register', (req, res) => {
    res.sendFile(__dirname+"/Public/Register/register.html");
});
app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname+"/Public/Dashboard/dashboard.html");
});

app.post('/loginCheck',(req,res)=>{
    const username= req.body.username;
    const password= req.body.password;
    dataBase.check(username,password, (err, id) => {
        if (err) {
            // Handle error
            console.error("An error occurred:", err);
            return;
        }
        if (id) {
            // User found
            console.log("User ID:", id);
            res.redirect(`/dashboard?id=${id}`);
        } else {
            // User not found
            console.log("User not found");
            return res.redirect('/login?error=User not found');
        }
    })
    
});
app.get('/getUserData',(req,res)=>{
    let userId = req.query.id;
    console.log(userId);
    dataBase.getData(userId, (err, data) => {
        if (err) {
            // Handle error
            console.error("An error occurred:", err);
            return;
        }
        if (data) {
            // User found
            console.log("User Data:", data);
            res.send(data);
        } else {
            // User not found
            console.log("User not found");
            res.sendStatus(404);
            
        }
    })
})

app.get('/getMatchData',async (req,res)=>{
    const id=req.query.id;
    const matches = await getMatches(id);
    console.log('Matches;',matches);
    dataBase.getMatch(matches,(err,data)=>{
        if(err){
            console.error("An error occurred:", err);
            return;
        }
        if(data){
            console.log('Matches:',data);
            res.send(data);
        }else{
            console.log('No Match Found')
            res.status(404).send('No Match Found')
        }
        
    })
})

app.post("/registerSubmit",(req,res)=>{
    const userData=req.body;
    console.log(userData);
    dataBase.putLoginData(userData, (err, id) => {
        if (err) {
            // Handle error
            console.error("An error occurred:", err);
            return;
        }
        else {
            dataBase.putUserData(userData, (err, id) => {
                if (err) {
                    // Handle error
                    console.error("An error occurred:", err);
                    return;
                }
                else {
                    console.log('Data submited...');
                    return res.redirect('/?message=Registered');
                }
            })
        }
    })
    
  })




const port = 4040;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
