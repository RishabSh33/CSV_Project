const File=require('../modals/model');
module.exports.create= function(req,res){
    try{
        // upload the file in schema 
        // uploaded file method is used in models.js
        File.uploadedFile(req,res, async function(err){
            if(err){
                console.log('error upload',err);
            }
            console.log("req.file",req.file);
            if(
                (req.file && req.file.mimetype == 'application/vnd.ms-excel') ||
                (req.file && req.file.mimetype == "text/csv") 
            ){
                console.log('req.file if condition',req.file);
                // create file
                await File.create({
                    filePath:req.file.path,
                    originalName:req.file.originalname,
                    file:req.file.filename
                });
                return res.redirect('/');
            }else{
                console.log('upload the CSV format');
                return res.redirect('/')
            }
        })

    }catch(err){
        console.log('error in uploading file',err);
        return;
    }
}