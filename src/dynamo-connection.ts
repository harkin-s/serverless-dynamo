import { DynamoDB } from "aws-sdk"
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';


//TODO Add remote connection config
let db = null
export async function getConnection(): Promise<DocumentClient>{

    if(db === null){
        db = new DynamoDB.DocumentClient({
            // endpoint: "http://localhost:8000"
            region: "eu-west-1"
        });
    } 
        
    return db;
}