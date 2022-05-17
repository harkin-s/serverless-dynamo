## Serverless and Svelte Task app 
Task app with SveleteJS fronend, AWS Lambda API using DynamoDB as a database. The Lambdas are deployed using the serverless framework.
The Repo has a circle ci build lane which deployes changes on all commits to master

### The UI 
To run the UI use the script `dev` found in the package-json found in the ui folder.The UI is set up to target the remote API so you do not need to run the lambdas locally

### Test
There are some tests for the API found in the test folder 
