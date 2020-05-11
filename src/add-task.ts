
import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { getConnection } from './dynamo-connection';
import {Task} from "./task-class"

export const add: APIGatewayProxyHandler = async (event, _context): Promise<APIGatewayProxyResult> => {

    const task = new Task(JSON.parse(event.body));   
    const {statusCode, body} = await addTask(task);

    return {
    statusCode,
    body
  };
}

async function addTask(task: Task){

    if(task.creator === null || task.taskDefinition === null){
        return {
            statusCode: 400,
            body: JSON.stringify("Null values found")
        }
    }
    
    try{
        const db = await getConnection();

        await db.put({Item: task, TableName: "tasks"}).promise()

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