/**
 * This function is run every 2 minutes and picks up
 * information about the team access logs through a standard
 * Slack API call..
 * 
 * Once the function has been triggered, the content of the response is 
 * picked up and saved inside an Azure Blob storage.
 */

// Require relevant npm packages
const rp = require('request-promise');
const slackInfo = require('./slack-info.js');

module.exports = function (context, myTimer) {
    var timeStamp = new Date().toISOString();

    context.log('JavaScript timer trigger function ran!', timeStamp);

    var options = {
        method: 'POST',
        uri: 'https://slack.com/api/team.accessLogs',
        form: {
            token: slackInfo.token
        }
    };

    rp(options)
        .then(function (body) {
            // Enrich response with timestamp
            var newBlob = {
                'timestamp': timeStamp,
                'body': body
            };
            // Save content in blob
            context.bindings.outputBlob = newBlob;
            context.log('Call OK - response saved in Blob')
            context.done();
        })
        // If the call fails...
        .catch(function (err) {
            context.log('Call failed, error: ' + err);
            context.done();
        });

};