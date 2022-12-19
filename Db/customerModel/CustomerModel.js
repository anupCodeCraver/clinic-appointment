const mongoose=require('mongoose');


const CustomerSchema=new mongoose.Schema({
   customerName:{type:String},
   customerEmail:{type:String},
   customerContactNo:{type:String},
   customerAddress:{type:Array},
    customerBp:{type:Number},
    customerBodyTemp:{type:String},
    customerHeight:{type:String},
    customerWeight:{type:String},
    customerSPO2:{type:String},
    customerPulseRate:{type:Number},
    customerReason:{type:String},   
    customerShortNote:{type:String},
doctorAppointment:{type:Array},
appointmentTitle:{type:String},
appointmentType:{  type:Array },
appointmentChannel:{type:Array},
appointmentTime:{type:String},
appointmentDate:{type:String},
appointmentBookedDate:{type:String,default:Date.now().toString()}
});

module.exports=mongoose.model('customer',CustomerSchema);