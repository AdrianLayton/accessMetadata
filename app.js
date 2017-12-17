const express = require ('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const app = express();

AWS.config.update({
  region: "us-east-1",
  endpoint: "arn:aws:dynamodb:us-east-1:704381840790:table/testDb"
});

AWS.config.credentials = new EC2MetadataCredentials({
	httpOptions: { timeout: 5000 },
	maxRetries: 10,
	retryDelayOptions: { base: 200 } 
});

app.get('/', (req,res) => {
	res.send("Test Page");
}

app.listen(3000,() => {
	console.log('App has started on port 3000');
	console.log(AWS.config.credentials);
});