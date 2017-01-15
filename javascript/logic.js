// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDBCt45kn53tBpA4PA32ZuXkcVDXrNvlaM",
    authDomain: "train-scheduler-f6ff8.firebaseapp.com",
    databaseURL: "https://train-scheduler-f6ff8.firebaseio.com",
    storageBucket: "train-scheduler-f6ff8.appspot.com",
    messagingSenderId: "98588375073"
  };
  firebase.initializeApp(config);
  var trainName;
  var destination;
  var firstTrainTime;
  var frequency;


  //the current time.
  var currentTime = moment();
 

  //Firebase reference.
  var database = firebase.database();

  // function-minutes away.
  function time(firstTrainTime, frequency) {
    firstTrainTime = moment(firstTrainTime, "HH:mm");
    frequency = parseInt(frequency);
    firstTrainDate = moment(firstTrainTime, "H mm");
    a = moment().diff(moment.utc(firstTrainDate), " minutes");
    b = a % frequency;
    c = frequency - b;

    return c;
  }

  // Submit event.
	$("#addTrain").on("click", function() {

  	//Get the values from the text box.
  	trainName	= $("#trainNameInput").val().trim();
  	destination = $("#destinationInput").val().trim();
  	firstTrainTime = $("#firstTrainTimeInput").val().trim();
  	frequency = $("#frequencyInput").val().trim();
  	console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);


    // Push to Firebase.
    database.ref().push({
    train: trainName,
    where: destination,
    time: firstTrainTime,
    when: frequency
    });

    
  // Empty the form.
  $("#trainNameInput").val(" ");
  $("#destination").val(" ");
  $("#firstTrainTime").val(" ");
  $("#frequency").val(" ");

  // that return false thing.
    return false;
  });  

  database.ref().on("child_added", function(childSnapshot) {
  	console.log(childSnapshot.val().name);

  $("#trainSchedule").append("<div class='well'><span> " + childSnapshot.val().name +
     " </span><span> " + childSnapshot.val().destination +
     " </span><span> " + childSnapshot.val().firstTrainTime + 
     " </span><span> " + childSnapshot.val().frequency + " </span></div>");

}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});	

  

  

  // that return false thing.

  // grab the info from Firebase

  // figure the minutes away the train is

  // append the data to the well

  // that function (errorObject) thing.
