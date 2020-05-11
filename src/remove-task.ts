
import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { getConnection } from './dynamo-connection';
import { tableName } from './config';

export const remove: APIGatewayProxyHandler = async (event, _context): Promise<APIGatewayProxyResult> => {

    const {creator, id} = event.queryStringParameters;   
    const {statusCode, body} = await addTask(creator, id);

    return {
    statusCode,
    body
  };
}

async function addTask(creator: string, id: string){

    if(creator === null || id === null){
        return {
            statusCode: 400,
            body: JSON.stringify("Null values found")
        }
    }
    
    try{
        const db = await getConnection();
        const params = {
            TableName : tableName,
            Key: {
              id,
              creator
            }
        }
        await db.delete(params).promise()

        return {
            statusCode: 200,
            body: JSON.stringify({message: "Item deleted", id})
        }
    } catch(error){
        console.error(error)
        return {
            statusCode: 400,
            body: JSON.stringify("Error deleting item")
        }
    }
}