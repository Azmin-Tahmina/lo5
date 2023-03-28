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


window.onload = init;

function init()
{
    $("#carModelInputIDLabel").hide();
    $("#carModelInputID").hide();
    $("#showInformationTable").hide();
    document.getElementById("carPurchaseFormID").onsubmit = formSubmitEventHandler;
    document.getElementById("nameInputID").onchange = checkName;
    document.getElementById("ageInputID").onchange = checkAge;
}


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

function checkName()
{
    let name = $("#nameInputID").val();
    if(name === "" || name===" ")
    {
        alert("Name cannot be empty")
    }
}

function checkDOB()
{
    let dob = $("#dobInputID").val();
    // alert(dob);
    if(dob === "" || dob===" ")
    {
        alert("DOB cannot be empty")
    }

    //user cannot give input which will exceed today's date
    //restrict user age based on DOB
}

function checkAge()
{
    let dob = new Date($("#dobInputID").val());
    let now = new Date();
    let dobInYear = dob.getFullYear();
    // alert(dobInYear);
    let currentYear = now.getFullYear();
    // alert(currentYear);
    let ageInYear = currentYear - dobInYear;
    // alert(ageInYear);
    let age = $("#ageInputID").val();
    if(age === "" || age===" ")
    {
        alert("Age cannot be empty")
    }
    else
    {
        if(Number(age) !== ageInYear)
        {
            alert('Enter Correct Age');
            $("#ageInputID").val(0);
        }
    }
}