"use strict";

// Available car models
let AvailableCarModel = {
    "Honda" : ["Honda1","Honda2","Honda3"],
    "Toyota" : ["Toyota1","Toyota2","Toyota3","Toyota4"],
    "Audi": ["Audi1","Audi2"],
    "Acura" :["Acura1","Acura2","Acura3"],
    "BMW" :["BMW1","BMW2","BMW3","BMW4","BMW5"]
}

// Available prices
let priceMapping = {
    "Honda1":30000,"Honda2":30000,"Honda3":30000,
    "Toyota1":30000,"Toyota2":30000,"Toyota3":30000,"Toyota4":30000,
    "Audi1":30000,"Audi2":30000,
    "Acura1":30000,"Acura2":30000,"Acura3":30000,
    "BMW1":30000,"BMW2":30000,"BMW3":30000,"BMW4":30000,"BMW5":30000,
}

// Available colors
let colorMapping = {"R":"Red","G":"Green","B":"Blue"}


// All the information about customer and the calculated total price will be saved in here
const customerInfo={};

let totalPrice = 0;

// adding self-validation method
jQuery.validator.addMethod( "validateAge", checkAge,"Please Enter Correct Age." );

function checkAge(value,element)
{
    // /^[Cc][Uu][Ss][Tt]\d{4}$/i.test("cust1234") example
    let age = value;
    let greaterThan18 = true;
    if(Number(age) < 18)
    {
        $("#ageInputID").val(18);
        greaterThan18 = false;
    }
    return this.optional(element)||greaterThan18;
}

$(document).ready(function() {
    $("#carModelInputIDLabel").hide();
    $("#carModelInputID").hide();
    $("#showInformationTable").hide();
    $("#companyInputID").on("change",changeCarModels);
    $("#carModelInputID").on("change",setCarPrice);
    //= changeCarModels;

    $("#carPurchaseFormID").validate({
        rules: {
            nameInput: {
                required: true,
                minlength: 2,
                maxlength:10,
                pattern: /[A-Z]+[a-z]+/
            },
            ageInput: {
                required: true,
                min: 18,
                max: 90,
                digits: true,
                validateAge: true
            },
            emailInput:{
                required: true
            },
            customerIDInput:{
                required: true,
                pattern: /^[Cc][Uu][Ss][Tt]\d{4}$/i
            }
        },
        messages: {
            nameInput: {
                required: "Please enter a name",
                minlength: "Please enter a valid name with at least 2 characters",
                maxlength: "Please enter a valid name within 10 characters",
                pattern: 'Your name should contain at least one uppercase and one lowercase letter'
            },
            ageInput: {
                required: "Please enter your age",
                min: "Minimum age should be 18",
                max: "Maximum age should be 90",
                digits: "Age must be a non-negative number",
                validateAge: "Age cannot be less than 18"
            },
            emailInput: {
                required: "Please enter a valid email "

            },
            customerIDInput: {
                required: "Please enter valid Customer ID",
                pattern: "Please follow the format cust####"
            },

        }
        // },
        // submitHandler: formHandler
    });

    // form-submit event handler
    $("#carPurchaseFormID").submit(function(event){
        event.preventDefault();
        saveCarInfo();
        showTables();
    });




});

// function formHandler(event)
// {
//     event.preventDefault();
//     saveCarInfo();
//     showTables();
// }


function changeCarModels()
{
    // alert(carCompany);
    let carCompany =  $("#companyInputID").val();
    $("#carModelInputIDLabel").show();
    $("#carModelInputID").show();
    $("#carModelInputID").empty();

    for (const elm of AvailableCarModel[carCompany])
    {
        let option = $("#carModelInputID").append("<option>"+elm+"</option>");
        option.attr("value",elm);
    }
}

function setCarPrice()
{
    let carCompany =  $("#carModelInputID").val();
    let price = priceMapping[carCompany];
    $("#priceInputID").val("$"+price);
}


function saveCarInfo()
{
    let name = $("#nameInputID").val();
    let email = $("#emailInputID").val();
    let age = $("#ageInputID").val();
    let customerID = $("#customerIDInputID").val();
    let carCompany = $("#companyInputID").val();
    let AvailableModel = $("#carModelInputID").val();
    let price =  $("#priceInputID").val();
    let selectedColor = colorMapping[colorChoice()];
    let priceNeg = $("#priceNegotiatedID").val();


    if(AvailableModel.length != 0 && customerID.length != 0)
    {
        customerInfo[customerID] = {
            custname: name,
            custemail: email,
            custage: age,
            custID: customerID,
            custcarCompany: carCompany,
            custCarmodel: AvailableModel,
            custselectedColor: selectedColor,
            custPrice: price,
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
        if($("#colour"+color+"ID").is(':checked'))
        {
            finalColor =  $("#colour"+color+"ID").val();
        }
    }
    return finalColor;
}


function showTables() {
    $("#showInformationTable").show();

    let lastElement = Object.keys(customerInfo)[Object.keys(customerInfo).length - 1];
    let totalBillforACustomer = calculateTotalBillCustomer(lastElement);
    // console.log(totalBillforACustomer);
    //
    if (lastElement) {
        let tableRow = "<tr><td>" + customerInfo[lastElement].custname + "</td>";
        tableRow += "<td>" + customerInfo[lastElement].custemail + "</td>";
        tableRow += "<td>" + customerInfo[lastElement].custID + "</td>";
        tableRow += "<td>" + customerInfo[lastElement].custcarCompany + "</td>";
        tableRow += "<td>" + customerInfo[lastElement].custCarmodel + "</td>";
        tableRow += "<td>" + customerInfo[lastElement].custselectedColor + "</td>";
        tableRow += "<td>" + customerInfo[lastElement].custPrice + "</td>";
        tableRow += "<td>" + "$"+totalBillforACustomer + "</td>";
        $("table tbody").append(tableRow);
    }

}

function calculateTotalBillCustomer(key)
{
    for(const customer in customerInfo)
    {
        if(customerInfo[key])
        {

            let rawPrice = customerInfo[key].custPrice;
            let finalPrice = rawPrice.replace(/[$,]+/g,"");
            totalPrice += Number(finalPrice);
        }
    }
    return totalPrice;
}





