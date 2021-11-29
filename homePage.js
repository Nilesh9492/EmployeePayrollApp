let empPayrollList;
window.addEventListener("DOMContentLoaded", (event) => {
  empPayrollList = getEmployeeDataFromStorage();
  createInnerHtml();
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  localStorage.removeItem("editEmp");
});
const getEmployeeDataFromStorage = () => {
  return localStorage.getItem("EmployeePayrollList")
    ? JSON.parse(localStorage.getItem("EmployeePayrollList"))
    : [];
};

let createInnerHtml = () => {
  let headerHTML =
    "<tr> <th></th> <th>Name</th> <th>Gender</th> <th>Department</th> <th>Salary</th> <th>StartDate</th><th>Actions</th> </tr>";
  let innerHTML = `${headerHTML}`;
  for (const empPayrollData of empPayrollList) {
    innerHTML = `
        ${innerHTML}
    <tr>
    <td>
        <img class="profile" src="${empPayrollData._profilePic}">
    
    </td>
    <td> 
       ${empPayrollData._name}
    </td>
    <td>${empPayrollData._gender}</td>
    <td>
        ${getDeptHtml(empPayrollData._department)}
    </td>
    <td>${empPayrollData._salary}</td>
    <td>${stringifyDate(empPayrollData._startDate)}</td>
    <td>
        <img id=${
          empPayrollData.id
        }  alt="delete" src="../assets/icons/delete-black-18dp.svg" onclick=remove(this)>
        <img id=${
          empPayrollData.id
        }  alt="edit" src="../assets/icons/create-black-18dp.svg"  onclick=update(this)>
    </td>
      </tr>  `;
  }

  document.querySelector("#display").innerHTML = innerHTML;
};

const getDeptHtml = (deptList) => {
  let deptHtml = "";
  for (const dept of deptList) {
    deptHtml = `${deptHtml} <div class = 'dept-label'>${dept}</div>`;
  }
  return deptHtml;
};

const createEmployeePayrollJSON = () => {
  let empPayrollDB = [
    {
      _id: 1,
      _name: "Nilesh B.",
      _gender: "male",
      _department: ["Engineer", "Other"],
      _salary: "654655",
      _startDate: "16 Dec 2021",
      _note: "All In One",
      _profilePic: "../assets/Ellipse -3.png",
    },
    {
      _id: 5,
      _name: "Nil",
      _gender: "male",
      _department: ["Sales", "Finance"],
      _salary: "400000",
      _startDate: "12 Dec 2020",
      _note: "",
      _profilePic: "../assets/Ellipse -3.png",
      id: 3,
    },
  ];
  return empPayrollDB;
};

const remove = (data) => {
  let employeeData = empPayrollList.find((empData) => empData.id == data.id);
  if (!employeeData) return;
  const index = empPayrollList
    .map((empData) => empData.id)
    .indexOf(employeeData.id);
  empPayrollList.splice(index, 1);
  localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
};

const update = (data) => {
  let employeePayrollData = empPayrollList.find(
    (empData) => empData.id == data.id
  );
  if (!employeePayrollData) return;
  localStorage.setItem("editEmp", JSON.stringify(employeePayrollData));
  window.location.replace(site_Properties.add_empPage);
};
