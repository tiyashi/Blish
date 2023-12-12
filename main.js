//Refering to the DOM elements 
// Hotel Booking DOM Elements

const nameInput = document.getElementById("fullName");
const countryInput = document.getElementById("country");
const hotelTypeInput = document.getElementById("hotelType");
const numOfRoomsInput = document.getElementById("numOfRooms");
var roomTypeInput = document.getElementsByName("roomType");
const childrenInput = document.getElementById("children");
const adultsInput = document.getElementById("adults");
const extraInput = document.getElementsByName("extraRequirements");
const kidCostInput = document.getElementsByName("kidCost");
var promoInput = document.getElementById("promo");
const costInput = document.getElementById("currentCost");

const hotelBtn = document.getElementById("hotelBtn");
const outputText1 = document.getElementById("output1");
const overallButtonInput = document.getElementById("overallButton");


//Adding the event listners to the code

hotelBtn.addEventListener("click", finalizeBooking);
roomTypeInput.forEach(item => item.addEventListener("change", changeRoom));
extraInput.forEach(item => item.addEventListener("change", changeExtra));
kidCostInput.forEach(item => item.addEventListener("change", changeKidCost));
overallButtonInput.addEventListener("click", overallFunction);

// declaring the variables
let numOfRooms;
let total;
let room;
let roomCost;
let extraCost;
let kidCost;
let selectedHotel;
let adjustedTotalCost;
let loyaltyPoints;
let name;


// Functions of the Event Listeners

function initialize_hotel() {
    total = 0;
    numOfRooms = 1;
    loyaltyPoints = 0;
    room = "";
    roomCost = 0;
    extraCost = 0;
    kidCost = 0;
    hotelBtn.disabled = true;
    selectedHotel = "";
    adjustedTotalCost = 0;
    name = "";
}


function finalizeBooking(event) {

    event.preventDefault();


    name = nameInput.value;
    let country = countryInput.value;
    selectedHotel = hotelTypeInput.options[hotelTypeInput.selectedIndex].value;

        // getting the value for the selected room by the customer
        var hotelRoom = "";

        for(var i=0; i< roomTypeInput.length; i++) {
            if (roomTypeInput[i].checked) {
                hotelRoom += roomTypeInput[i].value;
                break;
            }

        }
    
    numOfRooms = numOfRoomsInput.value;
    numOfChildren = childrenInput.value;
    numOfAdults = adultsInput.value;

    if (numOfRooms > 3){
        loyaltyPoints = 20 * numOfRooms;
    }
    localStorage.setItem("loyaltyPoints", `${loyaltyPoints}`);



    let finalPrize = ((roomCost * numOfRooms) + (kidCost * numOfChildren)) + extraCost;

        // promo code section

        var promoCode = promoInput.value;
        var discount = 0;
        
        if (promoCode === "Promo123") {
            discount = 5;
        } else if (promoCode !== "") {
            window.alert("The promo code you entered is not valid. Please try again!")
            promoInput.value = "";
            return;
        }

        adjustedTotalCost = finalPrize - (finalPrize * (discount / 100));



    outputText1.innerText = ` Hi ${name}, \n
    Your reservation at ${selectedHotel} has been confirmed. Please find your details below. 
    Number of Rooms : ${numOfRooms}
    Loyalty Points Earned : ${loyaltyPoints}
    Total Cost : LKR ${adjustedTotalCost} `

    // Values are set to 0 after 'Book Hotel' button is clicked.
    nameInput.value = "";
    countryInput.value = "";
    hotelTypeInput.value = "Hotel Branch";

    for (var i=0; i<roomTypeInput.length; i++) {
        roomTypeInput[i].checked = false;
    }

    numOfRoomsInput.value = 1;
    childrenInput.value = 0;
    adultsInput.value = 0;

    extraInput.forEach(function(extraInput){
        extraInput.checked = false;
    });

    promoInput.value = "";

    kidCostInput.forEach(function(kidCostInput){
        kidCostInput.checked = false;
    });

    costInput.innerText = `${adjustedTotalCost}`;
    
}

    

function changeRoom() {
    hotelBtn.disabled = false;
    if(this.value =="Single"){
        roomCost = 25000;
        room= "Single";
    } else if(this.value =="Double"){
        roomCost = 35000;
        room= "Double";
    } else {
        roomCost = 40000;
        room= "Triple";
    }

    total = roomCost + extraCost + kidCost;
    costInput.innerText = ` ${total}`;
}

function changeExtra() {
    if(this.value =="extraBed"){
        if(this.checked) {
        extraCost += 8000;
    } else {
        extraCost-= 8000;
    }

    }  

    total = roomCost + extraCost + kidCost; 
    costInput.innerText = ` ${total}`
}


function changeKidCost() {
    if(this.value =="yesKidCost"){
        if(this.checked) {
        kidCost += 5000;
    } else {
        kidCost -= 5000;
    }

    }  

    total = roomCost + extraCost + kidCost; 
    costInput.innerText = ` ${total}`
}


initialize_hotel();



// Adventure Booking DOM Elements

const nameAdventureInput = document.getElementById("fullNameAdventure");
const countryAdventureInput = document.getElementById("countryAdventure");
const childrenAdventureInput = document.getElementById("childrenAdventure");
const adultsAdventureInput = document.getElementById("adultsAdventure");
const adventureTypeInput = document.getElementById("adventureType");
const guideInput = document.getElementsByName("guideRequirementsCost");
const adventureBookBtn = document.getElementById("adventureBtn");
const adventureCostInput = document.getElementById("currentAdventureCost");
const outputText2 = document.getElementById("output2");


// Advance Features DOM Elements ('Add to Favourites' & 'Check Loyalty' Buttons)
const favoritesInputBtn = document.getElementById("addToFavouritesBtn");
const loyaltyCheckBtn = document.getElementById("checkLoyaltyBtn");

// Loyalty Output
const loyaltyPointsResultOutput = document.getElementById("loyaltyPointsResult");
// overall Output
const output1 = document.getElementById("output-1");

//Adding the event listners to the code


adventureBookBtn.addEventListener("click",finalizeAdventure);
loyaltyCheckBtn.addEventListener("click", checkLoyalty);
favoritesInputBtn.addEventListener("click", bookingFavourite);

// variables 
let totalAmount;
let adventureName;
let adventureCountry;
let selectedAdventure;
let adventureChildrenInput;
let adventureAdultsInput;
let totalAdventureCost;
let guideCost;

//function

function initialize_adventure(){
    totalAmount = 0;
    guideCost = 0;
    numberOfChildren = 0;
    numberOfAdults = 0;
    totalAdventureCost = 0;
    adventureName = "";
    adventureCountry = "";
    selectedAdventure = "";
    adventureChildrenInput = "";  
    adventureAdultsInput = "";
}

function finalizeAdventure(event){
    event.preventDefault();


    adventureName = nameAdventureInput.value;
    adventureCountry = countryAdventureInput.value;
    selectedAdventure = adventureTypeInput.options[adventureTypeInput.selectedIndex].value;
    adventureChildrenInput = childrenAdventureInput.value;
    adventureAdultsInput = adultsAdventureInput.value;

    let divingForAdults;
    let divingForKids;
    let adultDivingCost = 0;
    let kidDivingCost = 0;

    if(adventureCountry === "Sri Lanka") {
        divingForAdults = 5000;
        divingForKids = 2000;
    } else {
        divingForAdults= 10000;
        divingForKids = 5000;
    }

    adultDivingCost = divingForAdults;
    kidDivingCost = divingForKids;

    totalAdventureCost = (adultDivingCost * adventureAdultsInput) + (kidDivingCost * adventureChildrenInput) + guideCost; 

    outputText2.innerText = ` ${totalAmount}`
    window.alert(`${adventureName}'s Adventure Details are Displayed Below.
    Country : ${adventureCountry}
    Adventure Type : ${selectedAdventure}
    Number of Children : ${adventureChildrenInput}
    Number of Adults : ${adventureAdultsInput}
    Total :  ${totalAdventureCost}`);
}

function changeGuideCost() {
    
    if(this.value =="adultGuideCost"){
        if(this.checked) {
        guideCost += 1000;
    } else {
        guideCost -= 1000;
        }
    } else {
        if(this.checked) {
        guideCost += 500;
    } else {
        guideCost-= 500;
    }

    }

    totalAmount = guideCost;
    adventureCostInput.innerText = ` ${totalAmount}`
}

function checkLoyalty(){
    let getLoyaltyPoints = localStorage.getItem("loyaltyPoints");

    loyaltyPointsResultOutput.innerText = `Loyalty Points ${getLoyaltyPoints}`;
}
function bookingFavourite(){
    localStorage.setItem("name", `${name}`);
    localStorage.setItem("selectedHotel", `${selectedHotel}`);
    localStorage.setItem("numOfRooms", `${numOfRooms}`);
    localStorage.setItem("adjustedTotalCost", `${adjustedTotalCost}`);
    localStorage.setItem("adventureName", `${adventureName}`);
    localStorage.setItem("adventureCountry", `${adventureCountry}`);
    localStorage.setItem("selectedAdventure", `${selectedAdventure}`);
    localStorage.setItem("adventureChildrenInput", `${adventureChildrenInput}`);
    localStorage.setItem("adventureAdultsInput", `${adventureAdultsInput}`);
    localStorage.setItem("totalAdventureCost", `${totalAdventureCost}`);

}

function overallFunction(){
    output1.innerText = `
    Hi ${name}, \n
    Your reservation at ${selectedHotel} has been confirmed. Please find your details below. 
    Number of Rooms : ${numOfRooms}
    Loyalty Points Earned : ${loyaltyPoints}
    Total Cost : LKR ${adjustedTotalCost} 
    ${adventureName}'s Adventure Details are Displayed Below.
    Country : ${adventureCountry}
    Adventure Type : ${selectedAdventure}
    Number of Children : ${adventureChildrenInput}
    Number of Adults : ${adventureAdultsInput}
    Total :  ${totalAdventureCost}
    `
}

// function hotelBtn(){
//     finalizeBooking();
//     finalcalFunction();
//     popUpoutput.classList.toggle('active');


//     outputText1.innerText = `Order has been placed!!!
//      \n Order Details :
//       \n Room Type is ${room} The number of Rooms${numofRooms}
//        \n Room Cost is (Without promotions) ${roomcost}
//         \n Extra Requirements are ${extraRequirements}
//          \n Promotion Amount ${promoCost}
//           \n Final Cost Per day ${finalCost}
//            \n Adventure Cost is LKR ${advCost}
//             \n Total Payable (Including number of days) ${finalPayable}`;
//     outputText3.innerText = "";
//     outputText2.innerText = "

// initializing 

initialize_adventure();
