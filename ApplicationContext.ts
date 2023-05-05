import { getListFromStorage, saveListToStorage } from "./localStorageHelpers.js";
import { ToDo } from "./ToDo.js";

export class ApplicationContext {
    public static toDoItemsList: ToDo[];

    static initData() {
        ApplicationContext.toDoItemsList = getListFromStorage();
    }

    static setToDoItemsList = (list: ToDo[]) => {
        ApplicationContext.toDoItemsList = list;
        saveListToStorage(list);
    }
}

