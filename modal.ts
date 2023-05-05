import { ToDo } from "./ToDo.js";
import { showList } from "./showList.js";
import { getDateStringFromDate } from "./dateHelpers.js";
import { ApplicationContext } from "./ApplicationContext.js";

// Get the modal
let modal = document.getElementById("myModal") as HTMLElement;

// Get the button that opens the modal
let btn = document.getElementById("addItemButton") as HTMLButtonElement;

// Get the button elements that closes the modal
let cancelBtn = document.getElementById("cancel-button") as HTMLButtonElement;
let addBtn = document.getElementById("add-button") as HTMLButtonElement;

let title = document.getElementById("add-title") as HTMLInputElement;
let description = document.getElementById("add-description") as HTMLInputElement;
let dueDate = document.getElementById("add-due-date") as HTMLInputElement;

let editId: number | null = null;

// When the user clicks the button, open the modal
btn.addEventListener("click", () => {
  openModal();
});

// When the user clicks on Cancel, close the modal
cancelBtn.addEventListener("click", () => {
  closeModal();
});

const validateForm = () => {
  if (!title.value || !dueDate.value) {
    addBtn.setAttribute("disabled", "true");
  } else {
    addBtn.removeAttribute("disabled");
  }
};

title.addEventListener("input", validateForm);
description.addEventListener("input", validateForm);
dueDate.addEventListener("change", validateForm);

addBtn.addEventListener("click", () => {
  if (editId) {
    ApplicationContext.setToDoItemsList(
      ApplicationContext.toDoItemsList.map((item) => {
        if (item.id === editId) {
          return {
            ...item,
            title: title.value,
            description: description.value,
            dueDate: new Date(dueDate.value).getTime(),
          };
        } else {
          return item;
        }
      })
    );
  } else {
    let result = new ToDo(
      title.value,
      description.value,
      new Date(dueDate.value)
    );
    ApplicationContext.setToDoItemsList([
      ...ApplicationContext.toDoItemsList,
      result,
    ]);
  }

  showList(ApplicationContext.toDoItemsList);

  //close modal
  closeModal();
});

const openModal = (toDoItem?: ToDo) => {
  if (toDoItem) {
    editId = toDoItem.id;
    title.value = toDoItem.title;
    description.value = toDoItem.description;
    dueDate.value = getDateStringFromDate(new Date(toDoItem.dueDate));
    addBtn.innerHTML = "Save";
  } else {
    addBtn.innerHTML = "Add";
  }
  modal.style.display = "block";
};

const closeModal = () => {
  editId = null;
  
  //clear the form
  title.value = "";
  description.value = "";
  dueDate.value = "";
  addBtn.setAttribute("disabled", "true");

  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    closeModal();
  }
});

//Set min attribute for input date, the current date value
const setMinLimitInputDate = () => {
  const today = getDateStringFromDate(new Date());
  let dueDateElem = document.getElementById("add-due-date") as HTMLElement;
  dueDateElem.setAttribute("min", today);
};

setMinLimitInputDate();

export { openModal };
