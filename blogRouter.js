const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

function lorem() {
  return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod ' +
    'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, '
    'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ' +
    'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse ' +
    'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non ' +
    'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}
// we're going to add some blog post to blogPosts
// so there's some data to look at
BlogPosts.create(
  '5 Reasons to drink craft beer',
  lorem(),
  'Jordan Michele');
BlogPosts.create(
  'Todays top reads for aspiring Web Developers',
   lorem(),
  'Joe Smith');

// send back JSON representation of all blogPosts
// on GET requests to root
router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];

  for(let i = 0; i < requiredFields.length; i++){
    const fields = requiredFields[i];
    if(!(fields in req.body)){
      const message = `Missing \`${fields}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create( req.body.title, req.body.content, req.body.author );
  res.status(201).json(item);
});

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];

  for(let i = 0; i < requiredFields.length; i++){
    const fields = requiredFields[i];
    if(!(fields in req.body)){
      const message = `Missing \`${fields}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id){
    const message = (
      `Request id (${req.params.id}) and request body id`
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
    console.log(`Updating blog post with id \`${req.params.id}\``);
    const updatedItem = BlogPosts.update({
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    });
    res.status(204).end();
  });

  router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog with id \`${req.params.id}\``);
    res.status(204).end();
  });

  module.exports = router;
