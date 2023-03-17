"use strict";

/*
    File:   simpleform.js
    Author: Michael Grzesina (cst000)
    Course: CWEB 190
    Date:   3/8/2019
    Purpose: 
*/

window.onload = init;

function init() {
    document.getElementById("simpleFormID").onsubmit = handleSubmission;
}

function handleSubmission(event) {
    // alert("Form submission activated");

    let elements = document.getElementById("simpleFormID").elements;
    let length = elements.length;
    let outputString = "";

    for (let i = 0; i < length; i++) {
        outputString += "Element " + i + " - Name: " + elements[i].name;
        outputString += ", Type: " + elements[i].type;
        outputString += ", Value: " + elements[i].value;
        outputString += "\n";
    }

    alert(outputString);
    console.log(outputString);

    event.preventDefault();
    //return false;
}