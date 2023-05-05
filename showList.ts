import { ToDo } from "./ToDo.js";
import { openModal } from "./modal.js";
import { ApplicationContext } from "./ApplicationContext.js";

const sortListByDueDate = (list: ToDo[]) => {
    return list.sort((a, b) => {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
}

const showList = (list: ToDo[]) => {
    let toDoListUL = document.getElementById("toDoList") as HTMLElement;

    toDoListUL.innerHTML = "";

    sortListByDueDate(list).forEach(item => {
        const newLi = createListItem(item);
        toDoListUL.appendChild(newLi);
    });
}

const removeItemFromList = (id: number) => {
    const modifiedList = ApplicationContext.toDoItemsList.filter(item => item.id !== id);
    ApplicationContext.setToDoItemsList(modifiedList);
    showList(ApplicationContext.toDoItemsList);
}

const createListItem = (element: ToDo) => {
    const newLi = document.createElement("li"); 
    newLi.className = "box-item";

    const newDivTitle = document.createElement("div"); 
    newDivTitle.className = "box-title";

    const newDivDescription = document.createElement("div"); 
    newDivDescription.className = "box-description";

    const textContainer = document.createElement("div"); 
    textContainer.className = "text-container";

    const dateContainer = document.createElement("div");
    dateContainer.className = "date-container";

    const newDivDateAdded = document.createElement("div"); 
    newDivDateAdded.className = "box-date-added";

    const newDivDueDate = document.createElement("div"); 
    newDivDueDate.className = "box-due-date";

    const spanX = document.createElement("span"); 
    spanX.className = "close";
    spanX.innerHTML = '&times';
    spanX.addEventListener('click', () => {
        var result = confirm("Want to delete?");
        if (result) {
            removeItemFromList(element.id);
        }
    });

    const spanEdit = document.createElement("span"); 
    spanEdit.className = "edit";
    spanEdit.innerHTML = '&#x270f;';
    spanEdit.addEventListener('click', () => {
        openModal(element);
    });

    const iconContainer = document.createElement("div"); 
    iconContainer.className = "icon-container";

    newDivTitle.innerHTML = element.title;
    newDivDescription.innerHTML = (element.description).replace(new RegExp('\n', 'gi'), '<br/>');
    newDivDateAdded.innerHTML = `DATE ADDED: <br/> ${new Date(element.dateAdded).toLocaleString()}<br/><br/>`;
    newDivDueDate.innerHTML = `DUE DATE: <br/> ${new Date(element.dueDate).toLocaleDateString()}<br/>`;

    textContainer.appendChild(newDivTitle);
    textContainer.appendChild(newDivDescription);

    dateContainer.appendChild(newDivDateAdded);
    dateContainer.appendChild(newDivDueDate);

    iconContainer.appendChild(spanX);
    iconContainer.appendChild(spanEdit);
    
    newLi.appendChild(textContainer);
    newLi.appendChild(dateContainer);
    newLi.appendChild(iconContainer);

    return newLi;
}

export {showList}