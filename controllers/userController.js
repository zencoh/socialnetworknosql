const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Include aggregate function to get number of friends?

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            
            const userObj = {
                users
            };
            
            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // get a single user
    async getSingleUser(req, res) {
        try{
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');

            if(!user) {
                return res.status(404).json({ message: 'No User with that ID' })
            }

            res.json({ user });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // create new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId });

            if(!user) {
                return res.status(404).json({ message: 'No User with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete a user
    // how to remove thoughts?
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if(!user) {
                return res.status(404).json({ message: 'No User with that ID' });
            }

            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};