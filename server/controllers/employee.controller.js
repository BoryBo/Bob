'use strict';
const db = require('../models');

exports.getAllEmployees = async (req, res) => {
  try {
    let employees = await db.Employee.findAll();
    res
      .status(200)
      .send(employees);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(error);
  }
};

exports.addEmployee = async (req, res) => {
  try {
    let newEmployee = await db.Employee.create({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email
    });

    console.log("Employee added");

    res
      .status(201)
      .send(newEmployee);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({
        errors: error
      });
  }
};

exports.deleteEmployee = async (req, res) => {
  let id = req.params.id;
  try {
    await db.Employee.destroy({
      where: { employee_id: id }
    });

    res
      .status(200)
      .json({
        message: ` Employee deleted successfully`,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(error);
  }
};


exports.updateEmployee = async (req, res) => {
  let id = req.params.id;
  try {
    let toBeUpdatedArr = await db.Employee.findAll({
      where: {
        employee_id: id
      }
    });
    let temp = toBeUpdatedArr[0];
    await temp.set({ ...req.body });
    await temp.save();
    res
      .status(200)
      .send(`Empoyee with id:${id} was updated successfully.`);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(error);
  }
};