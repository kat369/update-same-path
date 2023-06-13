app.post("/updatesamepath", upload.single("pdf"), async (req, res, next) => {
    const obj = JSON.parse(JSON.stringify(req.body));
  
    if (req.file === undefined) {
      try {
        
        let data = await articles.findOneAndUpdate({ _id: new mongodb.ObjectId(req.query.id) }, obj );
  
        await connection.close();
  
        res.json({ message: "success" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "try again later" });
      }
    } else {
      try {
        
        const path = `public/uploads/${req.query.volume}/${req.query.issue}/${req.file.originalname}`;
        const url = `uploads/${req.query.volume}/${req.query.issue}/${req.file.originalname}`;
        obj.destination = path;
        obj.fileurl = url;
        obj.pdfdata = req.file;
  
      
        let data = await articles.findOneAndUpdate({ _id: new mongodb.ObjectId(req.query.id) }, obj );

  
        var oldfilePath = `public/uploads/${obj.volume}/${obj.issue}/${req.query.oldfile}`;
        fs.unlinkSync(oldfilePath);
        await connection.close();
  
        res.json({ message: "success" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "try again later" });
      }
    }
  });
