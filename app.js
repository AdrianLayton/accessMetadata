const express = require ('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const app = express();

AWS.config.update({
  region: "us-east-1",
  endpoint: "arn:aws:dynamodb:us-east-1:704381840790:table/testDb"
});

// AWS.config.credentials = new AWS.EC2MetadataCredentials();

app.get('/', (req,res) => {
	res.send("Test Page");
})

app.listen(3000,() => {
	console.log('App has started on port 3000');
	console.log(new AWS.MetadataService.request("latest/meta-data/iam/security-credentials/ServerDbCrud", function(err,data) {
		if (err) {
			console.log(err);
		}
		else {
			console.log(data);
		}
}
);
});