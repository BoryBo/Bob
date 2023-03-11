import { useState, useEffect } from "react";
import helper from "../helper";
import { AiOutlineUserDelete } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import "./employeesTable.css";
import { Employees as EmployeesType } from "../types";

const EmployeesTable = ({
  employees,
  setEmployees,
}: {
  employees: EmployeesType[];
  setEmployees: React.Dispatch<React.SetStateAction<EmployeesType[]>>;
}) => {
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    surname: "",
    email: "",
  });
  const URL = "http://localhost:4000/";

  useEffect(() => {
    fetch(`${URL}employees`)
      .then((response) => response.json())
      .then((data) => setEmployees(helper.sortEmployeesByName(data)))
      .catch((error) => console.error(error));
  }, [setEmployees]);

  const handleDelete = (id: number) => {
    fetch(`${URL}employees/${id}`, {
      method: "DELETE",
    })
      .then(() =>
        setEmployees(
          employees.filter((employee) => employee.employee_id !== id)
        )
      )
      .catch((error) => console.error(error));
  };

  const handleAdd = () => {
    fetch(`${URL}employee`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee),
    })
      .then((response) => response.json())
      .then((data) => {
        let updatedList = [...employees, data];
        setEmployees(helper.sortEmployeesByName(updatedList));
      })
      .catch((error) => console.error(error));

    setNewEmployee({ name: "", surname: "", email: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleUpdate = (id: number, field: string, value: string) => {
    let updatedEmployees = [...employees];
    updatedEmployees = updatedEmployees.map((emp) =>
      emp.employee_id === id ? { ...emp, [field]: value } : emp
    );
    setEmployees(helper.sortEmployeesByName(updatedEmployees));
  };

  const handleSave = (id: number, field: string, value: string) => {
    fetch(`${URL}employee/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    })
      .then((response) => response)
      .catch((error) => console.error(error));
  };

  return (
    <table className="emp-table">
      <thead>
        <tr className="table-head">
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.employee_id}>
            <td>
              <input
                type="text"
                data-testid="name"
                defaultValue={employee.name}
                className="employee-input"
                onChange={(ev) =>
                  handleUpdate(employee.employee_id, "name", ev.target.value)
                }
                onBlur={(ev) =>
                  handleSave(employee.employee_id, "name", ev.target.value)
                }
              />
            </td>
            <td>
              <input
                type="text"
                data-testid="surname"
                defaultValue={employee.surname}
                className="employee-input"
                onChange={(ev) =>
                  handleUpdate(employee.employee_id, "surname", ev.target.value)
                }
                onBlur={(ev) =>
                  handleSave(employee.employee_id, "surname", ev.target.value)
                }
              />
            </td>
            <td>
              <input
                type="email"
                data-testid="email"
                defaultValue={employee.email}
                className="employee-input"
                onChange={(ev) =>
                  handleUpdate(employee.employee_id, "email", ev.target.value)
                }
                onBlur={(ev) =>
                  handleSave(employee.employee_id, "email", ev.target.value)
                }
              />
            </td>
            <td>
              <button
                className="employee-btn delete-btn"
                onClick={() => handleDelete(employee.employee_id)}
              >
                <AiOutlineUserDelete />
              </button>
            </td>
          </tr>
        ))}

        <tr className="add-form">
          <td>
            <input
              className="add-input"
              type="text"
              data-testid="add-name"
              name="name"
              value={newEmployee.name}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              className="add-input"
              type="text"
              data-testid="add-surname"
              name="surname"
              value={newEmployee.surname}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              className="add-input"
              type="email"
              data-testid="add-email"
              name="email"
              value={newEmployee.email}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <button className="employee-btn add-btn" onClick={handleAdd}>
              {" "}
              <AiOutlineUserAdd />{" "}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default EmployeesTable;
