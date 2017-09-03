# slack-functions

This repo contains four different Azure functions used to extract and save data from a Slack team.

There are two main streams of work:

## New messages
Functions involved:
- HttpTriggerJS1
- BlobTriggerJS1

Whenever a new message is posted in a Slack channel, *HttpTriggerJS1* receives an HTTP request with the content of the message and some additional information. This function verifies that the message is correct and saves it to an Azure Blob storage. This last operation triggers the other function *BlobTriggerJS1*, which is constantly checking if a new blob has been saved in a container. When this happens, the function simply takes the content and replicates it into a NoSQL Azure database.

## Events Logs
Functions involved:
- TimerTriggerJS1
- BlobTriggerJS2

The first function *TimerTriggerJS1* makes an API call every three minutes, asking for the Slack events logs. Once it receives an answer, the function enriches it with the current timestamp and saves everything to an Azure Blob storage. The stream then proceeds as the previous one, where the second function *BlobTriggerJS2* saves the data in another collection.

### Notes
Some of the relevant files have been gitignored before creating this public repo. To reproduce everything, follow these steps:

1. In the Kudu Azure console, navigate to TimerTriggerJS1/ and run 
```javascript
npm install request request-promise
```
2. Create `TimerTriggerJS1/slack-info.js` with the following structure:
```javascript
module.exports = {
    token: 'YOUR SLACK TOKEN'
};
```