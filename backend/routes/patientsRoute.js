const router = require('express').Router();
let Patient =  require('../models/patientsModel');

// 取得所有Patient
router.route('/').get((req, res) => {
    Patient.find()
    .then(patients => res.json(patients))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// 新增Patient
router.route('/add').post((req, res) => {
    Patient.find({}, {Id:1}).sort({Id:-1}).limit(1).then( patient => {
        const Id = patient[0].Id + 1; 
        const Name = req.body.Name;
        const OrderIds = req.body.OrderIds;
    
        const newPatient = new Patient({
            Id,
            Name,
            OrderIds
        });
    
        newPatient.save()
        .then(() => res.json('Add successfully'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});
  
module.exports = router;