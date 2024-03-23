'use strict';
const router = require('express').Router();
const employeeController = require('./controllers/employee.controller');
const shiftTypeController = require('./controllers/shiftType.controller');
const shiftController = require('./controllers/shift.controller');
const rotaController = require('./controllers/rota.controller');
const userController = require('./controllers/user.controller');

//employee methods
router.get('/employees/:user-id', employeeController.getAllEmployees);
router.post('/employee/:user-id', employeeController.addEmployee);
router.delete('/employees/:id/:user-id', employeeController.deleteEmployee);
router.put('/employee/:id/:user-id', employeeController.updateEmployee);

//shift type methods
router.get('/shift-types/:user-id', shiftTypeController.getAllShiftTypes);
router.post('/shift-type/:user-id', shiftTypeController.addShiftType);
router.delete('/shift-type/:id/:user-id', shiftTypeController.deleteShiftType);
router.put('/shift-type/:id/:user-id', shiftTypeController.updateShiftType);

//shift methods
router.get('/shifts/:user-id', shiftController.getAllShifts);
router.post('/shift/:user-id', shiftController.addShift);
router.delete('/shift/:id/:user-id', shiftController.deleteShift);
router.put('/shift/:id/:user-id', shiftController.updateShift);

//rota methods
router.get('/rota/:user-id', rotaController.getRota);

//user
router.get('/user/:id', userController.getUser);

module.exports = router;