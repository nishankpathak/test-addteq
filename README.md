Application is written in react using typescript and express using typescript
Implemented redux for state management with axios to fetch data using api's. 

React version: 18.2.0
Express version: 4.17.2
Node version: 18 or above

To deploy the application follow below steps:

1. Take Clone of the repository
2. Run the deployment script in root of the directory to run the application at port 3001

`sh deploy.sh`

The deployment script copies the build files to the public folder of react application and the whole application runs on a single port  i.e. 3000 in our case. 

Queries:
is it necessary to implement routing? I didn't found it to be useful in this case.
