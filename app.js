const express = require ('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const credResponse = new AWS.EC2MetadataCredentials({
	  httpOptions: { timeout: 5000 }, 
	  maxRetries: 10, 
	  retryDelayOptions: { base: 200 }
});
credResponse = credResponse.refresh();
const credResponse1 = new AWS.MetadataService();
credResponse1.request("latest/meta-data/iam/security-credentials/ServerDbCrud", function(err, data) {
	if (data) {
		console.log(data)
	}
	else {
		console.log(err)
	}
	
});

const app = express();

AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack); // credentials not loaded
  else { 
    console.log("Access Key:", AWS.config.credentials.accessKeyId);
    // pass AWS.config.credentials properties to your SimpleDB code
  }
});

// AWS.config.update({
//   region: "us-east-1",
//   endpoint: "arn:aws:dynamodb:us-east-1:704381840790:table/testDb"
// });

// AWS.config.credentials = new AWS.EC2MetadataCredentials();

app.get('/', (req,res) => {
	res.send("Test Page");
})

app.listen(3000,() => {
	console.log('App has started on port 3000');
	console.log(credResponse);
	console.log(credResponse1);
	console.log("Access Key:", AWS.config.credentials.accessKeyId)
});
