import { ToDo } from "./ToDo.js";

const getListFromStorage = () => {
    const data = localStorage.getItem('toDoList') || '[]';
    return JSON.parse(data).map((item: ToDo) => ({ 
        ...item,
        dateAdded: new Date(item.dateAdded).getTime(), // TODO: need more investigation here
        dueDate: new Date(item.dueDate).getTime(),
     }));
}

const saveListToStorage = (list: ToDo[]) => {
    localStorage.setItem('toDoList', JSON.stringify(list));
}

export { getListFromStorage, saveListToStorage };