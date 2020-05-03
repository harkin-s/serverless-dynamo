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
            TableName: "tasks",
            ProjectionExpression: "#cr, taskDefinition",
            FilterExpression: "#cr equals :creator ",
            ExpressionAttributeNames: {
                "#cr": "creator",
            },
            ExpressionAttributeValues: {
                ":creator": creator
            }
        }

        const tasks = await db.scan(params, function(err, data){
            console.log(err, data)
        })

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