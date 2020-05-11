import { APIGatewayProxyHandler } from "aws-lambda";
import { getConnection } from "./dynamo-connection";

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
            TableName : 'tasks',
            KeyConditionExpression : 'creator = :cr',
            ExpressionAttributeValues : {
                ':cr' : creator     
            }
        }
        const {Items = []} = await db.query(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(Items)
        }
        
    } catch(error){
        console.error(error)
        return {
            statusCode: 500,
            body: "Server error"
        };

    }
}