import { DynamoDB } from "aws-sdk"
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { remoteDBConfig,localDBConfig } from "./config";

let db = null
const dbConfig = process.env.NODE_ENV === 'live' ? remoteDBConfig : localDBConfig

export async function getConnection(): Promise<DocumentClient>{
    if(db === null){
        db = new DynamoDB.DocumentClient(dbConfig);
    } 
        
    return db;
}