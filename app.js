const express = require('express');
const morgan = require('morgan');
const blogRouter = require('./blogRouter');
const app = express();

app.use(morgan('common'));

app.use('/blog-post', blogRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Your app is listening on port 8000`);
});
