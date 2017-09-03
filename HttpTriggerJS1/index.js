/**
 * This function is triggered by the Slack Events API.
 * Specifically, the app is subscribed to the message.channels
 * event, which is fired every time a message is posted in a channel.
 * 
 * Once the function has been triggered, the content of the message is 
 * picked up and saved inside an Azure Blob storage.
 */

module.exports = function (context, req) {
    context.log('HTTP function has been triggered - somebody posted a message');

    // Check that the request is well formatted (only save events of type 'message')
    if (req.body.event && req.body.event.type === 'message') {
        // Save content of request in blob
        context.bindings.outputBlob = req;
        // Send back a 200
        context.log('Message succesfully saved in blob')
        context.res = {
            status: 200,
            body: 'Message succesfully saved in blob'
        };
    } else {
        context.log('Something went wrong')
        context.res = {
            status: 500,
            body: "We were expecting a message :("
        };
    };

    context.done();
};