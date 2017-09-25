"use srict";

(function() {
	const mongodb = require('mongodb');
	const MongoClient = mongodb.MongoClient;

	const mongoConnected = (error, db) => {    
	  if (error) console.dir(error);         
	  db.close();    
	  console.log('Finished!');
	}; 

	const main = () => {    
	  MongoClient.connect('mongodb://localhost', mongoConnected);
	};
	console.log(MongoClient);
	main();
}());
