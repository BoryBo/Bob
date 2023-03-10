"use strict";
const routes = require("express").Router();
const employeeCont = require("./controllers/employee.controller");
const shiftTypeCont = require("./controllers/shiftType.controller");
const shiftCont = require("./controllers/shift.controller");
const rotaCont = require("./controllers/rota.controller");

//employee methods
routes.get("/employees", employeeCont.getAllEmployees);
routes.post("/employee", employeeCont.addEmployee);
routes.delete("/employees/:id", employeeCont.deleteEmployee);
routes.put("/employee/:id", employeeCont.updateEmployee);

//shift type methods
routes.get("/shift-types", shiftTypeCont.getAllShiftTypes);
routes.post("/shift-type", shiftTypeCont.addShiftType);
routes.delete("/shift-type/:id", shiftTypeCont.deleteShiftType);
routes.put("/shift-type/:id", shiftTypeCont.updateShiftType);

//shift methods
routes.get("/shifts", shiftCont.getAllShifts);
routes.post("/shift", shiftCont.addShift);
routes.delete("/shift/:id", shiftCont.deleteShift);
routes.put("/shift/:id", shiftCont.updateShift);

//rota methods
routes.get("/rota", rotaCont.getRota);

module.exports = routes;
