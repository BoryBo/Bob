const URL = process.env.REACT_APP_BASE_URL;

export const getUser = async (id) => {
  try {
    const response = await fetch(`${URL}/user/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error fetching user's data: ${errorData.message}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw error;
  }
};

//! employee methods
export const getEmployees = async (userId) => {
  try {
    const response = await fetch(`${URL}/employees/${userId}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error fetching employees: ${errorData.message}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw error;
  }
};

export const addEmployee = async (newEmployee, userId) => {
  try {
    const response = await fetch(`${URL}/employee/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${errorData.message}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteEmployee = async (id, userId) => {
  try {
    const response = await fetch(`${URL}/employees/${id}/${userId}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error(`Failed to delete employee: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const updateEmployee = async (id, field, value, userId) => {
  try {
    const response = await fetch(`${URL}/employee/${id}/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    if (!response.ok) {
      throw new Error(`Failed to update employee: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

//! shift type

export const getShiftTypes = async (userId) => {
  try {
    const response = await fetch(`${URL}/shift-types/${userId}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error fetching shifts: ${errorData.message}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const addShiftType = async (newShiftType, userId) => {
  try {
    const response = await fetch(`${URL}/shift-type/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newShiftType),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${errorData.message}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};


export const deleteShiftType = async (id, userId) => {
  try {
    const response = await fetch(`${URL}/shift-type/${id}/${userId}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error(`Failed to delete shift: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const updateShiftType = async (id, field, value, userId) => {
  try {
    const response = await fetch(`${URL}/shift-type/${id}/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    if (!response.ok) {
      throw new Error(`Failed to update shift: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

//! shifts

export const getShifts = async (userId) => {
  try {
    const response = await fetch(`${URL}/shifts/${userId}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error fetching shifts: ${errorData.message}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const addNewShift = async (newShift, userId) => {
  try {
    const response = await fetch(`${URL}/shift/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newShift),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${errorData.message}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteShift = async (id, userId) => {
  try {
    const response = await fetch(`${URL}/shift/${id}/${userId}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error(`Failed to delete shift: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};


export const updateShift = async (id, shift, userId) => {
  // export const updateShift = async (id, field, value) => {
  try {
    const response = await fetch(`${URL}/shift/${id}/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shift),
    });
    if (!response.ok) {
      throw new Error(`Failed to update shift: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

//! rota
export const getRota = async (userId) => {
  try {
    const response = await fetch(`${URL}/rota/${userId}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${errorData.message}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw error;
  }
};

export { };
