
import { APIGatewayProxyHandler } from 'aws-lambda';
import { getConnection } from './dynamo-mapper';
import {Task} from "./task-class"

export const add: APIGatewayProxyHandler = async (event, _context) => {

    const {creator = null, taskDefinition = null} = JSON.parse(event.body);   
    const {statusCode, body} = await addTask({creator, taskDefinition});

    return {
    statusCode,
    body
  };
}

async function addTask({creator, taskDefinition}){

    if(creator === null || taskDefinition === null){
        return {
            statusCode: 400,
            body: JSON.stringify("Null values found")
        }
    }
    
    try{
        const db = await getConnection();
        const task = new Task(creator, taskDefinition);

        await db.putItem({
            TableName: 'tasks',
            Item: {
                'id': {S: task.id}, 
                'creator' : {S: task.creator}, 
                'taskDefinition' : {S: task.taskDefinition}
            }
        }).promise()

        return {
            statusCode: 200,
            body: JSON.stringify({message: "Item added", id: task.id})
        }
    } catch(error){
        console.error(error)
        return {
            statusCode: 400,
            body: JSON.stringify("Error adding item")
        }
    }
    


}