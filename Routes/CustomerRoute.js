const router = require('express').Router();
const CustomerModel = require('../Db/customerModel/CustomerModel')

router.post('/newpetient', async (req, res) => {
    try {

        let newCustomer = new CustomerModel({
            //alternate option>>>>>>direct use>  req.body
            customerName: req.body.name,
            customerEmail: req.body.email,
            customerContactNo:req.body.contact,
            customerAddress: req.body.address,
            customerBp: req.body.bp,
            customerBodyTemp: req.body.temp,
            customerHeight: req.body.height,
            customerWeight: req.body.weight,
            customerSPO2: req.body.spo2,
            customerPulseRate: req.body.pulse,
            customerReason: req.body.reason,
            customerShortNote: req.body.note,
            doctorAppointment: req.body.doctor,
            appointmentTitle: req.body.title,
            appointmentType: req.body.apttype,
            appointmentChannel: req.body.channel,
            appointmentTime: req.body.time,
            appointmentDate: req.body.date
        })
        let data = await newCustomer.save();
        if (data) {
            res.status(201).json(newCustomer);
        } else {
            res.status(401).json({ message: "Wrong Details" });
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/petients', async (req, res) => {
    try {
        let customers = await CustomerModel.find();
        if (customers) {
            res.status(200).send(customers);
        } else {
            res.status(404).json({ message: "Result not Found" })
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/group/petients/:dates',async(req,res)=>{
    try{
        let data=req.params.dates;
        data=data.split(",")
       let fromdate=data[0];
       let toDate=data[1]
       if(fromdate && toDate){
        const result = await CustomerModel.find({
            $and: [{ appointmentDate: { $gte: fromdate } }, { appointmentDate: { $lte:toDate} }]
          })
          if(result){
              res.status(201).send(result)
          }else{
            res.status(404).json({message:"Not Found"})
          }
       }else{
        res.status(400).json({message:"Please Provide valid data"})
       }
    }catch(err){
res.status(500).json(err)
    }
})



router.get('/petient/search/:key',async(req,res)=>{
   
let getSearch=await CustomerModel.find({
    "$or":[
        {
            customerContactNo:{$regex:req.params.key}
     
        },
        {
            customerName:{$regex:req.params.key}
        }  
    ]
})  
        res.send(getSearch)
   

    
})


module.exports = router;    