
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

// Initial Values
var name = "";
var destination = "";
var time = "";
var frequency = "";
var minsaway = "";

// On Button Click
$("#submit").on("click", function (event) {
  event.preventDefault();


  // User Input
  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  time = $("#time-input").val().trim();
  frequency = $("#frequency-input").val().trim();


  var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
  //console.log(firstTimeConverted.format("HH:mm"));
  //var currentTime = moment();
  var diffTime = moment().diff(firstTimeConverted, "minutes");
  var remainder = diffTime % frequency;
  var minsaway = frequency - remainder;
  var nextTrain = moment().add(minsaway, "minutes");

  // Push to the database
  database.ref().push({
    name: name,
    destination: destination,
    time: time,
    frequency: frequency,
    minaway: JSON.stringify(minsaway),
    //minaway: minsaway,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  // Clear the form values
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

  // Populating the table columns
  $(".table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + time + "</td><td>" + frequency + "</td><td>" + minsaway + "</td></tr>");

});