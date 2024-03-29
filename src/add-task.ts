
import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { getConnection } from './dynamo-connection';
import { Task } from "./task-class"
import { tableName } from './config';

export const add: APIGatewayProxyHandler = async (event, _context): Promise<APIGatewayProxyResult> => {

    const task = new Task(JSON.parse(event.body));
    const { statusCode, body } = await addTask(task);

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

async function addTask(task: Task) {

    if (task.creator === null || task.taskDefinition === null) {
        return {
            statusCode: 400,
            body: JSON.stringify("Null values found")
        }
    }

    try {
        const db = await getConnection();
        await db.put({ Item: task, TableName: tableName }).promise()

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Item added", id: task.id })
        }
    } catch (error) {
        console.error(error)
        return {
            statusCode: 400,
            body: JSON.stringify("Error adding item")
        }
    }
}