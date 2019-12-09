const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const {PythonShell} = require('python-shell');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/result', function(req,res){


})

app.post('/upload', function(req, res) {
    console.log(req.files);
    res.sendStatus(status);
   /*var array = [];
    if(Array.isArray(req.files.file) == false)
        array.push(req.files.file)
    if(Array.isArray(req.files.file) == true){
        req.files.file.forEach(function(file) {
            array.push(file)
        });
    }

    console.log(req.files);
    array.forEach(function(file) {
        uploadPath = tempDirectory + '/' + file.name;
        file.mv(uploadPath, function(err) {
            if (err)
                console.log(err);
            let options = {
              mode: 'text',
              pythonPath: 'C:/Users/Anastasia Chinsky/AppData/Local/Programs/Python/Python37-32/python.exe',
              pythonOptions: ['-u'],
              scriptPath: 'C:/Users/Anastasia Chinsky/PycharmProjects/OCR',
              args: [tempDirectory]
            };

            var pyshell = new PythonShell("main.py", options);

            pyshell.on('message', function (message) {
                console.log(message);
            });


            pyshell.end(function (err) {
                if (err){
                    throw err;
                };

                res.send('finished');
//                res.redirect('/result');


            });
        });
    });*/



    /*PythonShell.run('../main.py', null, function (err) {
      if (err) throw err;
      console.log('finished');
      res.redirect('/result');
    });*/


});

app.listen(port, () => console.log(`Listening on port ${port}`))