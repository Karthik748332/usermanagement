var Userdb = require('../model/model');


// ==============================
// CREATE NEW USER
// ==============================
exports.create = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    user
        .save()
        .then(data => {
            res.send(data);   // ✅ Important for AJAX
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating user"
            });
        });
};



// ==============================
// GET ALL USERS / SINGLE USER
// ==============================
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    return res.status(404).send({
                        message: "User not found with id " + id
                    });
                }
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving user with id " + id
                });
            });

    } else {

        Userdb.find()
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error occurred while retrieving users"
                });
            });

    }
};



// ==============================
// UPDATE USER
// ==============================
exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty"
        });
    }

    const id = req.params.id;

    Userdb.findByIdAndUpdate(id, req.body, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Cannot update user with id ${id}`
                });
            }

            res.send(data);   // ✅ Important for AJAX
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user information"
            });
        });
};



// ==============================
// DELETE USER
// ==============================
exports.delete = (req, res) => {

    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {

            if (!data) {
                return res.status(404).send({
                    message: `Cannot delete user with id ${id}`
                });
            }

            res.send({
                message: "User was deleted successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id = " + id
            });
        });
};
