'use strict';
const router = require('express').Router();
const employeeController = require('./controllers/employee.controller');
const shiftTypeController = require('./controllers/shiftType.controller');
const shiftController = require('./controllers/shift.controller');
const rotaController = require('./controllers/rota.controller');
const userController = require('./controllers/user.controller');

//employee methods
router.get('/employees/:userId', employeeController.getAllEmployees);
router.post('/employee/:userId', employeeController.addEmployee);
router.delete('/employees/:id/:userId', employeeController.deleteEmployee);
router.put('/employee/:id/:userId', employeeController.updateEmployee);

//shift type methods
router.get('/shift-types/:userId', shiftTypeController.getAllShiftTypes);
router.post('/shift-type/:userId', shiftTypeController.addShiftType);
router.delete('/shift-type/:id/:userId', shiftTypeController.deleteShiftType);
router.put('/shift-type/:id/:userId', shiftTypeController.updateShiftType);

//shift methods
router.get('/shifts', shiftController.getAllShifts);
router.post('/shift', shiftController.addShift);
router.delete('/shift/:id', shiftController.deleteShift);
router.put('/shift/:id', shiftController.updateShift);

//rota methods
router.get('/rota/:userId', rotaController.getRota);

//user
router.get('/user/:id', userController.getUser);

module.exports = router;