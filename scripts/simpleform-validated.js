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
    document.getElementById("name").oninput = handleName;
}

function handleSubmission(event) {
    event.preventDefault();

    handleName();
}

function handleName() {
    let element = document.getElementById("name");
    if (element.value.trim() === "") {
        // alert("A name must be entered");
        document.getElementById("error").textContent = "Name field must not be blank";
        element.style.backgroundColor = "tomato";
    } else {
        // alert("Form data valid");
        document.getElementById("error").textContent = "";
        element.style.backgroundColor = "";
    }
}
