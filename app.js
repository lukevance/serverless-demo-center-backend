const ApiBuilder = require('claudia-api-builder');
const AWS = require('aws-sdk');
const api = new ApiBuilder();
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const fetch = require('node-fetch');
// // set global vars for usage in function
const orgToken = process.env.OrgToken;
const userToken = process.env.UserToken;
const ceEnv = process.env.CE_ENV;
const baseUrl = `https://${ceEnv}.cloud-elements.com/elements/api-v2/`;

// Call Cloud Elements with correct token
const searchAccounts = async (objectName, elementToken, where) => {
  const path = `/${objectName}`;
  const queryParams = `pageSize=50`;
  // The configuration for fetching data
  const config = {
      method: 'GET',
      headers: {
          'Authorization': `User ${userToken}, Organization ${orgToken}, Element ${elementToken}`,
          'Content-Type': 'application/json'
      }
  };
  const request = async () => {
      const response = await fetch(`${baseUrl}/${path}?${queryParams}`, config);
      const json = await response.json();
      done(null, json);
  };
  return request();
};

module.exports = api;

api.get('/accounts', async (req) => {
  const accounts = await searchAccounts("contacts", request.queryString.token);
  return accounts;
});

api.get('/users', function (request) { // GET all users
    return dynamoDb.scan({ TableName: 'democenterusers' })
            .promise()
            .then(response => response.Items.map(user => {
                const userWithoutPassword = (({userid, username}) => ({userid, username}))(user);
                // let itemNoPassword = item;
                // delete itemNoPassword.password;
                // return itemNoPassword;
                return userWithoutPassword;
            }));
  });
  const userWithoutPassword = (({name, age}) => ({name, age}))(user);

api.get('/hello', function () {
	return 'hello world!';
});

api.post('/users', function (request) { // SAVE your icecream
    var params = {  
      TableName: 'democenterusers',  
      Item: {
          userid: request.body.userid,
          username: request.body.username,
          password: request.body.password
      } 
    }
    return dynamoDb.put(params).promise(); // returns dynamo result 
  }, { success: 201 }); // returns HTTP status 201 - Created if successful