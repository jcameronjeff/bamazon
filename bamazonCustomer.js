var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    user: 'root',

    password: 'root',
    database: 'bamazon'
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected as id" + connection.threadId);
   start();
});
function start(){
inquirer.prompt([
    {
        name: "ready",
        type: "confirm",
        message: "Welcome to Bamazon! \nWould you like to browse through our products?"

    }
    ]).then(function(reply) {
        if (reply.ready){
            readProducts();
        }
        else{
            console.log("K Byeeee!");
        }
    });
};

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      for (var i = 0; i < res.length; i++) {
        console.log("\n -----------------------" +
        "\n Id " + res[i].id + 
        "\n Product: " + res[i].product_name + 
        "\n Price: " + res[i].price + " Credits" +
        "\n Department: " + res[i].department_name + 
        "\n Quantity In Stock: " + res[i].stock_quantity + 
        "\n -----------------------"
                     );
    }
     
    inquirer.prompt([

        {
            name: "choice",
            type: "list",
            choices: function() {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
                choiceArray.push(res[i].product_name);
            }
            return choiceArray;
            },
            message: "Select your Item"
        },
        {
            name: "howMany",
            type: "input",
            message: "how many would you like?"
        }

      // After the prompt, store the user's response in a variable called location.
      ]).then(function(answers) {
        var chosenItem;
;
        for (var i = 0; i < res.length; i++) {
            if (res[i].product_name === answers.choice) {
              chosenItem = res[i];
            }
          }
         
          if (parseInt(chosenItem.stock_quantity) < parseInt(answers.howMany)){
              console.log("Insufficient Quantity in Stock");
              start();
          }

          else{
              console.log(
                  "Congratulations! You are the proud new owner of: " + 
                  "\n" + answers.howMany + " " + chosenItem.product_name + "(s)" +
                  "\nTotal: " + parseInt(answers.howMany) * parseInt(chosenItem.price) + " Galactic Credits Standard"
                  
              );
              
                console.log("\n__________________________" + "\n Updating " + chosenItem.product_name + " quantity");
                var query = connection.query(
                  "UPDATE products SET ? WHERE ?",
                  [
                    {
                      stock_quantity: parseInt(chosenItem.stock_quantity) - 1
                    },
                    {
                     id: chosenItem.id
                    }
                  ],
                  function(err, result) {
                    if (err) throw err;
                    console.log(result.affectedRows + " products updated!\n");
                  
                  }
             
                );
                connection.end();
          }
      });
});
}


