const router = require('express').Router();
let Order =  require('../models/ordersModel');
let Patient =  require('../models/patientsModel');

// 取得所有Order
router.route('/').get((req, res) => {
    Order.find()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// 新增Order，找到最後一筆資料的ID然後+1設為新Order的Id
router.route('/add').post((req, res) => {
    Order.find({}, {Id:1}).sort({Id:-1}).limit(1).then( order => {
        let Id = 1;
        if(order.length == 0){
            Id = 1;
        }
        else{
            Id = order[0].Id + 1;
        }
        const Message = req.body.Message;

        const newOrder = new Order({
            Id,
            Message
        });

        newOrder.save()

        // 新增到Patient的OrderIds
        Patient.updateOne({ Id :req.body.PatientId }, { "$push": {OrderIds: Id} })
        .then(() => res.json('OrderId updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// 按照Id找該筆資料
router.route('/:id').get((req, res) => {
    Order.find({Id :req.params.id})
      .then( order => res.json(order))
      .catch(err => res.status(400).json(`Error: ${err}`));
  });
  
  // 按照Id更新
  router.route('/update/:id').put((req, res) => {
    Order.updateOne({ Id :req.params.id }, { Message: req.body.Message })
    .then(() => res.json('Order updated!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
  });
  
module.exports = router;