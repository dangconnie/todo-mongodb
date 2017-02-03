var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
// mongo url connect formula: protocol://host:portNumber/DatabaseName
//using the terminal, created this dcClass database
var mongoConnectUrl = "mongodb://localhost:27017/dcClass"

// Make a global for a place to stash our db connection
var db;


//This code(mongoClient) only runs when the server starts. It only runs once.
mongoClient.connect(mongoConnectUrl, (error, database)=>{
	db = database;
})


/* GET home page. */
router.get('/', function(req, res, next) {
	db.collection('students').find({}).toArray((error, studentResults)=>{
		console.log(studentResults);
		res.render('index', { students: studentResults });
	});
});

//Adding new students
router.get('/addNew',(req,res,next)=>{
	res.render('addNew', {});
});

//This will insert newStudentName into this database that we've created and connected to
router.post('/addNew',(req, res, next)=>{
	//Get name out of body using parser
	var newStudentName = req.body.newStudentName;
	//insert new student
	db.collection('students').insertOne({
		name: newStudentName,
		cohortDate: 2017
	});
	//call this when name is inserted and it passes on to the home page
	res.redirect('/');
});


module.exports = router;
