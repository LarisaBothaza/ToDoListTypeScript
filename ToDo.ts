export class ToDo {
    id: number;
    title: string;
    description: string;
    dateAdded: number;
    dueDate: number;

    constructor(title: string, description: string, dueDate: Date) {
        const currentTimestamp = (new Date()).getTime();
        this.id = currentTimestamp;
        this.title = title;
        this.description = description;
        this.dateAdded = currentTimestamp;
        this.dueDate = dueDate.getTime();
    }
}