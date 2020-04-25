
import { APIGatewayProxyHandler } from 'aws-lambda';
import { getConnection } from './dynamo-context';

export const add: APIGatewayProxyHandler = async (event, _context) => {

    const {owner = null, taskDefinition = null} = JSON.parse(event.body);   
    const {statusCode, body} = await addTask({owner, taskDefinition});

    return {
    statusCode,
    body
  };
}

async function addTask({owner, taskDefinition}){

    console.log(owner)
    if(owner === null || taskDefinition === null){
        return {
            statusCode: 400,
            body: JSON.stringify("Null values found")
        }
    }
    
    try{
        const db = await getConnection();

        await db.putItem({
            TableName: 'tasks',
            Item: {
              'owner' : {S: owner},
              'taskDefinition' : {S: taskDefinition}
            }
        }).promise()

        return {
            statusCode: 200,
            body: JSON.stringify("Item Added")
        }
    } catch(error){
        console.error(error)
        return {
            statusCode: 400,
            body: JSON.stringify("Error adding item")
        }
    }
    


}