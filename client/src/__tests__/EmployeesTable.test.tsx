import { render } from "@testing-library/react";
import user from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import EmployeesTable from "../components/EmployeesTable";
import "@testing-library/jest-dom";

const employees = [
  {
    employee_id: 1,
    name: "John",
    surname: "Smith",
    email: "",
  },
  {
    employee_id: 2,
    name: "Jane",
    surname: "Doe",
    email: "",
  },
];

describe("EmployeesTable", () => {
  it("able to input into fields", async () => {
    const promise = Promise.resolve();
    const setEmployees = jest.fn(() => promise);
    const renderedApp = render(
      <EmployeesTable employees={employees} setEmployees={setEmployees} />
    );
    const name: any = await renderedApp.findByPlaceholderText("name");
    const surname: any = await renderedApp.findByPlaceholderText("surname");
    const email: any = await renderedApp.findByPlaceholderText("email");
    await act(async () => {
      user.type(name, "John");
      user.type(surname, "Smith");
      user.type(email, "test@test.com");
    });
    expect(name.value).toBe("John");
    expect(surname.value).toBe("Smith");
    expect(email.value).toBe("test@test.com");
  });
});
