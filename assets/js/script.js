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

// Initial Values
var name = "";
var destination = "";
//var time = moment();
var time = "";
var frequency = "";
var minsaway = "";

var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
var currentTime = moment();
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
var remainder = diffTime % frequency;
var minsaway = frequency - remainder;
var nextTrain = moment().add(minsaway, "minutes");
var arrivalTime = moment(nextTrain).format("hh:mm")

/* $(".table > tbody").append("<tr><td>Long Island Rail Road</td><td>Penn Station</td><td>" + arrivalTime + "</td><td>" + frequency.val("5") + "</td><td>" + minsaway + "</td></tr>");
$(".table > tbody").append("<tr><td>Metro-North Railroad</td><td>Harlem</td><td>" + arrivalTime + "</td><td>" + frequency + "</td><td>" + minsaway + "</td></tr>");
$(".table > tbody").append("<tr><td>Virginia Railway Express</td><td>Virginia</td><td>" + arrivalTime + "</td><td>" + frequency + "</td><td>" + minsaway + "</td></tr>");
$(".table > tbody").append("<tr><td>Maryland Rail Commuter Service</td><td>Maryland</td><td>" + arrivalTime + "</td><td>" + frequency + "</td><td>" + minsaway + "</td></tr>");
$(".table > tbody").append("<tr><td>Amtrak</td><td>Raleigh</td><td>" + arrivalTime + "</td><td>" + frequency + "</td><td>" + minsaway + "</td></tr>"); */


// On Button Click
$("#submit").on("click", function (event) {


  event.preventDefault();
  

  // User Input
  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  time = $("#time-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
  var currentTime = moment().format('HH:mm');
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var remainder = diffTime % frequency;
  var minsaway = frequency - remainder;
  var nextTrain = moment().add(minsaway, "minutes");
  var arrivalTime = moment(nextTrain).format("hh:mm")

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
  $(".table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + arrivalTime + "</td><td>" + frequency + "</td><td>" + minsaway + "</td></tr>");

});
});