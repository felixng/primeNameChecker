/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var newerlic = require('newrelic');
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();

//MailChimp
var MailChimpAPI = require('mailchimp').MailChimpAPI;
var apiKey = process.env.MAILCHIMP_API;
try {
    var api = new MailChimpAPI(apiKey, { version : '1.3' });
} catch (error) {
    console.log(error.message);
}

var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/name/*', function(req, res) {
  // res.sendfile(path, {root: './public'});
  //res.sendFile(path.join(__dirname, 'public'))
});


app.post('/api/subscribe', function(req, res) {
  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) {
      throw err;
    }
    
    var collection = db.collection('curiosity')
    collection.insert(req.body, function(err, result) {
      
      addToEmailList(req.body.name, req.body.email);
      
      if (err) {
        throw err;
      }

    });
  });
});

addToEmailList = function(name, email){
  //TODO: Dedublicate
  var merge_vars = {
      EMAIL: email,
      FNAME: name
  };

  api.listSubscribe({ id : process.env.MAILCHIMP_LIST_ID, 
                      email_address : email, 
                      merge_vars : merge_vars, 
                      double_optin: false, 
                      send_welcome: true, 
                      update_existing: true }, function (error, data) {
    if (error){
      console.log(error.message);
    }
    else{
      //console.log(JSON.stringify(data)); 
    }
  });

}

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
