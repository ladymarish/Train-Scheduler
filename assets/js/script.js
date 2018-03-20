$( document ).ready(function() {

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBwPP-rmqchK52ElQ-5kWjG28ZU4L0IeI4",
  authDomain: "train-scheduler-a3cf4.firebaseapp.com",
  databaseURL: "https://train-scheduler-a3cf4.firebaseio.com",
  projectId: "train-scheduler-a3cf4",
  storageBucket: "train-scheduler-a3cf4.appspot.com",
  messagingSenderId: "1084749362911"
};

firebase.initializeApp(config);

var database = firebase.database();


// On Button Click
$("#submit").on("click", function(event) {

  event.preventDefault();
  
  // User Input
  var name = $("#name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var time = $("#time-input").val().trim();
  var frequency = $("#frequency-input").val().trim();


  var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
  var currentTime = moment().format('HH:mm');
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var remainder = diffTime % frequency;
  var minsaway = frequency - remainder;
  var nextTrain = moment().add(minsaway, "minutes");
  var arrivalTime = moment(nextTrain).format("HH:mm");

  // Push to the database
  database.ref().push({
    name: name,
    destination: destination,
    time: arrivalTime,
    frequency: frequency,
    minaway: JSON.stringify(minsaway),
    //dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  // Clear the form values
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

  // Saves the user entries
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var userName = childSnapshot.val().name;
  var userDestination = childSnapshot.val().destination;
  var userFirstTime = childSnapshot.val().time;
  var userFrequency = childSnapshot.val().frequency;
  var userMinsAway = childSnapshot.val().minaway;


  // Check entries
  console.log(userName);
  console.log(userDestination);
  console.log(userFirstTime);
  console.log(userFrequency);
  console.log(userMinsAway);


  // Populating the table columns
  $(".table > tbody").append("<tr><td>" + userName + "</td><td>" + userDestination + "</td><td>" + userFirstTime + "</td><td>" + userFrequency + "</td><td>" + userMinsAway + "</td></tr>");

});
});