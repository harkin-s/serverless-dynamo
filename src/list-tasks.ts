import { APIGatewayProxyHandler } from "aws-lambda";
import { getConnection } from "./dynamo-connection";
import { tableName } from "./config";

export const list: APIGatewayProxyHandler = async (event, _context) => {

    const creator = event.queryStringParameters?.creator;
    const { statusCode, body } = await listAllTasks(creator)

    return {
        statusCode,
        body,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT"
        },
    };
}

export async function listAllTasks(creator: any) {
    try {
        const db = await getConnection();

        let conditions = { FilterExpression: "creator = :cr", ExpressionAttributeValues: { ":cr": creator } }
        let params = { TableName: tableName, ExclusiveStartKey: null, ...(creator ? conditions : {}) };
        let items: any
        let scanResults = [];

        do {
            items = await db.scan(params).promise();
            items.Items.forEach((item: any) => scanResults.push(item));
            params.ExclusiveStartKey = items.LastEvaluatedKey;

        } while (items.LastEvaluatedKey !== undefined)


        return {
            statusCode: 200,
            body: JSON.stringify(scanResults)
        }


    } catch (error) {
        return {
            statusCode: 500,
            body: "Server error"
        };

    }
}