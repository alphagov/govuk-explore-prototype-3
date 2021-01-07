const express = require('express')
const router = express.Router()

const fs = require('fs')
const request = require('request');
const govukTopics = require('./govuk-topics');
const url = require('url');
const nunjucks = require('nunjucks');

// Add your routes here - above the module.exports line

if (!process.env.API_URL) {
  console.warn('\n\n=== ERROR ============================');
  console.warn('You must set API_URL to specify the URL of the backend API');
  console.warn('for instance: API_URL=http://localhost:3050 npm start');
  console.warn('======================================\n\n');
  process.exit(-1);
}

const API_URL = process.env.API_URL

//---- pre-fetch all topics titles  and descriptions

let mainstreamTopics, specialistTopics;
govukTopics.fetchMainstreamTopics(body => mainstreamTopics=body);
govukTopics.fetchSpecialistTopics(body => specialistTopics=body);


//---- Topic pages (both mainstream and specialist)

const topicPage = function(topicType, req, res) {
  const topicSlug = req.params.topicSlug;
  const url = `${API_URL}/${topicType}/${topicSlug}`;
  request(url, { json: true }, (error, result, body) => {
    body.topicSlug = topicSlug;
    if (body.organisations) {
      body.organisations = body.organisations.slice(0,5);
    }
    if (body.latest_news) {
      body.latest_news = body.latest_news.slice(0,3);
      body.latest_news.forEach(news => {
        const d = new Date(news.public_timestamp);
        news.date = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
        news.subtopic = news.subtopic === 'other' ? '' : news.subtopic.replace(/_/g, ' ');
        news.topic = news.topic === 'other' ? '' : news.topic.replace(/_/g, ' ');
      });
    }
    if (body.subtopics) {
      // Add the description of each subtopic from the appropriate topics global var
      body.subtopics = body.subtopics.map(sub => {
        const topicList = topicType === 'browse' ? mainstreamTopics : specialistTopics;
        return {...sub, description: topicList.find(topic => topic._id === sub.link).description };
      });
    }
    res.render('topic', body)
  });
};


router.get('/browse/:topicSlug', function (req, res) {
  return topicPage('browse', req, res);
});


router.get('/topic/:topicSlug', function (req, res) {
  return topicPage('topic', req, res);
});



//---- Mainstream subtopics


router.get('/browse/:topicSlug/:subTopicSlug', function (req, res) {
  const topicSlug = req.params.topicSlug;
  const subTopicSlug = req.params.subTopicSlug;
  const url = `${API_URL}/browse/${topicSlug}/${subTopicSlug}`;
  request(url, { json: true }, (error, result, body) => {
    body.topicSlug = topicSlug;
    if (body.organisations) {
      body.organisations = body.organisations.slice(0,5);
    }
    if (body.latest_news) {
      body.latest_news = body.latest_news.slice(0,3);
      body.latest_news.forEach(news => {
        const d = new Date(news.public_timestamp);
        news.date = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
        news.subtopic = news.subtopic === 'other' ? '' : news.subtopic.replace(/_/g, ' ');
        news.topic = news.topic === 'other' ? '' : news.topic.replace(/_/g, ' ');
      });
    }
    res.render('sub_topic', body);
  });
});


//---- Specialist subtopics

router.get('/topic/:topicSlug/:subTopicSlug', function (req, res) {
  const topicSlug = req.params.topicSlug;
  const subTopicSlug = req.params.subTopicSlug;
  const url = `${API_URL}/topic/${topicSlug}/${subTopicSlug}`;

  request(url, { json: true }, (error, result, body) => {
    body.topicSlug = topicSlug;
    if (body.subtopics) {
      body.subtopics = body.subtopics.sort((a,b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
    }
    res.render('sub_topic', body);
  });
});




//----------------------

router.get('/topic', function( req, res ) {
  request(API_URL + '/topic', { json: true }, (error, results, body) => {
    if (error) throw error;
    if (body.subtopics) {
      // Add the description of each subtopic from the specialistTopics global var
      body.subtopics = body.subtopics.map(sub => {
        return {...sub, description: specialistTopics.find(topic => topic._id === sub.link).description };
      });
    }

    res.render('topics', body);
  });
});

router.get('/', function (req, res) {
  res.render('index');
});


// All other URLs
router.get('/*', function(req,res) {

  //modify the url in any way you want
  var url_parts = url.parse(req.url, false);
  var query = url_parts.query;
  var newurl = 'https://www.gov.uk' + req.path + '?' + query;

  request(newurl, function (error, response, body) {
    if (error) throw error;

    const headerTemplate = fs.readFileSync('app/views/explore-header.html', 'utf8');
    const headerString = nunjucks.renderString(headerTemplate, {req});
    const headerStringWithCss = `
  <link href="/public/stylesheets/explore-header.css" media="all" rel="stylesheet" type="text/css" />
  <link href="/public/css/accordion.css" media="all" rel="stylesheet" type="text/css" />
  ` + headerString + `
  <script src="/public/javascripts/accordion.js"></script>
`;

    // Make all src and ref attributes absolute, or the server will try to
    // fetch its own version
    const newBody = body
          .replace(/(href|src)="\//g, '$1="https://www.gov.uk/')
          .replace(/<header[^]+?<\/header>/, headerStringWithCss)
          .replace(/<\/body>/,'<script src="/public/javascripts/explore-header.js"></script>\n</body>')
          .replace(/<a(.*) href\s*=\s*(['"])\s*(https:)?\/\/www.gov.uk\//g,'<a $1 href=$2/');

    res.send(newBody);

  });
});


module.exports = router
