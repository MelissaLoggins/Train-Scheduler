$(document).ready(function() { 

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDBCt45kn53tBpA4PA32ZuXkcVDXrNvlaM",
    authDomain: "train-scheduler-f6ff8.firebaseapp.com",
    databaseURL: "https://train-scheduler-f6ff8.firebaseio.com",
    storageBucket: "train-scheduler-f6ff8.appspot.com",
    messagingSenderId: "98588375073"
  };
  firebase.initializeApp(config);

  //Firebase reference.
  var database = firebase.database();

	$("#addTrain").on("click", function() {

  	//Get the values from the text box.
  	var trainName	= $("#trainNameInput").val().trim();
  	var destination = $("#destinationInput").val().trim();
  	var firstTrainTime = $("#firstTrainTimeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();
  	  console.log(trainName);
      console.log(destination);
      console.log(firstTrainTime);
      console.log(frequency);

    // Create temp train data
    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
    } 

    // Push to Firebase.
      database.ref().push(newTrain); 

    
  // Empty the form.
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainTimeInput").val("");
  $("#frequencyInput").val("");

    return false;
  });  

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    var newTrain = childSnapshot.val();
  	console.log("Previous Post ID: " + prevChildKey);
    var tFrequency = 15;
    var tFrequency = parseInt(newTrain.frequency);
    var firstTime = newTrain.firstTrainTime;

    // First Time (pushed back 1 year to make sure it comes before current time) 
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
      console.log(firstTimeConverted);

    var currentTime = moment();
      console.log("Current time: " + moment(currentTime).format("hh:mm"));
     
    var timeDiff = moment().diff(moment.utc(firstTimeConverted), "minutes");
      console.log("Time difference: " + timeDiff);  

    // Remainder
    var remainder = timeDiff % tFrequency;
      console.log(remainder);

    // Minutes away
    var tminutesTillTrain = tFrequency - remainder;
      console.log("Minutes Away: " + tminutesTillTrain); 

    // Next train
    var nextTrain = moment().add(tminutesTillTrain, "minutes");
      console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));

      console.log(newTrain.destination);

  $("#trainSchedule").append("<tr><td>" + newTrain.name + "</td><td>" + newTrain.destination + "</td><td>" + newTrain.firstTrainTime + "</td><td>" + newTrain.frequency + "min </td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tminutesTillTrain + "min" + "</td></tr>");  

});
});  


  

  

