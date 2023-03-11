import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { act } from "react-dom/test-utils";
import EmployeesTable from "../components/EmployeesTable";
import { Employees } from "../types";

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

test("checks inputs", async () => {
  const promise = Promise.resolve(); // You can also resolve with a mocked return value if necessary
  const setEmployees = jest.fn(() => promise);
  const renderedApp = render(
    <EmployeesTable employees={employees} setEmployees={setEmployees} />
  );
  const email: any = await renderedApp.findByTestId("add-email");
  userEvent.type(email, "test@test.com");
  expect(email.value).toEqual("test@test.com");
  // await act(async () => {
  //   await promise;
  // });
});
