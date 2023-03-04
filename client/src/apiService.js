const API_URL = 'http://localhost:4000';

export const getAllEmployees = async () => {
  try {
    const response = await fetch(`${API_URL}/employees`);
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const addEmployee = async (employee) => {
  try {
    const response = await fetch(`${API_URL}/employee`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: employee.name,
        surname: employee.surname,
        email: employee.email
      })
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await fetch(`${API_URL}/employees/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateEmployee = async (id, {data}) => {
  try {
    const response = await fetch(`${API_URL}/employee/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({data}) //TODO

    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
