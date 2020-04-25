import {DynamoDB} from "aws-sdk"

let db = null
export async function getConnection(): Promise<DynamoDB>{

    if(db === null){
        db = new DynamoDB({
            apiVersion: '2012-08-10',
            endpoint: "http://localhost:8000"
        });

        return db;
    } else{
        return db;
    }

   
}