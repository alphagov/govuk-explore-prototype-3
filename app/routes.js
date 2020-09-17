const express = require('express')
const router = express.Router()

const request = require('request');
const url = require('url');
// Add your routes here - above the module.exports line

const BASE_URL = "https://govuk-explore-api-prototype.herokuapp.com/"
//const BASE_URL = "http://localhost:3010/"

router.get('/browse/:topicSlug', function (req, res) {
  topicSlug = req.params.topicSlug

  request(BASE_URL + "browse/" + topicSlug, { json: true }, (error, result, body) => {
    res.render('topic', body)
  })
})

router.get('/browse/:topicSlug/:subTopicSlug', function (req, res) {
  topicSlug = req.params.topicSlug
  subTopicSlug = req.params.subTopicSlug

  request(BASE_URL + "browse/" + topicSlug + "/" + subTopicSlug, { json: true }, (error, result, body) => {
    res.render('sub_topic', body)
  })
})

router.get('/*', function(req,res) {
  //modify the url in any way you want
  var url_parts = url.parse(req.url, false);
  var query = url_parts.query;
  var newurl = 'https://www.gov.uk' + req.path + "?" + query;
  request(newurl).pipe(res);
});

module.exports = router
