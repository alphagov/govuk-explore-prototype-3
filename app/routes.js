const express = require('express')
const router = express.Router()

const request = require('request');
const url = require('url');
// Add your routes here - above the module.exports line

//const BASE_URL = 'https://govuk-explore-api-prototype.herokuapp.com/'
const BASE_URL = 'http://localhost:3000/'

router.get('/browse/:topicSlug', function (req, res) {
  topicSlug = req.params.topicSlug

  request(BASE_URL + 'browse/' + topicSlug, { json: true }, (error, result, body) => {
    body.topicSlug = topicSlug;

    body.organisations = body.organisations.slice(0,5);
    console.log(JSON.stringify(body.organisations, null, 2));

    body.activities = [
      {
        title: "Statement of changes to the Immigration Rules: HC 707, 10 September 2020",
        url: "/",
        type: "Speech",
        category: "Policy papers and consultation",
        published: "12 August 2020"
      },
      {
        title: "Criminal investigations: use of interpreters",
        url: "/",
        type: "Guidance",
        category: "Guidance and regulation",
        published: "12 August 2020"
      },
      {
        title: "Home Secretary annouces details of the Hong Kong BN(O) Visa",
        url: "/",
        type: "Speech",
        category: "News and communications",
        published: "12 August 2020"
      }
    ];
    console.log('requesting', BASE_URL + 'browse/' + topicSlug);
    res.render('topic', body)
  })
})


router.get('/browse/:topicSlug/:subTopicSlug', function (req, res) {
  topicSlug = req.params.topicSlug
  subTopicSlug = req.params.subTopicSlug

  request(BASE_URL + 'browse/' + topicSlug + '/' + subTopicSlug, { json: true }, (error, result, bodySubtopic) => {
    request(BASE_URL + 'browse/' + topicSlug, { json: true }, (error, result, bodyTopic) => {
      res.render('sub_topic', { ...bodySubtopic, parent: bodyTopic.title });
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
