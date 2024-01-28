const express = require('express');
const { cacheHitCount, cacheLikeCount, cacheScrapCount } = require('./app.js');

const app = express();

app.get('/hits', (req, res) => {
  const postId = req.query['postId'];
  cacheHitCount(postId);

  
  return res.status(200).send();
});

app.get('/likes', (req, res) => {
  const postId = req.query['postId'];
  cacheLikeCount(postId);
  return res.status(200).send();
});

app.get('/scraps', (req, res) => {
  const postId = req.query['postId'];
  cacheScrapCount(postId);
  return res.status(200).send();
});

app.listen(5000);