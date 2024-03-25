'use strict';
const db = require('../models');

exports.getAllEmployees = async (req, res) => {
  try {
    const userId = req.params.userId;
    let employees = await db.Employee.findAll({
      where: { user_id: userId }
    });
    res
      .status(200)
      .send(employees);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message });
  }
};

exports.addEmployee = async (req, res) => {
  try {
    if (
      req.body.name === null ||
      req.body.name.trim() === '' ||
      req.body.email === null ||
      !req.body.email.includes('@') ||
      req.body.surname === null ||
      req.body.surname.trim() === ''
    ) {
      throw new Error(' Please fill out all fields to proceed.');
    }
    const { userId } = req.params;
    let employees = await db.Employee.findAll();
    let employeeExists = employees.filter(x => x.email === req.body.email);
    if (employeeExists.length === 0) {
      let newEmployee = await db.Employee.create({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        user_id: userId
      });
      res
        .status(201)
        .send(newEmployee);
    } else {
      throw new Error(` An employee with email: ${req.body.email} already exists`);
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { userId, id } = req.params;
  try {
    await db.Employee.destroy({
      where: {
        employee_id: id, user_id: userId
      }
    });
    res
      .status(200)
      .send(`Employee deleted successfully`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message });
  }
};


exports.updateEmployee = async (req, res) => {
  const { userId, id } = req.params;
  try {
    let toBeUpdatedArr = await db.Employee.findOne({
      where: {
        employee_id: id,
        user_id: userId
      }
    });
    await toBeUpdatedArr.set({ ...req.body });
    await toBeUpdatedArr.save();
    res
      .status(200)
      .send({ message: "Employee successfully updated" });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message });
  }
};