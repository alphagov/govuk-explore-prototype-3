const express = require('express')
const router = express.Router()

const request = require('request');
const url = require('url');
// Add your routes here - above the module.exports line

//const BASE_URL = 'https://govuk-explore-api-prototype.herokuapp.com/'
const BASE_URL = 'http://localhost:3050/'

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

// All other URLs (including css and js)
  router.get('/*', function(req,res) {
    //modify the url in any way you want
    var url_parts = url.parse(req.url, false);
    var query = url_parts.query;
    var newurl = 'https://www.gov.uk' + req.path + '?' + query;
    request(newurl).pipe(res);
  });


module.exports = router
