import { ApplicationContext } from "./ApplicationContext.js";
import { showList } from "./showList.js";

ApplicationContext.initData();
showList(ApplicationContext.toDoItemsList);