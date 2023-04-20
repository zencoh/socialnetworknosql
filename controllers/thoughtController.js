const { ObjectId } = require("mongoose").Types;
const { Thought } = require("../models");

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      const thoughtObj = {
        thoughts,
      };

      res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json({ thought });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        {
          $set: req.body,
        }
      );

      if (!thought) {
        return res.status(404).json({ message: "No Thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No Thought with that ID" });
      }

      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    try {
      const reactionData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );
      if (!reactionData) {
        return res.status(404).json({ message: "No Thought with that ID" });
      }

      res.json(reactionData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const reactionData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params._id } } },
        { new: true }
      );
      if (!reactionData) {
        return res.status(404).json({ message: "No Thought with that ID" });
      }

      res.json(reactionData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
