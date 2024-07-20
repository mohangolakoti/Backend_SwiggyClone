const multer = require('multer')
const Firm = require('../models/Firm')
const Vendor = require('../models/Vendor')
const path = require('path')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
})

const upload = multer({storage:storage})
 
const addFirm = async(req,res)=>{
    try{
        const {firmName, area, category, region, offer} = req.body

        const image = req.file?req.file.filename:undefined

        const vendor = await Vendor.findById(req.vendorId)
        if(!vendor){
            res.status(404).json({message:"Vendor not Found"})
        }

        if(vendor.firm.length>0){
            return res.status(400).json({message:"Vendor can have only one Firm"})
        }

        const firm = new Firm({
            firmName, area, category, region, offer, image, vendor:vendor._id
        })

        const savedFirm = await firm.save();
        vendor.firm.push(savedFirm)
        await vendor.save();
        const firmId = savedFirm._id
        const vendorFirmName = savedFirm.firmName

        return res.status(200).json({message:"Firm added successfully", firmId,vendorFirmName});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
}

const deleteFirmById = async(req,res)=>{
    try {
        const firmId = req.params.firmId;
        const deletedFirm = await Firm.findByIdAndDelete(firmId);
        if(!deletedFirm){
            return res.status(404).json({error:"No product found"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal Server error"})
    }
}

module.exports = {addFirm:[upload.single('image'), addFirm], deleteFirmById}