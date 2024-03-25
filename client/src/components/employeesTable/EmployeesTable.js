import React, { useContext, useState } from 'react';
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';
import { addEmployee, deleteEmployee, updateEmployee } from '../../ApiService';
import { UserContext } from '../../context/UserContext';
import helper from '../../helper';
import './employeesTable.css';

const EmployeesTable = ({ employees, setEmployees, isLoading, error }) => {
  const [newEmployee, setNewEmployee] = useState({ name: '', surname: '', email: '' });
  const [errorDeletingE, setErrorDeletingE] = useState(null);
  const [errorAddingE, setErrorAddingE] = useState(null);
  const [errorUpdatingE, setErrorUpdatingE] = useState(null);
  const { userId } = useContext(UserContext);

  const handleDelete = (id) => {
    deleteEmployee(id, userId)
      .then(() => setEmployees(employees.filter(employee => employee.employee_id !== id)))
      .catch((error) => setErrorDeletingE({ message: error.message || 'Failed to delete employee.' }));
  };

  const handleAdd = () => {
    addEmployee(newEmployee, userId)
      .then(data => {
        let updatedList = [...employees, data];
        setEmployees(helper.sortByName(updatedList));
      })
      .catch(error => {
        setErrorAddingE({ message: error.message || 'Failed to add employee.' });
      });
    setNewEmployee({ name: '', surname: '', email: '' });
  };

  //addEmployee -> onChange:
  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  //editEmployee -> onChange:
  const handleUpdate = (id, field, value) => {
    let updatedEmployees = [...employees];
    updatedEmployees = updatedEmployees.map(emp => emp.employee_id === id ? { ...emp, [field]: value } : emp);
    setEmployees(helper.sortByName(updatedEmployees));
  };

  const handleSave = (id, field, value) => {
    updateEmployee(id, field, value, userId)
      // .then(response => response)
      .catch(error => setErrorUpdatingE({ message: error.message || 'Failed to update employee.' }));
  };

  if (errorUpdatingE) {
    return <h2 className='error'> {errorUpdatingE.message}</h2>;
  }
  if (errorAddingE) {
    return <h2 className='error'> {errorAddingE.message}</h2>;
  }
  if (errorDeletingE) {
    return <h2 className='error'> {errorDeletingE.message}</h2>;
  }
  if (error) {
    return <h2 className='error'> {error.message}</h2>;
  }
  if (isLoading) {
    return <h3 className='error' style={{ color: "whitesmoke" }}>Loading ... </h3>;
  }

  return (
    <table className='emp-table'>
      <thead>
        <tr className='table-head'>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {employees.map(employee => (

          <tr key={employee.employee_id}>
            <td>
              <input type="text" defaultValue={employee.name} className='employee-input'
                onChange={(ev) => handleUpdate(employee.employee_id, 'name', ev.target.value)}
                onBlur={(ev) => handleSave(employee.employee_id, 'name', ev.target.value)}
              />
            </td>
            <td>
              <input type="text" defaultValue={employee.surname} className='employee-input'
                onChange={(ev) => handleUpdate(employee.employee_id, 'surname', ev.target.value)}
                onBlur={(ev) => handleSave(employee.employee_id, 'surname', ev.target.value)}
              />
            </td>
            <td>
              <input type="email" defaultValue={employee.email} className='employee-input email'
                onChange={(ev) => handleUpdate(employee.employee_id, 'email', ev.target.value)}
                onBlur={(ev) => handleSave(employee.employee_id, 'email', ev.target.value)}
              />
            </td>
            <td>
              <button className='employee-btn delete-btn' onClick={() => handleDelete(employee.employee_id)}><AiOutlineUserDelete /></button>
            </td>
          </tr>
        ))}

        <tr className='add-form'>
          <td>
            <input className='add-input' type="text" name="name" value={newEmployee.name} onChange={handleInputChange} />
          </td>
          <td>
            <input className='add-input' type="text" name="surname" value={newEmployee.surname} onChange={handleInputChange} />
          </td>
          <td>
            <input className='add-input' type="email" name="email" value={newEmployee.email} onChange={handleInputChange} />
          </td>
          <td>
            <button className='employee-btn add-btn' onClick={handleAdd}> <AiOutlineUserAdd /> </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};


export default EmployeesTable;