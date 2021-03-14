/*
    name: validDate function
    parameters: finish_date - a String value
    output: valid - a boolean value
*/
function validDate(finish_date) {
    var valid = true;

    // validating the XXXX-XX-XX format and the length
    if (finish_date[4] == "-"  && finish_date[7] == "-" && finish_date.length == 10) {
        // building two Date objects
        var checkDate = new Date(finish_date);
        var currDate = new Date(); 
        
        //validating that the given date is equal or after the current date
        if (checkDate >= currDate){
            
            return valid;
        }
        // if the date contain characters that are not positive numbers, or the date is older than the current date
        else {
            console.log("ERROR: Wrong input or the date is older than current day");
            valid = false;
        }
    }
    else {
        console.log("ERROR: Wrong input");
        valid = false;
    }        
}


/*
    name: validID function
    parameters: id - a String value
                idsArray - an object array, consisting of all ids placed in the todo table
    output: valid - a boolean value
*/

function validID(id, idsArray) {
    var valid = false;
    
    // validating that the id is a positive number, no need to check for float numbers because of 'auto increment' settings in mysql (id is always incremented by 1)
    if (parseInt(id) >0) {
        //validating that the id is found in the ids drom the todo table
        idsArray.forEach(function(row) {
            if (parseInt(row.todo_id) == parseInt(id)){
                valid = true;
            }
        })
    }
    else {
        console.log("ERROR: Please enter a valid positive number")
        
        return valid;
    }
    return valid;
}


/*
    name: validUpdate function
    parameters: validityObjectArray - an Object array consisting of (todo_id, assignee, description, finish_date) as keys,
                                      and their values as values
    output: query - a String value
*/
function validUpdate(validityObjectArray){
    var query = "";

    // split the object array into two arrays with the same size, one for keys and the othe one for values
    var keys = Object.keys(validityObjectArray);
    var values = Object.values(validityObjectArray);
    var checkDateValue = String(values[3]);
    
    // if the 'checkDateValue' (finish_date) not an empty value, validating its value, if not valid an emty query is returned
    if (checkDateValue != ""){
        _validDate = validDate(checkDateValue);
        if (_validDate == false){
            console.log("ERROR: Not valid date")
            
            return query;
        }
    }
    
    // deleting empty values from the arrays
    for (var i=0; i<values.length-1; i++) {
        if (values[i] == "") {
            values.splice(i, 1);
            keys.splice(i, 1);
        }
    }

    // if array length is more than 1 (in order to update, must have two value at least(id and another value)),  building the update query
    if (values.length > 1){
        loopQuery = ""
        
        for (var i=1; i<values.length; i++){
            // building the set values and variables
            loopQuery = loopQuery + String(keys[i]) + "='" + String(values[i]) + "', "
        }   
        // building the full query
        query = "UPDATE todo SET " + loopQuery + "WHERE todo_id='" + values[0] + "';";
        // fixing the query
        query = query.replace(", WHERE", " WHERE")
        
        return query;
    }
    else {
        console.log("ERROR: Empty update")
    }              
}


module.exports = { validID: validID,
                   validDate: validDate,
                   validUpdate: validUpdate,
                };