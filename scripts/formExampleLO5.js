"use strict";


let AvailableCarModel = {
    "Honda" : ["Honda1","Honda2","Honda3"],
    "Toyota" : ["Toyota1","Toyota2","Toyota3","Toyota4"],
    "Audi": ["Audi1","Audi2"],
    "Acura" :["Acura1","Acura2","Acura3"],
    "BMW" :["BMW1","BMW2","BMW3","BMW4","BMW5"]
}

let colorMapping = {"R":"Red","G":"Green","B":"Blue"}

// name,dob,age,carCompany,AvailableModel,color,priceNeg
let customerInfo = [];


// window.onload = init;
//
// function init()
// {
//     $("#carModelInputIDLabel").hide();
//     $("#carModelInputID").hide();
//     $("#showInformationTable").hide();
//     document.getElementById("carPurchaseFormID").onsubmit = formSubmitEventHandler;
//     document.getElementById("nameInputID").onchange = checkName;
//     document.getElementById("ageInputID").onchange = checkAge;
// }

jQuery.validator.addMethod( "validateAge", checkAge,"Please Enter Correct Age" );

function checkAge(value,element)
{
    let dateAgeMatched = true;
    let dob = new Date($("#dobInputID").val());
    let now = new Date();
    let dobInYear = dob.getFullYear();
    let currentYear = now.getFullYear();
    let ageInYear = currentYear - dobInYear;
    let age = value;
    if(Number(age) !== ageInYear)
    {
        $("#ageInputID").val(0);
        dateAgeMatched = false;
    }
    return this.optional(element)||dateAgeMatched;
}

$(document).ready(function() {
    $("#carModelInputIDLabel").hide();
    $("#carModelInputID").hide();
    $("#showInformationTable").hide();


    $("#carPurchaseFormID").validate({
        rules: {
            nameInput: {
                required: true,
                minlength: 2,
                maxlength:10,
                pattern: /[A-Z]+[a-z]+/
            },
            dobInput: {
                required: true,
                date: true,
                //maxDate: new Date()
            },
            ageInput: {
                required: true,
                min: 1,
                max: 90,
                digits: true,
                validateAge: true
            }
        },
        messages: {
            nameInput: {
                required: "Please enter a name",
                minlength: "Please enter a valid name with at least 2 characters",
                maxlength: "Please enter a valid name within 10 characters",
                pattern: 'Your name should contain al least one uppercase and one lowercase letter'
            },
            dobInput: {
                required: "Please enter a date, it's required",
                date: "Please enter a valid date"
            },
            ageInput: {
                required: "Please enter your age",
                min: "Minimum age should be 18",
                max: "Maximum age should be 90",
                digits: "Age must be a non-negative number"
            }
        },
        submitHandler: formSubmitEventHandler
    });
});

function formSubmitEventHandler(event){


    // document.getElementById("nameInputID").onchange = changeCarModels;


    // alert("Form submission prevented");
    //we will capture all of the form element or take the values
    //then we will validate the elements based on the values

    // let formElements = document.getElementById("carPurchaseFormID").elements;
    // let formElementsLength = formElements.length;
    // let outputString ="";
    // let currentElement = null;
    // let currentElementJS =null;
    // let currentElementJQ = null;
    //
    //
    // // console.log("Number of Elements in the form: "+ formElementsLength)
    // for (let i = 0; i < formElementsLength; i++) {
    //     outputString += "Element " + i + " - Name: " + formElements[i].name;
    //     outputString += ", Type: " + formElements[i].type;
    //     outputString += ", Value: " + formElements[i].value;
    //     outputString += "\n";
    // }
    // console.log(outputString);
    //
    // outputString ="";
    //
    // currentElementJS = document.getElementById("nameInputID");
    // console.log(currentElementJS);
    // currentElementJQ = $("#nameInputID");
    // console.log(currentElementJQ)
    // outputString = "Using javascript dom"+"\n";
    // outputString += "Current value of current element: "+currentElementJS.value+"\n";
    // outputString += "Default value of current element: "+currentElementJS.defaultValue+"\n";
    // outputString += "Using jquery"+"\n";
    // outputString += "Current value of current element: "+currentElementJQ.val()+"\n";
    // outputString += "Default value of current element: "+currentElementJQ.defaultValue+"\n";
    //
    // outputString += "Color Element"+"\n";
    // if (document.getElementById("colourRedID").checked) {
    //     outputString += "Red";
    // } else if (document.getElementById("colourGreenID").checked) {
    //     outputString += "Green";
    // } else if (document.getElementById("colourBlueID").checked) {
    //     outputString += "Blue";
    // } else {
    //     outputString += "none";
    // }
    //
    // outputString += "\n"+"Default colour: ";
    // if (document.getElementById("colourRedID").defaultChecked) {
    //     outputString += "Red";
    // } else if (document.getElementById("colourGreenID").defaultChecked) {
    //     outputString += "Green";
    // } else if (document.getElementById("colourBlueID").defaultChecked) {
    //     outputString += "Blue";
    // } else {
    //     outputString += "none";
    // }
    // outputString += "\n";
    //
    // console.log(outputString);

    event.preventDefault();
    checkName();
    checkAge();
    saveCarInfo();
    showTables();

}

function saveCarInfo()
{
    let name = $("#nameInputID").val();
    let dob = $("#dobInputID").val();
    let age = $("#ageInputID").val();
    let carCompany = $("#companyInputID").val();
    let AvailableModel = $("#carModelInputID").val();
    let selectedColor = colorMapping[colorChoice()];
    let priceNeg = $("#priceNegotiatedID").val();

    if(AvailableModel !== "")
    {
        customerInfo[AvailableModel] = {
            custname: name,
            custdob: dob,
            custage: age,
            custcarCompany: carCompany,
            custCarmodel: AvailableModel,
            custselectedColor: selectedColor,
            custpriceNeg: priceNeg
        }
        console.log(customerInfo);
    }

}

function colorChoice()
{
    let colors = ["Red","Green","Blue"]
    let finalColor;
    for(const color of colors)
    {
        // alert(color);
        if($("#colour"+color+"ID").is(':checked'))
        {
            finalColor =  $("#colour"+color+"ID").val();
        }
    }

    return finalColor;
}


function showTables()
{
    $("#showInformationTable").show();
    if(customerInfo.length != 0)
    {
    //     custname: name,
    //     custdob: dob,
    //     custage: age,
    //     custcarCompany: carCompany,
    //     custCarmodel: AvailableModel,
    //     custselectedColor: selectedColor,
    //     custpriceNeg: priceNeg
        let element = customerInfo[customerInfo.length-1] ;
        alert(element);
        // let tableRow = "<tr><td>element.custname</td>";
        // tableRow += "<td>element.custname</td>";
        // tableRow += "<td>element.custname</td>";
        // tableRow += "<td>element.custname</td>";
        // tableRow += "<td>element.custname</td>";
        // tableRow += "<td>element.custname</td>";
        // tableRow += "<td>element.custname</td></tr>";
        // $("table tbody").append(tableRow);
    }
}

function changeCarModels(carCompany)
{
    // alert(carCompany);

    $("#carModelInputIDLabel").show();
    $("#carModelInputID").show();
    $("#carModelInputID").empty();
    // console.log(carCompany)

    for (const elm of AvailableCarModel[carCompany])
    {
        let option = $("#carModelInputID").append("<option>"+elm+"</option>");
        option.attr("value",elm);
    }
}

// function checkName()
// {
//     let name = $("#nameInputID").val();
//     if(name === "" || name===" ")
//     {
//         alert("Name cannot be empty")
//     }
// }

// function checkDOB()
// {
//     let dob = $("#dobInputID").val();
//     // alert(dob);
//     if(dob === "" || dob===" ")
//     {
//         alert("DOB cannot be empty")
//     }
//
//     //user cannot give input which will exceed today's date
//     //restrict user age based on DOB
// }

