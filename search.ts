import { ApplicationContext } from "./ApplicationContext.js";
import { showList } from "./showList.js";

const searchBarInput = document.getElementById(
  "searchInput"
) as HTMLInputElement | null;

if (searchBarInput != null) {
  searchBarInput.addEventListener("input", () => {
    const value = searchBarInput.value;

    showList(
      ApplicationContext.toDoItemsList.filter(
        (item) =>
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.description.toLowerCase().includes(value.toLowerCase())
      )
    );
  });
}
