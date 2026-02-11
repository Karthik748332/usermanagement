const axios = require('axios');

// Home Page
exports.homeRoutes = (req, res) => {
    axios.get('http://localhost:8080/api/users')
        .then(function(response) {
            res.render('index', { users: response.data });
        })
        .catch(err => {
            res.send(err);
        });
};


// Add User Page
exports.adduser = (req, res) => {
    res.render('adduser');
};


// Update User Page
exports.updateuser = (req, res) => {
    axios.get('http://localhost:8080/api/users', {
        params: { id: req.query.id }
    })
    .then(function(userdata) {
        res.render("updateuser", { user: userdata.data });
    })
    .catch(err => {
        res.send(err);
    });
};
