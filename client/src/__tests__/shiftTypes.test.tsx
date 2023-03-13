import { render, screen, waitFor, act } from '@testing-library/react'
import ShiftTypes from '../components/ShiftTypes';
import user from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";
import { handleAddShiftType } from '../ApiService';

const shiftTypes = [{
  abbreviation: "OM",
  description: "Open MTF",
  duration: 180,
  end: "13:00",
  shift_type_id: 1,
  start: "06:00"
}, {
  abbreviation: "OW",
  description: "Open Weekend",
  duration: 300,
  end: "15:00",
  shift_type_id: 2,
  start: "08:00"
  }
,{
  abbreviation: "CM",
  description: "Close MTF",
  duration: 300,
  end: "19:00",
  shift_type_id: 3,
  start: "14:00"
  }
,{
  abbreviation: "CW",
  description: "Close Weekend",
  duration: 240,
  end: "18:00",
  shift_type_id: 4,
  start: "14:00"
  }]

const shifts = [{ shift_id: '1', day_number: 1, people_required: 1, shift_type_id: 1 },
  { shift_id: '2', day_number: 2, people_required: 1, shift_type_id: 1 },
  { shift_id: '3', day_number: 3, people_required: 0, shift_type_id: 2 },
  { shift_id: '4', day_number: 4, people_required: 0, shift_type_id: 1 },
  { shift_id: '5', day_number: 5, people_required: 0, shift_type_id: 2 },
  { shift_id: '6', day_number: 6, people_required: 0, shift_type_id: 1 },
  { shift_id: '7', day_number: 7, people_required: 0, shift_type_id: 2 },
  { shift_id: '8', day_number: 8, people_required: 0, shift_type_id: 1 },
  { shift_id: '9', day_number: 9, people_required: 0, shift_type_id: 1 },
  { shift_id: '10', day_number: 10, people_required: 1, shift_type_id: 2 },
  { shift_id: '11', day_number: 11, people_required: 0, shift_type_id: 1 },
  { shift_id: '12', day_number: 12, people_required: 0, shift_type_id: 1 },
  { shift_id: '13', day_number: 13, people_required: 0, shift_type_id: 1 },
  { shift_id: '14', day_number: 14, people_required: 0, shift_type_id: 1 },
  { shift_id: '15', day_number: 15, people_required: 0, shift_type_id: 1 },
  { shift_id: '16', day_number: 16, people_required: 0, shift_type_id: 1 },
  { shift_id: '17', day_number: 17, people_required: 0, shift_type_id: 1 },
  { shift_id: '18', day_number: 18, people_required: 0, shift_type_id: 1 },
  { shift_id: '19', day_number: 19, people_required: 0, shift_type_id: 2 },
  { shift_id: '20', day_number: 20, people_required: 0, shift_type_id: 2 },
  { shift_id: '21', day_number: 21, people_required: 0, shift_type_id: 1 },
  { shift_id: '22', day_number: 22, people_required: 1, shift_type_id: 1 },
  { shift_id: '23', day_number: 23, people_required: 1, shift_type_id: 2 },
  { shift_id: '24', day_number: 24, people_required: 1, shift_type_id: 1 },
  { shift_id: '25', day_number: 25, people_required: 1, shift_type_id: 2 },
  { shift_id: '26', day_number: 26, people_required: 1, shift_type_id: 1 },
  { shift_id: '27', day_number: 27, people_required: 1, shift_type_id: 2 },
  { shift_id: '28', day_number: 28, people_required: 1, shift_type_id: 1 },
]


describe('Render <ShiftTypes />', () => {
  it('should render titles whether there is data or not', () => {
    const setShiftTypes = jest.fn();
    const setShifts = jest.fn();
    render(<ShiftTypes shiftTypes={[]}
      setShiftTypes={setShiftTypes}
      shifts={[]}
      setShifts={setShifts} />)
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Abbreviation")).toBeInTheDocument();
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("End")).toBeInTheDocument();
  })
})


describe('Render all existing shiftTypes', () => {
  it('should render all shift types after data is fetched', async () => {
    const setShiftTypes = jest.fn();
    const setShifts = jest.fn();
    render(<ShiftTypes shiftTypes={shiftTypes}
              setShiftTypes={setShiftTypes}
              shifts={shifts}
              setShifts={setShifts} />)
    const shiftTypeElements = await waitFor(() => screen.getAllByTestId("getAllData"));
    expect(shiftTypeElements).toHaveLength(4);
  })
})

describe("ShiftTypes", () => {
  it("able to input into fields", async () => {
    const setShiftTypes = jest.fn(() => promise);
    const setShifts = jest.fn(() => promise);
    const promise = Promise.resolve();
    const renderedApp = render(<ShiftTypes shiftTypes={shiftTypes}
      setShiftTypes={setShiftTypes}
      shifts={shifts}
      setShifts={setShifts} />)
    const type: any = await renderedApp.findByPlaceholderText("shift-type");
    const abbreviation: any = await renderedApp.findByPlaceholderText("abbreviation");
    const start: any = await renderedApp.findByPlaceholderText("start-time");
    const end: any = await renderedApp.findByPlaceholderText("end-time");
    await act(async () => {
      user.type(type, "FW");
      user.type(abbreviation, "Fulltime Weekend");
      user.type(start, "08:00");
      user.type(end, "17:00");
    });
    expect(type.value).toBe("FW");
    expect(abbreviation.value).toBe("Fulltime Weekend");
    expect(start.value).toBe("08:00");
    expect(end.value).toBe("17:00");
  });

  it('should render a new data that is added', async () => {
    const setShiftTypes = jest.fn();
    const setShifts = jest.fn();
    const promise = Promise.resolve();
    const renderedApp = render(<ShiftTypes shiftTypes={shiftTypes}
      setShiftTypes={setShiftTypes}
      shifts={shifts}
      setShifts={setShifts} />)
    const type: any = await renderedApp.findByPlaceholderText("shift-type");
    const abbreviation: any = await renderedApp.findByPlaceholderText("abbreviation");
    const start: any = await renderedApp.findByPlaceholderText("start-time");
    const end: any = await renderedApp.findByPlaceholderText("end-time");
    
    // @ TODO : test handleAdd function 
    await act(async () => {
      user.type(type, "FW");
      user.type(abbreviation, "Fulltime Weekend");
      user.type(start, "08:00");
      user.type(end, "17:00");
      userEvent.click(screen.getByTestId('addBtn'));
    });
    // await new Promise((resolve) => setTimeout(resolve, 0));
    // expect(screen.getByText("FW")).toBeInTheDocument();
    // expect(screen.getByText("Fulltime Weekend")).toBeInTheDocument();
  })
});
