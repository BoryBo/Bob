import { ShiftTypes } from './types';
const URL: string = "http://localhost:4000/";

// API for Redirect
export const getShifts = async () => { // this one is used in Redirect as well
  const response = await fetch(`${URL}shifts`)
    .then((response) => response.json());
  return response;
}

export const getShiftTypes = async () => { // this one is used in ShiftTypes as well
  const response = await fetch(`${URL}shift-types`)
    .then((response) => response.json());
  return response;
}


// API for ShiftTypes
export const deleteShiftType = async (id: number) => {
  fetch(`${URL}shift-type/${id}`, { method: "DELETE" });
}

export const addShift = async (day_number: number, shift_type_id: number) => {
  const shift = await fetch(`${URL}shift`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        day_number: day_number,
        people_required: 0,
        shift_type_id: shift_type_id,
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  return shift;
}

export const handleAddShiftType = async (newShiftType: ShiftTypes) => {
   const newShiftTypeId = await fetch(`${URL}shift-type`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newShiftType),
   }).then((response) => response.json());
  
  return newShiftTypeId
}

export const changeShiftType = async (id: number, field: string, value: string) => {
  fetch(`${URL}shift-type/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    })
      .then((response) => response)
      .catch((error) => console.error(error));
}

// API for employeesTable
export const getEmployees = async () => {
  const response = await fetch(`${URL}employees`)
    .then((response) => response.json());

  return response;
}

export const deleteEmployee = async (id: number) => {
  fetch(`${URL}employees/${id}`, { method: "DELETE" });
}

export const addEmployee = async (newEmployee: any) => {
   const response = fetch(`${URL}employee`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee),
    }).then((response) => response.json());
  
  return response;
}

export const changeEmployee = async (id: number, field: string, value: string) => {
  const response = fetch(`${URL}employee/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [field]: value }),
  });

  return response;
}

// API for Rota
export const getRota = async () => {
  const response = await fetch(`${URL}rota`)
    .then((res) => {
        if (res.status >= 400) {
          return Promise.reject("Failed to fetch!");
        }
        return res;
      })
      .then((response) => response.json())
  return response;
}

// API for Cell (in shifts)
export const changeShift = async (id: string, field: string, value: string) => {
  const response = fetch(`${URL}shift/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });

  return response;
}


export {}