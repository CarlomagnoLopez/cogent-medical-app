//import { config as AWSConfig } from 'aws-sdk';

import * as AWS from 'aws-sdk';
//const awssdk = require('aws-sdk');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
let cognitoUser;
//AWSConfig.region = "us-east-1";

// const initCognitoSDK = () => {
//     var authData = {
//       UserPoolId:         ANT_DESIGN_PRO_USER_POOL_ID,
//       ClientId:           ANT_DESIGN_PRO_CLIENT_ID,
//       AppWebDomain :      'smarthire.auth.us-east-1.amazoncognito.com', // Exclude the "https://" part.
//       TokenScopesArray :  ['openid','email'],
//       RedirectUriSignIn:  "http://localhost:8000",
//       RedirectUriSignOut: "http://localhost:8000",
//       //IdentityProvider : '<TODO: your identity provider you want to specify here>',
//       AdvancedSecurityDataCollectionFlag : false
//     };
//     var auth = new AmazonCognitoIdentity.CognitoAuth(authData);
//     // You can also set state parameter
//     // auth.setState(<state parameter>);
//     auth.userhandler = {
//       // onSuccess: <TODO: your onSuccess callback here>,
//       // onFailure: <TODO: your onFailure callback here>
//       onSuccess: function(result) {
//         //alert("Sign in success");
//         //howSignedIn(result);
//         console.log("******** onSuccess ***********");
//         console.log(result);
//       },
//       onFailure: function(err) {
//         //alert("Error!" + err);
//         console.log("******** onFailure ***********");
//         console.log("Error!" + err);

//       }
//     };
//     // The default response_type is "token", uncomment the next line will make it be "code".
//      auth.useCodeGrantFlow();
//     return auth;
//   }

// Sign out of the current session (will redirect to signout URI)
const signOutCognitoSession = () => {
  const auth = initCognitoSDK();
  auth.signOut();
};

const initCognitoSDK = () => {
  const appWebDomain = 'https://medicalproject.auth.us-east-1.amazoncognito.com'
    .replace('https://', '')
    .replace('http://', '');
  const auth = {
    UserPoolId: ANT_DESIGN_PRO_USER_POOL_ID,
    ClientId: ANT_DESIGN_PRO_CLIENT_ID,
    AppWebDomain: appWebDomain,
    TokenScopesArray: ['openid', 'email', 'family name', 'name'],
    RedirectUriSignIn: 'http://localhost:8000',
    RedirectUriSignOut: 'http://localhost:8000',
  };
  const CognitoAuth = AmazonCognitoIdentity.CognitoAuth;
  const auth1 = new CognitoAuth(auth);
  return auth1;
};

const signUpCognito = (data) => {
  return new Promise((resolve, reject) => {
    var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
    var poolData = {
      UserPoolId: ANT_DESIGN_PRO_USER_POOL_ID, // Your user pool id here
      ClientId: ANT_DESIGN_PRO_CLIENT_ID, // Your client id here
    };
    var userPool = new CognitoUserPool(poolData);
    var attributeList = [];
    var username = data.mail.split('@')[0];
    var dataEmail = {
      Name: 'email',
      Value: data.mail,
    };
    var dataFamilyName = { Name: 'family_name', Value: data.last_name.toUpperCase().trim() };
    var dataName = { Name: 'name', Value: data.name.toUpperCase().trim() };
    var dataCurrentAuthority = { Name: 'custom:currentAuthority', Value: data.currentAuthority };
    var dataCurrentGroup = data.group
      ? { Name: 'custom:group', Value: data.group }
      : { Name: 'custom:group', Value: 'Group_' + data.company_name.split(' ').join('_') };
    var dataCurrentCompanyId = data.companyId
      ? { Name: 'custom:companyId', Value: data.companyId }
      : { Name: 'custom:companyId', Value: 'Without Company' };
    var dataCompanyName = { Name: 'custom:company_name', Value: data.company_name };
    var dataCompanyWebsite = { Name: 'custom:company_website', Value: data.company_website };

    var avilability = data.avlilability
      ? { Name: 'custom:available_for', Value: data.avlilability }
      : { Name: 'custom:available_for', Value: '' };
    var core_skills = data.core_skills
      ? { Name: 'custom:core_skills', Value: data.core_skills }
      : { Name: 'custom:core_skills', Value: '' };
    var total_experience = data.total_experience
      ? { Name: 'custom:experience', Value: data.total_experience }
      : { Name: 'custom:experience', Value: '' };
    var relocation_preferences = data.relocation_preferences
      ? { Name: 'custom:relocation', Value: data.relocation_preferences }
      : { Name: 'custom:relocation', Value: '' };

    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
    var attributeFamilyName = new AmazonCognitoIdentity.CognitoUserAttribute(dataFamilyName);
    var attributeCurrentAuthority = new AmazonCognitoIdentity.CognitoUserAttribute(
      dataCurrentAuthority,
    );
    var attributeGroup = new AmazonCognitoIdentity.CognitoUserAttribute(dataCurrentGroup);
    var attributeCompanyId = new AmazonCognitoIdentity.CognitoUserAttribute(dataCurrentCompanyId);
    var attributeCompanyName = new AmazonCognitoIdentity.CognitoUserAttribute(dataCompanyName);
    var attributeWebsiye = new AmazonCognitoIdentity.CognitoUserAttribute(dataCompanyWebsite);

    //if(avilability)
    var attributeAvilability = new AmazonCognitoIdentity.CognitoUserAttribute(avilability);
    //if(core_skills)
    var attributeCoreSkills = new AmazonCognitoIdentity.CognitoUserAttribute(core_skills);

    var attributeTotalExperience = new AmazonCognitoIdentity.CognitoUserAttribute(total_experience);
    var attributeRelocationPref = new AmazonCognitoIdentity.CognitoUserAttribute(
      relocation_preferences,
    );

    attributeList.push(attributeEmail);
    attributeList.push(attributeName);
    attributeList.push(attributeFamilyName);
    attributeList.push(attributeCurrentAuthority);
    attributeList.push(attributeGroup);
    attributeList.push(attributeCompanyId);
    attributeList.push(attributeCompanyName);
    attributeList.push(attributeWebsiye);
    if (avilability) attributeList.push(attributeAvilability);
    if (core_skills) attributeList.push(attributeCoreSkills);
    if (total_experience) attributeList.push(attributeTotalExperience);
    if (relocation_preferences) attributeList.push(attributeRelocationPref);

    userPool.signUp(data.mail, data.password, attributeList, null, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const loginCognito = (values) => {
  console.log('Login Called' + ANT_DESIGN_PRO_CLIENT_ID);
  var authenticationData = {
    Username: values.userName,
    Password: values.password,
  };
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

  var poolData = {
    UserPoolId: ANT_DESIGN_PRO_USER_POOL_ID, // your user pool id here
    ClientId: ANT_DESIGN_PRO_CLIENT_ID, // your app client id here
  };
  // Create the User Pool Object
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  var userData = {
    Username: values.userName, // your username here
    Pool: userPool,
  };
  cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  console.log('cognitoUser', cognitoUser);
  // cognitoUser.enableMFA();
  cognitoUser.setAuthenticationFlowType('CUSTOM_AUTH');

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      console.log('access token + ' + result.getAccessToken().getJwtToken());
    },
    // mfaRequired: function () {},

    /*    customChallenge: function (challengeParameters) {
      //gather user responses in challengeResponses based on challengeParameters
      cognitoUser.sendCustomChallengeAnswer(challengeResponses, this);
      

    }*/

    onFailure: function (err) {
      console.log('Error' + JSON.stringify(err));
    },
  });

  // return cognitoUser.authenticateUser(authenticationDetails, {
  //   onSuccess: function (result) {
  //     /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
  //     var accessToken = result.getAccessToken().getJwtToken();
  //     var idToken     = result.idToken.jwtToken;
  //     sessionStorage.setItem('accessToken',accessToken);
  //     router.push(`/welcome`);
  //   },
  //   onFailure: function(err) {
  //     if(err){
  //       alert(err.message);
  //     }
  //   },
  //   mfaRequired: function(codeDeliveryDetails) {
  //     var verificationCode = prompt('Please input verification code' ,'');
  //     cognitoUser.sendMFACode(verificationCode, this);
  //   },
  //   newPasswordRequired: function(userAttributes, requiredAttributes) {
  //       // User was signed up by an admin and must provide new
  //       // password and required attributes, if any, to complete
  //       // authentication.

  //       // userAttributes: object, which is the user's current profile. It will list all attributes that are associated with the user.
  //       // Required attributes according to schema, which don’t have any values yet, will have blank values.
  //       // requiredAttributes: list of attributes that must be set by the user along with new password to complete the sign-in.

  //       // Get these details and call
  //       // newPassword: password that user has given
  //       // attributesData: object with key as attribute name and value that the user has given.
  //       var tmpObject = new Object()
  //       tmpObject.name = 'Diego Lira';
  //       tmpObject.family_name = 'Diego Lira';
  //       var attributesData = tmpObject;
  //       var newPassword = 'Soporte00$';
  //       cognitoUser.completeNewPasswordChallenge(newPassword, attributesData, this)
  //   }
  // });
};

const verifyCode = (values) => {
  let code = values.captcha;
  cognitoUser.sendMFACode(code, {
    onSuccess: function () {
      console.log('Successfuuly Verified');
    },
    onFailure: function (err) {
      console.log('MFA Error ' + err);
    },
  });
};

export { initCognitoSDK, signOutCognitoSession, signUpCognito, loginCognito, verifyCode };
