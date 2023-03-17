"use strict";

window.onload = init;

function init()
{
    document.getElementById("carPurchaseFormID").onsubmit = formSubmitEventHandler;
}

function formSubmitEventHandler(event){
    // alert("Form submission prevented");
    //we will capture all of the form element or take the values
    //then we will validate the elements based on the values

    let formElements = document.getElementById("carPurchaseFormID").elements;
    let formElementsLength = formElements.length;
    console.log("Number of Elements in the form: "+ formElementsLength)

    event.preventDefault();
}

function checkName()
{

}

function checkAge()
{

}