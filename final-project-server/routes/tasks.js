const taskRoutes = (app, fs) => {

    const dataPath = './task.json'

    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

   const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/tasks', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });
    //  SEND
    app.post('/tasks', (req, res) => {

        readFile(data => {
            // add the new task
            data[req.body.data.id] = req.body.data;
    
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new task added');
            });
        },
            true);
    });
    
    // DELETE
    app.delete('/tasks/:id', (req, res) => {
    
        readFile(data => {
    
            // a
            const taskId = req.params["id"];
            delete data[taskId];
    
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`tasks id:${taskId} removed`);
            });
        },
            true);
    });
};


module.exports = taskRoutes;
//hello