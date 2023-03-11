import { useState, useEffect } from "react";
import helper from "../helper";
import { TiDeleteOutline } from "react-icons//ti";
import { MdDownloadDone } from "react-icons/md";
import "./shiftTypes.css";
import { Shifts, ShiftTypes as ShiftTypesType } from "../types";

function ShiftTypes({
  shiftTypes,
  setShiftTypes,
  shifts,
  setShifts,
}: {
  shiftTypes: ShiftTypesType[];
  setShiftTypes: React.Dispatch<React.SetStateAction<ShiftTypesType[]>>;
  shifts: Shifts[];
  setShifts: React.Dispatch<React.SetStateAction<(number | Shifts)[]>>;
}) {
  const [newShiftType, setNewShiftType] = useState({
    description: "",
    abbreviation: "",
    start: "",
    end: "",
  });
  const URL = "http://localhost:4000/";

  useEffect(() => {
    fetch(`${URL}shift-types`)
      .then((response) => response.json())
      .then((data) => setShiftTypes(helper.sortShiftTypeByName(data)))
      .catch((error) => console.error(error));
  }, [setShiftTypes]);

  const handleDelete = (id: number) => {
    fetch(`${URL}shift-type/${id}`, {
      method: "DELETE",
    })
      .then(() =>
        setShiftTypes(shiftTypes.filter((shift) => shift.shift_type_id !== id))
      )
      .catch((error) => console.error(error));
  };

  async function addShift(day_number: number, shift_type_id: number) {
    // This function adds a shift with people_required = 0 by default:
    console.log("running", { day_number, shift_type_id });
    let shift = await fetch("http://localhost:4000/shift", {
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

  async function handleAdd() {
    // Adding a new shift type:
    const newShiftTypeId = await fetch("http://localhost:4000/shift-type", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newShiftType),
    }).then((response) => response.json());
    let tmpShiftType = newShiftTypeId;
    let updatedList = [...shiftTypes, tmpShiftType];
    setShiftTypes(helper.sortShiftTypeByName(updatedList));

    // Creating 28 placeholder shifts associated with the new shift type
    // so that the shift table is pre-populated:
    let newShifts = [...Array(28).keys()].map((x) => x + 1);
    newShifts = await Promise.all(
      newShifts.map(async (shift) => {
        return addShift(shift, tmpShiftType.shift_type_id);
      })
    );
    //updating shifts:
    setShifts([...shifts, ...newShifts]);
    setNewShiftType({ description: "", abbreviation: "", start: "", end: "" });
  }

  const handleUpdate = (id: number, field: string, value: string) => {
    let updatedShifts = [...shiftTypes];
    updatedShifts = updatedShifts.map((shift) =>
      shift.shift_type_id === id ? { ...shift, [field]: value } : shift
    );
    setShiftTypes(helper.sortShiftTypeByName(updatedShifts));
  };

  const handleSave = (id: number, field: string, value: string) => {
    fetch(`http://localhost:4000/shift-type/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    })
      .then((response) => response)
      .catch((error) => console.error(error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewShiftType({
      ...newShiftType,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <table className="shifts-table">
      <thead>
        <tr className="table-head">
          <th>Type</th>
          <th>Abbreviation</th>
          <th>Start</th>
          <th>End</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {shiftTypes.map((shiftType) => (
          <tr key={shiftType.shift_type_id}>
            <td>
              <input
                type="text"
                defaultValue={shiftType.description}
                className="shift-input"
                onChange={(ev) =>
                  handleUpdate(
                    shiftType.shift_type_id,
                    "description",
                    ev.target.value
                  )
                }
                onBlur={(ev) =>
                  handleSave(
                    shiftType.shift_type_id,
                    "description",
                    ev.target.value
                  )
                }
              />
            </td>
            <td>
              <input
                type="text"
                defaultValue={shiftType.abbreviation}
                className="shift-input"
                onChange={(ev) =>
                  handleUpdate(
                    shiftType.shift_type_id,
                    "abbreviation",
                    ev.target.value
                  )
                }
                onBlur={(ev) =>
                  handleSave(
                    shiftType.shift_type_id,
                    "abbreviation",
                    ev.target.value
                  )
                }
              />
            </td>
            <td>
              <input
                type="time"
                defaultValue={shiftType.start}
                className="shift-input"
                onChange={(ev) =>
                  handleUpdate(
                    shiftType.shift_type_id,
                    "start",
                    ev.target.value
                  )
                }
                onBlur={(ev) =>
                  handleSave(shiftType.shift_type_id, "start", ev.target.value)
                }
              />
            </td>
            <td>
              <input
                type="time"
                defaultValue={shiftType.end}
                className="shift-input"
                onChange={(ev) =>
                  handleUpdate(shiftType.shift_type_id, "end", ev.target.value)
                }
                onBlur={(ev) =>
                  handleSave(shiftType.shift_type_id, "end", ev.target.value)
                }
              />
            </td>
            <td>
              <button
                className="shift-btn delete-btn"
                onClick={() => handleDelete(shiftType.shift_type_id)}
              >
                <TiDeleteOutline />
              </button>
            </td>
          </tr>
        ))}

        <tr className="add-form">
          <td>
            <input
              className="add-input"
              type="text"
              name="description"
              value={newShiftType.description}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              className="add-input"
              type="text"
              name="abbreviation"
              value={newShiftType.abbreviation}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              className="add-input"
              type="time"
              name="start"
              value={newShiftType.start}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              className="add-input"
              type="time"
              name="end"
              value={newShiftType.end}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <button className="shift-btn add-btn" onClick={handleAdd}>
              <MdDownloadDone />{" "}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default ShiftTypes;
