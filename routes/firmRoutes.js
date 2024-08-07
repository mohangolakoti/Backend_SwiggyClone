const express = require('express')
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken')

const router = express.Router()

router.post('/add-firm', verifyToken, firmController.addFirm) //route end point
router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headerSent('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..' ,'uploads', imageName));
});
router.get('/getFirm/:firmId',firmController.getFirmById);
router.delete('/:firmId', firmController.deleteFirmById);

module.exports = router