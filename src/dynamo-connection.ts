import { DynamoDB } from "aws-sdk"
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';

let db = null
export async function getConnection(): Promise<DocumentClient>{

    if(db === null){
        db = new DynamoDB.DocumentClient({
            endpoint: "http://localhost:8000"
        });
    } 
        
    return db;
}