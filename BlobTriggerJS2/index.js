/**
 * This function is triggered when a blob is added to a specific container.
 * In this case, the functions monitors a container where Slack access
 * logs are saved.
 * 
 * Once the function has been triggered, the content of the blob is picked
 * up and saved in a NoSQL Azure database. Data in the DB can be seen with
 * the Data Explorer preview function in Azure.
 */

module.exports = function (context, myBlob) {

    context.log("JavaScript blob trigger function processed blob \n Name:", context.bindingData.name);
    // Save the blob as a new document in the output database
    context.bindings.outputDocument = context.bindingData;

    context.done();
};