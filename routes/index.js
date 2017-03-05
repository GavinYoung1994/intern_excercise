// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'fling.seas.upenn.edu',
  user     : 'zhenghao',
  password : '1994112134',
  database : 'zhenghao'
});

// This function finds all the clients in the database
function query_person(res){
	query = "SELECT * FROM person";
	connection.query(query, function(err, rows, fields){
		if(err) console.log(err);
		else {
			output_person(res, rows);
		}
	})
}

// This function returns the remaining balance of the month and account specified by the user
function query_transaction(res, account_name, account_type, month){
	if(month == 10){
		// If the user wants to see the ending balance of month 10, simply find all transactions in month 10
		query = "SELECT * FROM trans WHERE account_num = " + account_name + ' AND account_type = "' + account_type + '" AND MONTH(transaction_date) = ' + month;
	}else if(month == 11){
		// If month 11, then finds all records related to that account
		query = "SELECT * FROM trans WHERE account_num = " + account_name + ' AND account_type = "' + account_type + '"';
	}else{
		result = "Data not available";
	}
	connection.query(query, function(err, rows, fields){
		if(err) console.log(err);
		else {
			// calculate the remaining balance based on the records returned by the query
			result = rows.reduce(function(acc, val){
				console.log(acc,val.amount);
				return acc+val.amount;
			},0)
			result = "$"+result.toFixed(2);
			output_transaction(res, result);
		}
	})
}

function output_person(res, results) {
	res.render('index.jade',
		{
			title: "Please select to see corresponding balance information",
			results: results
		}
	);
}

function output_transaction(res, results){
	res.render('balance.jade',
		{
			title: "This is the ending balance of your inquiry",
			results: results
		}

	);
}

// These two functions will be called when a GET request is received
exports.do_work = function(req, res){
	query_person(res);
}

exports.transaction = function(req, res){
	query_transaction(res, req.query.account_name, req.query.account_type,req.query.month);
}
