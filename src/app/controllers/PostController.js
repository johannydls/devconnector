const { validationResult } = require('express-validator');

const Post = require('../models/Post');
const User = require('../models/User');
const Profile = require('../models/Profile');

class PostController {

  /**
   * @route  POST api/posts
   * @desc   Create a post
   * @access Private
   */
  async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();

      return res.json(post);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
  }

  /**
   * @route  Get api/posts
   * @desc   Get all postss
   * @access Private
   */
  async getAll(req, res) {
    try {
      const posts = await Post.find().sort({ created_at: -1 });
      return res.json(posts);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
  }

  /**
   * @route  Get api/posts/:id
   * @desc   Get post by id
   * @access Private
   */
  async getPost(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      return res.json(post);
    } catch (error) {
      console.error(error.message);
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Post not found' });
      }
      return res.status(500).send('Server Error');
    }
  }

  /**
   * @route  DELETE api/posts/:id
   * @desc   Delete a post
   * @access Private
   */
  async deletePost(req, res) {
    try {
      //Remove a post
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }

      //Check user
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      await post.remove();

      return res.json({ msg: 'Post removed' });
    } catch (error) {
      console.error(error.message);
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Post not found' });
      }
      return res.status(500).send('Server Error');
    }
  }

  /**
   * @route  PUT api/posts/like/:id
   * @desc   Like a post
   * @access Private
   */
  async like(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      // Check if the post has already been liked
      if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ msg: 'Post already liked' });
      }

      post.likes.unshift({ user: req.user.id });

      await post.save();

      return res.json(post.likes);
      
    } catch (error) {
      console.error(error.message);
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Post not found' });
      }
      return res.status(500).send('Server Error');
    }
  }

  /**
   * @route  PUT api/posts/unlike/:id
   * @desc   Unlike a post
   * @access Private
   */
  async unlike(req, res) {
    try {
      const post = await Post.findById(req.params.id);

      // Check if the post has already been liked
      if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({ msg: 'Post has not yet been liked' });
      }

      // Get remove index
      const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);

      //post.unlikes.unshift({ user: req.user.id });

      await post.save();

      return res.json(post.likes);
      
    } catch (error) {
      console.error(error.message);
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Post not found' });
      }
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = new PostController();