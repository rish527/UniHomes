import express from 'express';
import dataBase from './database.js';

const router = express.Router();
const app = express();
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

export default router;


