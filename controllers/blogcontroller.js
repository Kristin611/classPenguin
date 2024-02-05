const { User, Blog } = require('../models');

const  blogController = {

  // GET blogs
  async getBlogs(req, res) {
    const thoughts = await Blog.find();
    res.json(thoughts);
  },
  async getSingleBlog(req, res) {
    const singleBlog = await Blog.findOne({
      _id: req.params.blogId
    })
      .select('-__v')
    // .populate('friends').populate('thoughts')
    res.json(singleBlog)
  },


  async createBlogs(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      res.json(newThought);
    } catch (error) {
      // Handle any errors that occurred during creation
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async updateThought(req, res) {
    const modifyThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    if(!modifyThought) {return res.status(404).json({message:"Thought not found"})}
    res.json({"message":"Thought Updated"})
  },

  async deleteThought(req,res) {
    const removeThought = await Thought.findOneAndDelete(
      {_id: req.params.thoughtId}
    )
    if(!removeThought) {return res.status(404).json({message:"Thought not found"})}
    res.json({message: "Thought deleted"})
  },

// createReaction
async createReaction(req, res) {
  const updatedThought = await Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions:  req.body } },
    { new: true } // Return the updated document
  );
  res.json(updatedThought);
},


// removeReaction
async removeReaction(req, res) {
  try{
    const removedReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true } // Return the updated document
    );
    if (!removedReaction) {
      return res.status(404).json({ message: "Reaction not found" });
    }
    res.json({ message: "Reaction Removed" });
  } catch(error){
    console.log(error)
    res.status(500).json(error)
  }
 
},


  

}



  

  
 

  


module.exports = blogController;







