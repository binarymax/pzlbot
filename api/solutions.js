var controller = require('../controllers/solutions');

var dt = require('heimdall').datatypes;

module.exports = {
    name: "solutions",
    description: "A resource for checking a solution",
    api: {
        ADD:{
            description:"Checks the solution of a puzzle",
            params:{
                id:dt.int32("The puzzle ID",true)
            },
            body:{
                solution:dt.string("The solution to check",true)
            },
            command: controller.Check
        }
    }
}