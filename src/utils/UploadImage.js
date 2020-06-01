import * as AWS from 'aws-sdk';
//const awssdk = require('aws-sdk');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

var albumBucketName = 'medicalprojectlogos';
var bucketRegion = Regions.US_EAST_1; // Region;
var IdentityPoolId = 'us-east-1:53d43971-6a4b-4699-935c-592476c26ea1';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:53d43971-6a4b-4699-935c-592476c26ea1',
  }),
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: 'medicalprojectlogos' },
});

uploadLogo = (albumName) => {
  albumName = albumName.trim();
  if (!albumName) {
    return alert('Album names must contain at least one non-space character.');
  }
  if (albumName.indexOf('/') !== -1) {
    return alert('Album names cannot contain slashes.');
  }
  var albumKey = encodeURIComponent(albumName) + '/';

  s3.putObject({ Key: albumKey }, function (err, data) {
    console.log('Data ' + JSON.stringify(data) + ' Error ' + JSON.stringify(err));

    if (err) {
      return alert('There was an error creating your album: ' + err.message);
    }
    alert('Successfully created album.');
    console.log(albumName);
  });
};

export default { uploadLogo };
