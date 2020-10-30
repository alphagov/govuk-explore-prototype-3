const express = require('express')
const router = express.Router()

const fs = require('fs')
const request = require('request');
const url = require('url');
// Add your routes here - above the module.exports line

const BASE_URL = process.env.BASE_URL


router.get('/browse/:topicSlug', function (req, res) {
  topicSlug = req.params.topicSlug

  request(BASE_URL + 'browse/' + topicSlug, { json: true }, (error, result, body) => {
    body.topicSlug = topicSlug;
    body.organisations = body.organisations.slice(0,5);
    body.latest_news = body.latest_news.slice(0,3);
    body.latest_news.forEach(news => {
      const d = new Date(news.public_timestamp);
      news.date = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
      news.subtopic = news.subtopic === 'other' ? '' : news.subtopic.replace(/_/g, ' ');
      news.topic = news.topic === 'other' ? '' : news.topic.replace(/_/g, ' ');
    });
    res.render('topic', body)
  })
})


router.get('/browse/:topicSlug/:subTopicSlug', function (req, res) {
  topicSlug = req.params.topicSlug
  subTopicSlug = req.params.subTopicSlug

  request(BASE_URL + 'browse/' + topicSlug + '/' + subTopicSlug, { json: true }, (error, result, body) => {
    request(BASE_URL + 'browse/' + topicSlug, { json: true }, (error, result, bodyTopic) => {
      body.topicSlug = topicSlug;
      body.organisations = body.organisations.slice(0,5);
      body.latest_news = body.latest_news.slice(0,3);
      body.latest_news.forEach(news => {
        const d = new Date(news.public_timestamp);
        news.date = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
        news.subtopic = news.subtopic === 'other' ? '' : news.subtopic.replace(/_/g, ' ');
        news.topic = news.topic === 'other' ? '' : news.topic.replace(/_/g, ' ');
      });

      res.render('sub_topic', { ...body, parent: bodyTopic.title });
    });
  });
});


router.get('/topics', function( req, res ) {
  res.render('topics');
});

router.get('/', function (req, res) {
  res.render('index');
});


// All other URLs (including css, js, etc.)
  router.get('/*', function(req,res) {
    console.log(req.url);
    //modify the url in any way you want
    var url_parts = url.parse(req.url, false);
    var query = url_parts.query;
    var newurl = 'https://www.gov.uk' + req.path + '?' + query;

    request(newurl, function (error, response, body) {
      if (error) throw error;

      const headerString = fs.readFileSync('app/views/header.html', 'utf8');
      const headerStringWithCss = `
  <link href="/public/stylesheets/application.css" media="all" rel="stylesheet" type="text/css" />
  ` + headerString;


      // Make all src and ref attributes absolute, or the server will try to
      // fetch its own version
      const newBody = body
        .replace(/(href|src)="\//g, '$1="https://www.gov.uk/')
        .replace(/<header[^]+<\/header>/, headerStringWithCss)
        .replace(/<\/body>/,'<script src="/public/javascripts/newmenu.js"></script>\n</body>');

      res.send(newBody);

    });
  });


module.exports = router
