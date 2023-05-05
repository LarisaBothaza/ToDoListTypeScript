const getDateStringFromDate = (date: Date) => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    let yyyy = date.getFullYear();
    let day = ""; let month = "";

    if (dd < 10) {
      day = '0' + dd;
    } else {
      day = dd.toString();
    }
    
    if (mm < 10) {
      month = '0' + mm;
    } else {
      month = mm.toString();
    }

    return `${yyyy}-${month}-${day}`;
  }

  export { getDateStringFromDate };