import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import AttributeMap = DocumentClient.AttributeMap;

export class Task{
    id: string;
    creator: string;
    taskDefinition: string

    constructor(attr: AttributeMap){
        this.id = generateId();
        this.creator = attr.creator;
        this.taskDefinition = attr.taskDefinition
    }

}

function generateId(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

