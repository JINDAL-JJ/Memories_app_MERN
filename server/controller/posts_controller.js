const postMessage = require('../models/postMessage');
const { post } = require('../routes/posts');

module.exports.getPosts = async (req, res) => {
    try {
        const postMessages = await postMessage.find();

        res.status(200).json(postMessages);
    } catch(err) {
        res.status(200).json({message: err.message});
    }
};

module.exports.createPost = async (req, res) => {
    const newPost = new postMessage(req.body);

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch(err) {
        res.status(409).json({message: err.message});
    }
}

module.exports.updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;

    const updatedPost = await postMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});

    res.json(updatedPost);
}

module.exports.deletePost = async (req,res) => {
    await postMessage.findByIdAndDelete(req.params.id);

    res.json({message: 'Post deleted successfully'});
}

module.exports.likePost = async(req,res)=> {
    const post = await postMessage.findById(req.params.id);
    const updatedPost = await postMessage.findByIdAndUpdate(req.params.id, {likeCount: post.likeCount + 1});

    res.json({updatedPost});
}