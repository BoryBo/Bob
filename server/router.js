const router = require('express').Router();
const employeeCont = require('./controllers/employee.controller');
const shiftTypeCont = require('./controllers/shiftType.controller');
const shiftCont = require('./controllers/shift.controller');
// const rotaCont = require('./controllers/rota.controller');


router.get('/', (req, res) => {
  res.json({ message: 'Hiiiii' });
});

//employee methods
router.get('/employees', employeeCont.getAllEmployees);
router.post('/employee', employeeCont.addEmployee);
router.delete('/employees/:id', employeeCont.deleteEmployee);
router.put('/employee/:id', employeeCont.updateEmployee);

//shift type methods
router.get('/shift-types', shiftTypeCont.getAllShiftTypes);
router.post('/shift-type', shiftTypeCont.addShiftType);
router.delete('/shift-type/:id', shiftTypeCont.deleteShiftType);
router.put('/shift-type/:id', shiftTypeCont.updateShiftType);

//shift methods
router.get('/shifts', shiftCont.getAllShifts);
router.post('/shift', shiftCont.addShift);
router.delete('/shift/:id', shiftCont.deleteShift);
router.put('/shift/:id', shiftCont.updateShift);

//test methods
// router.get('/enhancedShifts', rotaCont.expandShiftsWithShiftType);


module.exports = router;