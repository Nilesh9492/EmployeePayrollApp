const salary = document.querySelector("#salary");
const output = document.querySelector(".salary-output");
output.textContent = salary.value;
salary.addEventListener("input", function () {
  output.textContent = salary.value;
});

class EmployeePayroll {
  get id() {
    return this._id;
  }
  set id(id) {
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    let nameRegex = RegExp("^[A-Z]{1}[a-z]{3,}$");
    if (nameRegex.test(name)) this._name = name;
    else throw "Name is Incorrect";
  }
  get profilePic() {
    return this._profilePic;
  }

  set profilePic(profilePic) {
    this._profilePic = profilePic;
  }

  get gender() {
    return this._gender;
  }

  set gender(gender) {
    this._gender = gender;
  }

  get department() {
    return this._department;
  }

  set department(department) {
    this._department = department;
  }

  get salary() {
    return this._salary;
  }

  set salary(salary) {
    this._salary = salary;
  }

  get startDate() {
    return this._startDate;
  }

  get notes() {
    return this._notes;
  }

  set notes(notes) {
    this._notes = notes;
  }

  toString() {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const employeeDate =
      this.startDate == undefined
        ? "undefined"
        : this.startDate.toLocaleDateString("en-us", options);
    return (
      "Name = " +
      this.name +
      ", Profile Image = " +
      this.profileImage +
      ", Gender = " +
      this.gender +
      ", Department = " +
      this.department +
      ", Salary = " +
      this.salary +
      ", Start Date = " +
      employeeDate +
      ", Notes = " +
      this.notes
    );
  }
}
window.addEventListener("ContentLoaded", (event) => {
  salaryOutput();
  validateName();
  validateDate();
  checkforUpdate();
});

function salaryOutput() {
  const salary = document.querySelector("#salary");
  const output = document.querySelector(".salary-output");
  output.textContent = salary.value;
  salary.addEventListener("input", function () {
    output.textContent = salary.value;
  });
}

function validateName() {
  let name = document.querySelector("#name");
  let textError = document.querySelector(".text-error");
  name.addEventListener("input", function () {
    let nameRegex = RegExp("^[A-Z]{1}[a-z]{2,}$");
    if (nameRegex.test(name.value)) {
      textError.textContent = "";
    } else {
      textError.textContent = "Name is Incorrect";
    }
  });
}

function validateDate() {
  let day = document.querySelector("#day");
  let month = document.querySelector("#month");
  let year = document.querySelector("#year");
  day.addEventListener("input", checkDate);
  month.addEventListener("input", checkDate);
  year.addEventListener("input", checkDate);
}

const checkforUpdate = () => {
  const employeePayrollJson = localStorage.getItem("editEmp");
  isUpdate = employeePayrollJson ? true : flase;
  if (!isUpdate) return;
  employeePayrollObj = JSON.parse(employeePayrollJson);
  setForm();
};

function checkDate() {
  let dateError = document.querySelector(".dates-error");
  let date = day.value + " " + month.value + " " + year.value;
  try {
    checkStartDate(new Date(Date.parse(date)));
    dateError.textContent = "";
  } catch (e) {
    dateError.textContent = e;
  }
}

function checkStartDate(startDate) {
  let currentDate = new Date();
  if (startDate > currentDate) {
    throw "Start date is a future date";
  }
  let differnce = Math.abs(currentDate.getTime() - startDate.getTime());
  let date = differnce / (1000 * 60 * 60 * 24);
  if (date > 30) {
    throw "Start date is beyond 30 days";
  }
}

function save(event) {
  alert("Employee Saved");

  event.preventDefault();
  event.stopPropagation();

  try {
    let employeePayrollDate = createEmployeePayroll();
  } catch (e) {
    return;
  }
}

function createEmployeePayroll() {
  let employeePayrollData = new EmployeePayrollData();
  try {
    employeePayrollData.name = getInputValueByID("#name");
    employeePayrollData.salary = getInputValueByID("#salary");
    employeePayrollData.notes = getInputValueByID("#notes");
    employeePayrollData.profilePic = getSelectedValues("[name=profile]").pop();
    employeePayrollData.gender = getSelectedValues("[name=gender]").pop();
    employeePayrollData.department = getSelectedValues("[name=department]");
  } catch (e) {
    setTextValue(".text-error", e);
  }
  try {
    let date =
      getInputValueByID("#day") +
      " " +
      getInputValueByID("#month") +
      " " +
      getInputValueByID("#year");
    employeePayrollData.startDate = new Date(Date.parse(date));
  } catch (e) {
    setTextValue(".date-error", e);
  }

  alert(employeePayrollData.toString());
  return employeePayrollData;
}

function getInputValueByID(id) {
  let value = document.querySelector(id).value;
  return value;
}

function setTextValue(className, value) {
  let textError = document.querySelector(className);
  textError.textContent = value;
}

function getSelectedValues(propertyValue) {
  let allItems = document.querySelectorAll(propertyValue);
  let setItems = [];
  allItems.forEach((item) => {
    if (item.checked) {
      setItems.push(item.value);
    }
  });
  return setItems;
}

function createAndUpdateStorage(employeePayrollData) {
  let employeePayrollList = JSON.parse(
    localStorage.getItem("EmployeePayrollList")
  );
  if (employeePayrollList == undefined) {
    employeePayrollList = [employeePayrollData];
  } else {
    employeePayrollList.push(employeePayrollData);
  }
  localStorage.setItem(
    "EmployeePayrollListList",
    JSON.stringify(employeePayrollList)
  );
}


function resetButton() {
  setValue("#name", "");
  setValue("#salary", 400000);
  setValue("#notes", "");
  setValue("#day", "");
  setValue("#month", "");
  setValue("#year", "");
  setTextValue(".salary-output", 400000);
  setTextValue(".text-error", "");
  setTextValue(".date-error", "");
  unsetSelectedValues("[name=profile]");
}

function setValue(id, value) {
  let element = document.querySelector(id);
  element.value = value;
}

function unsetSelectedValues(propertyValue) {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach((item) => {
    item.selected = false;
  });
}