const express = require('express');
const router = express.Router();
const { host } = require('../../config.json')
const query = require('../../db/mysql');

var multer = require('multer')

var storage = multer.diskStorage({
    destination:'uploads/',
    filename: function(req, file, cb){
        let arr = file.originalname.split('.')
        cb(null,arr[0] + '-' + Date.now() + '.' + arr[1])
        // console.log(req,file,cb)
    }
})
// console.log(storage.getFilename)
var upload = multer({ storage })
 
// 上传单个文件，头像 /upload/avatar
router.post('/avatarimg', upload.single('avatar'), async(req,res) => {
    // req.file 是 `avatar` 文件的信息
    // req.body 将具有文本域数据，如果存在的话
    // single里面的avatar是前端发来的键名
    let { uid } = req.body;
    let url = host + 'uploads/' + req.file.filename;
    console.log(url)
    let p = await query(`UPDATE user SET avatar='${url}' WHERE uid='${uid}'`);
    let info = {};
    if(p.affectedRows) {
        info = {
            code: 200,
            flag: true,
            message: '上传成功',
            data: {
                imgurl:url
            }
        }
    }else{
        info = {
            code: 300,
            flag: false,
            message: '上传失败'
        }
    }
    res.send(info);
})

module.exports = router;//导出