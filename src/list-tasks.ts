import { APIGatewayProxyHandler } from "aws-lambda";
import { getConnection } from "./dynamo-connection";
import { tableName } from "./config";

export const list: APIGatewayProxyHandler = async (event, _context) => {

    const creator = event.queryStringParameters?.creator;
    const { statusCode, body } = creator !== undefined ? await listTasks(creator) : await listAllTasks()

    return {
        statusCode,
        body
    };
}

async function listTasks(creator: string) {

    try {

        const db = await getConnection();
        const params = {
            TableName: tableName,
            KeyConditionExpression: 'creator = :cr',
            ExpressionAttributeValues: {
                ':cr': creator
            }
        }
        const { Items = [] } = await db.query(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(Items),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
        }

    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: "Server error",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
        };

    }
}

async function listAllTasks() {
    try {
        const db = await getConnection();
        let params = { TableName: tableName, ExclusiveStartKey: null };
        let items: any
        let scanResults = [];

        do {
            items = await db.scan(params).promise();
            items.Items.forEach((item: any) => scanResults.push(item));
            params.ExclusiveStartKey = items.LastEvaluatedKey;

        } while (items.LastEvaluatedKey !== undefined)


        return {
            statusCode: 200,
            body: JSON.stringify(scanResults),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
        }


    } catch (error) {
        return {
            statusCode: 500,
            body: "Server error",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
        };

    }
}