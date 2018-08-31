/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */
function classifier(input) {
  // Your code should go here.
  var groupedOutput = {};
  var sortedInput = inputWithAgeCalculated(input);
  if(input.length === 0) return {noOfGroups: 0}

  var grpCounter = 1;

  
  for (var i = 0; i < sortedInput.length;) {
    for(var j = 1; j <= 3 && i < sortedInput.length; j++){
      var currentGroup = "group" + grpCounter;
      groupedOutput[currentGroup] = groupedOutput[currentGroup] || {};
      var currentMembers = groupedOutput[currentGroup].members;
      if(currentMembers === undefined){
        groupedOutput[currentGroup] = {
          "members": [{"name": sortedInput[i].name, "age": sortedInput[i].age, "dob" : sortedInput[i].dob, "regNo": sortedInput[i].regNo}],
          "oldest": sortedInput[i].age,
          "sum": parseInt(sortedInput[i].age),
          "regNos": [parseInt(sortedInput[i].regNo)]
        };
        i++;
      }
      else if(currentMembers.length < 3 && (sortedInput[i].age - currentMembers[currentMembers.length - 1].age <= 5)){
        var regNos = groupedOutput[currentGroup].regNos;
        regNos.push(parseInt(sortedInput[i].regNo));
        regNos.sort(sortNumber);
        
        groupedOutput[currentGroup].members.push({"name": sortedInput[i].name, "age": sortedInput[i].age, "dob" : sortedInput[i].dob, "regNo": sortedInput[i].regNo});
        groupedOutput[currentGroup].oldest = Math.max(groupedOutput[currentGroup].oldest, sortedInput[i].age);
        groupedOutput[currentGroup].sum += parseInt(sortedInput[i].age);
        groupedOutput[currentGroup].regNos = regNos;
        i++;
      }
      else {
        grpCounter++;
      }
    }
  }
  groupedOutput.noOfGroups = grpCounter;
  return groupedOutput;
}


//Calculating age based on dob
function calculateAge(dob){
  var dob_date = new Date(Date.parse(dob));
  var parsedDOB = dob_date.getFullYear();
  return Math.abs(new Date().getFullYear() - parsedDOB);
}

//Sorting array based on age
function sortAgeInput(inputWithAge){
  return inputWithAge.sort(function(a, b) {
     var x = a.age; 
     var y = b.age;
     return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

function inputWithAgeCalculated(input){
  var ageInput = [];
  input.forEach(function(entry) {
    var singleInputWithAge = {};
    singleInputWithAge.name = entry.name;
    singleInputWithAge.dob = entry.dob;
    singleInputWithAge.age = calculateAge(entry.dob);
    singleInputWithAge.regNo = entry.regNo;
    ageInput.push(singleInputWithAge);
  });
  return sortAgeInput(ageInput);
}

function sortNumber(a,b) {
    return parseInt(a) - parseInt(b);
}

module.exports = classifier;
