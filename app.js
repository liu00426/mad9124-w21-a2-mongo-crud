"use strict";
// load dependencies
const express = require("express");
const Student = require('./models/student');
const Course = require('./models/course');

// create the express app
const app = express();

// configure express middleware
app.use(express.json());

/***************************************************************
 student
 ***************************************************************/
app.get("/api/student", (req, res) => {
  Student.find({}, (err, data)=> {
    res.send({data})
  })
});

app.get("/api/student/:studentId", (req, res) => {
  Student.find({_id:req.params.studentId}, (err, data)=> {
    res.send({data})
  })
});

app.post("/api/student", (req, res) => {
  const { firstName, lastName, nickName, email} = req.body;
  const newStudent = {
    firstName,
    lastName,
    nickName,
    email
  };
  Student.save(newStudent)
  res.status(201).send({ data: newStudent });
});

app.patch("/api/student/:studentId", (req, res) => {
  Student.find({_id:req.params.studentId}, (err, data)=> {
    if(data.length === 0){
      res.status(404).send({
        errors: [
          {
            status: "404",
            title: "Resource does not exist",
            description: `We could not find a student with id: ${id}`,
          },
        ],
      });
    }else {
      const { id, ...theRest } = req.body;
      Student.findByIdAndUpdate(req.params.studentId, theRest,(err1,data1)=>{
        res.send({ data1 });
      })
    }
  })
});

app.put("/api/student/:studentId", (req, res) => {
  Student.find({_id:req.params.studentId}, (err, data)=> {
    if(data.length === 0){
      res.status(404).send({
        errors: [
          {
            status: "404",
            title: "Resource does not exist",
            description: `We could not find a student with id: ${id}`,
          },
        ],
      });
    }else {
      const { firstName, lastName, nickName, email}  = req.body;
      const updatedStudent = { firstName, lastName, nickName, email} ;
      Student.findByIdAndUpdate(req.params.studentId,updatedStudent,(err1,ret)=>{
        res.send({ data:ret });
      })
    }
  })
});
app.delete('/api/student/:studentId', (req, res) => {
  Student.find({_id:req.params.studentId}, (err, data)=> {
    if(data.length === 0){
      res.status(404).send({
        errors: [
          {
            status: "404",
            title: "Resource does not exist",
            description: `We could not find a student with id: ${id}`,
          },
        ],
      });
    }else {
      Student.findOneAndRemove(req.params.studentId,(err,data)=>{
        res.send({ data });
      })
    }
  })
})

/***************************************************************
 course
 ***************************************************************/
app.get("/api/course", (req, res) => {
  Course.find({}, (err, data)=> {
    res.send({data})
  })
});

app.get("/api/course/:courseId", (req, res) => {
  Course.find({_id:req.params.courseId}, (err, data)=> {
    res.send({data})
  })
});

app.post("/api/course", (req, res) => {
  const { code, title, description, url,students} = req.body;
  const newCourse = {
    code,
    title,
    description,
    url,
    students
  };
  Student.save(newCourse)
  res.status(201).send({ data: newCourse });
});

app.patch("/api/course/:courseId", (req, res) => {
  Course.find({_id:req.params.courseId}, (err, data)=> {
    if(data.length === 0){
      res.status(404).send({
        errors: [
          {
            status: "404",
            title: "Resource does not exist",
            description: `We could not find a student with id: ${id}`,
          },
        ],
      });
    }else {
      const { id, ...theRest } = req.body;
      Course.findByIdAndUpdate(req.params.courseId,theRest,(err1,ret)=> {
        res.send({ data:ret });
      })
    }
  })
});

app.put("/api/course/:courseId", (req, res) => {
  Course.find({_id:req.params.courseId}, (err, data)=> {
    if(data.length === 0){
      res.status(404).send({
        errors: [
          {
            status: "404",
            title: "Resource does not exist",
            description: `We could not find a student with id: ${id}`,
          },
        ],
      });
    }else {
      const { firstName, lastName, nickName, email}  = req.body;
      const updatedStudent = { firstName, lastName, nickName, email} ;
      Course.findByIdAndUpdate(req.params.courseId,updatedStudent,(err1,ret)=>{
        res.send({ data:ret });
      })
    }
  })
});

app.delete('/api/course/:courseId', (req, res) => {
  Course.find({_id:req.params.courseId}, (err, data)=> {
    if(data.length === 0){
      res.status(404).send({
        errors: [
          {
            status: "404",
            title: "Resource does not exist",
            description: `We could not find a student with id: ${id}`,
          },
        ],
      });
    }else {
      Course.findOneAndRemove(req.params.courseId,(err1,ret)=>{
        res.send({ data:ret });
      })
    }
  })
})


// start listening for HTTP requests
const port = process.env.port || 3030;
app.listen(port, () => console.log(`Server listening on port ${port} ...`));
