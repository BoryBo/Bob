const URL = process.env.REACT_APP_BASE_URL;

//! employee methods
export const getEmployees = async () => {
  try {
    const response = await fetch(`${URL}/employees`);
    if (!response.ok) {
      // throw new Error(`Error fetching employees: ${response.status}`);
      const errorData = await response.json();
      throw new Error(`Error fetching employees: ${errorData.message}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const addEmployee = async (newEmployee) => {
  try {
    const response = await fetch(`${URL}/employee`, {
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

export const deleteEmployee = async (id) => {
  try {
    const response = await fetch(`${URL}/employees/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error(`Failed to delete employee: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const updateEmployee = async (id, field, value) => {
  try {
    const response = await fetch(`${URL}/employee/${id}`, {
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

export const getShiftTypes = async () => {
  try {
    const response = await fetch(`${URL}/shift-types`);
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

export const addShiftType = async (newShiftType) => {
  try {
    const response = await fetch(`${URL}/shift-type`, {
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


export const deleteShiftType = async (id) => {
  try {
    const response = await fetch(`${URL}/shift-type/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error(`Failed to delete shift: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};

export const updateShiftType = async (id, field, value) => {
  try {
    const response = await fetch(`${URL}/shift-type/${id}`, {
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

export const getShifts = async () => {
  try {
    const response = await fetch(`${URL}/shifts`);
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

export const addNewShift = async (newShift) => {
  try {
    const response = await fetch(`${URL}/shift`, {
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

export const deleteShift = async (id) => {
  try {
    const response = await fetch(`${URL}/shift/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error(`Failed to delete shift: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};


export const updateShift = async (id, shift) => {
  // export const updateShift = async (id, field, value) => {
  try {
    const response = await fetch(`${URL}/shift/${id}`, {
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
export const getRota = async () => {
  try {
    const response = await fetch(`${URL}/rota`);
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
