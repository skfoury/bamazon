var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});
connection.connect(function (err) {
  if (err) throw err;
  printitems();
  itemquery();
});

function printitems() {
  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");
  });
}
function itemquery() {
  inquirer
    .prompt({
      name: "itemnumber",
      type: "input",
      message: "What is the ID of the product you'd like to buy?",
    })
    .then(function (answer) {
      selectedItem = connection.query("SELECT * FROM products WHERE ?", { item_id: answer.itemnumber }, function (err, res) {
      var chosenItem = res[0].item_id;
        console.log(
          "ID: " +
          res[0].item_id +
          " || Product Name: " +
          res[0].product_name +
          " || Department Name: " +
          res[0].department_name +
          " || Price: " +
          res[0].price +
          " || Stock Quantity: " +
          res[0].stock_quantity)
        inquirer
          .prompt({
            name: "itemquantity",
            type: "input",
            message: "How many of this item would you like to buy?",
          })
          .then(function (answer) {
            var itemsLeft = res[0].stock_quantity - answer.itemquantity;
            console.log(itemsLeft + " of this item left.");
            var updateQuantity = 'UPDATE bamazon.products SET stock_quantity = ' + itemsLeft + ' WHERE item_id = ' + chosenItem;
            connection.query(updateQuantity, function (err, res) {});
            var purchasePrice = res[0].price * answer.itemquantity;
            console.log("Total purchase price: " + purchasePrice);
            printitems();
            itemquery();
            if (res[0].stock_quantity < 0) {
              console.log("ERROR! Not enough of this item in stock!")
              printitems();
              itemquery();
            }
          });
      });
    })
}