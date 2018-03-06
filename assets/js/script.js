
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


  var firstTimeConverted = moment(time, "hh:mm").subtract(1, "years");

  var currentTime = moment();

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  var remainder = diffTime % frequency;

  var tMinutesTillTrain = frequency - remainder;

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");



  // Push to the database
  database.ref().push({
    name: name,
    destination: destination,
    time: time,
    frequency: frequency,
    minutes_away: nextTrain,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  // Clear the form values
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

  // Populating the table columns
  $(".table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + time + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td></tr>");

});