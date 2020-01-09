const express = require('express');
const app = express();

app.use(express.json());

const users = [];
const grids = [];

app.post('/api/login', (req, res) =>{
    const enteredUser = {
        username: req.body.username,
        password: req.body.password,
    };
    if(validate(enteredUser)){
        res.send(true);
    }
    else{
        res.send(false);
    }

});

function validate(enteredUser){
    for(const user of users){
        if(user.username === enteredUser.username){
            if(user.password === enteredUser.password){
                return true;
            }
        }
    }
    return false;
}

app.post('/api/test', (req, res) =>{
   const user = {
       id: users.length + 1,
       username: req.body.username,
       password: req.body.password,
       email: req.body.email,
       gender: req.body.gender,
       country: req.body.country,
       games: req.body.games,
       proficiency: req.body.proficiency,
       score: 0,
   };
   users.push(user);
    console.log(users);
    res.send(user);
});

app.post('/api/users', (req, res) =>{
    let userName = req.body.user;
    let userScore = req.body.score;
    console.log(userName)
    for(const user of users){
        if(user.username === userName){
            user.score = userScore;
            console.log("The score was " + user.score + " and is now " + userScore);
        }
    }
    console.log(users);
    res.send(users);
});

app.post('/api/grids', (req, res) =>{
    let grid = {
        "name": req.body.name,
        "configuration" : req.body.configuration,
    };
    grids.push(grid);
    res.send(grids);
});

app.get('/api/grids', (req, res) =>{
   res.send(grids);
});

app.get('/api/users', (req, res) =>{
   res.send(users);
});


app.listen(3000, () => console.log("Listening on port 3000"));
