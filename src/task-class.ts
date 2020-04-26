export class task{
    id: string;
    creator: string;
    taskDefinition: string

    constructor(creator: string, taskDefinition: string){
        this.id = generateId();
        this.creator = creator;
        this.taskDefinition = taskDefinition
    }

}

function generateId(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

