import { APIGatewayProxyHandler } from "aws-lambda";
import { getConnection } from "./dynamo-mapper";

export const list: APIGatewayProxyHandler = async (event, _context) => {

    const {creator = null} = event.queryStringParameters;
    const {statusCode, body} = await listTasks(creator);
    
    return {
        statusCode,
        body
    };
}

async function listTasks(creator: string){
    
    try{

        const db = await getConnection();

        const params = {
            ExpressionAttributeValues: {
                ':c': {S: creator}
              },
            KeyConditionExpression: 'creator = :c',
            TableName: "tasks"
        }
        const tasks = await db.scan(params).promise()

        return {
            statusCode: 200,
            body: JSON.stringify(tasks)
        };
        
        
    } catch(error){
        console.error(error)
        return {
            statusCode: 500,
            body: "Server error"
        };

    }
}