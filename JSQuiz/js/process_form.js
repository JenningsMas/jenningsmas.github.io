//Jennings Mas
//Form Validation
window.addEventListener('load', startup, false);

function startup() { //wait for the form to load before we do anything

    //locate the form + survey questions
    const theForm = document.forms[0];
    const q1 = document.getElementsByName("q1");
    const q2 = document.getElementsByName("q2");
    const q3 = document.getElementsByName("q3");
    const q4 = document.getElementsByName("q4");
    const q5 = document.getElementsByName("q5");

    //locate person info fields
    const fnameLoc = document.getElementById("fname");
    const lnameLoc = document.getElementById("lname");
    const emailLoc = document.getElementById("email");
    const phoneLoc = document.getElementById("phone");
    const siteLoc = document.getElementById("website");

    //create eventlisteners for hints + validation
    fnameLoc.addEventListener("focus", () => focus(event));
    lnameLoc.addEventListener("focus", () => focus(event));
    emailLoc.addEventListener("focus", () => focus(event));
    phoneLoc.addEventListener("focus", () => focus(event));
    siteLoc.addEventListener("focus", () => focus(event));

    fnameLoc.addEventListener("blur", () => blur(event));
    lnameLoc.addEventListener("blur", () => blur(event));
    emailLoc.addEventListener("blur", () => blur(event));
    phoneLoc.addEventListener("blur", () => blur(event));
    siteLoc.addEventListener("blur", () => blur(event));

    //Focus and blur functions
    function focus(event) {
        event.currentTarget.nextElementSibling.style.visibility = "visible";
    }

    function blur(event) {
        event.currentTarget.nextElementSibling.style.visibility = "hidden";
        validateData(); //calls to check for errors. THis function wont do anything with the value returned.
    }

    // set up error type var
    var errorType;

    //also locate where badges + text go
    var badgeLoc = document.getElementById("badge");
    var badgeTextLoc = document.getElementById("badgeText");

    //Create variables to store validation info
    var isApollyon;
    var isSafe;
    var isEuclid;
    var isKeter;
    var isThaumiel;

    //Create an array that stores the location of our badges. Also make an array to store the absolute link
    const badges = ["img/apollyon.png", "img/safe.png", "img/euclid.png", "img/keter.png", "img/thaum.png"];
    const badgeLink = ["https://students.gaim.ucf.edu/~je296071/dig3716c/assignment2/img/apollyon.png", "https://students.gaim.ucf.edu/~je296071/dig3716c/assignment2/img/safe.png", "https://students.gaim.ucf.edu/~je296071/dig3716c/assignment2/img/euclid.png", "https://students.gaim.ucf.edu/~je296071/dig3716c/assignment2/img/keter.png", "https://students.gaim.ucf.edu/~je296071/dig3716c/assignment2/img/thaum.png"]
    var badgeLinkAp;

    //Create our regex for personal info validation
    const isntBlank = /^.*\S.*/;
    const nameRegex = /^[A-Z][a-zA-Z]+$/; //Any series of letters, no special characters, must start with a capital letter.
    const lnameRegex = /^[a-zA-Z ,.'-]+$/; //Any series of letters, some special characters allowed (, ' and - and .)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //must contain string + @string.domain
    const phoneRegex = /^\d{3} \d{3}-\d{4}$/; //xxx xxx-xxxx
    const webRegex = /^[\w.-]+\.[a-zA-Z]{2,20}(\/.*)?$/; //must be domain structured

    //badge creation function
    function assignObjectClass() { //sequentially check questions that are mutually exclusive
        if (isApollyon) { //If the object is apollyon, nothing else matters. Return address 0
            return 0;
        }
        else if (isThaumiel) { //same case as apollyon. Thaumiel overides. Return address 4
            return 4;
        }
        else if (isKeter) { //keter overrides euclid and safe
            return 3;
        }
        else if (isEuclid) { //euclid overwrites safe
            return 2;
        }
        else if (isSafe) { //safe only if nothing else overrides
            return 1;
        }
        else { //catastrophic error catch
            console.log("Something went wrong in assignObjectClass")
        }
    }

    function validateData() {
        //PERSON INFO VALIDATION
        //set error count. If this is greater than 0, return false
        var errorCount = 0;

        //grab values
        var fnameInput = fnameLoc.value;
        var lnameInput = lnameLoc.value;
        var emailInput = emailLoc.value;
        var phoneInput = phoneLoc.value;
        var siteInput = siteLoc.value;

        //check our info against our regex
        if (!nameRegex.test(fnameInput) || !isntBlank.test(fnameInput)) {
            errorCount++;
            fnameLoc.style.backgroundColor = "#e86666";
            document.getElementById("fnameError").style.display = "block";
            document.getElementById("fnameSuc").style.display = "none";
        }
        else {
            fnameLoc.style.backgroundColor = "white";
            document.getElementById("fnameError").style.display = "none";
            document.getElementById("fnameSuc").style.display = "block";
        }
        if (!lnameRegex.test(lnameInput) || !isntBlank.test(lnameInput)) {
            errorCount++;
            lnameLoc.style.backgroundColor = "#e86666";
            document.getElementById("lnameError").style.display = "block";
            document.getElementById("lnameSuc").style.display = "none";

        }
        else {
            lnameLoc.style.backgroundColor = "white";
            document.getElementById("lnameError").style.display = "none";
            document.getElementById("lnameSuc").style.display = "block";
        }
        if (!emailRegex.test(emailInput) || !isntBlank.test(emailInput)) {
            errorCount++;
            emailLoc.style.backgroundColor = "#e86666";
            document.getElementById("emailError").style.display = "block";
            document.getElementById("emailSuc").style.display = "none";

        }
        else {
            emailLoc.style.backgroundColor = "white";
            document.getElementById("emailError").style.display = "none";
            document.getElementById("emailSuc").style.display = "block";

        }
        if (!phoneRegex.test(phoneInput) || !isntBlank.test(phoneInput)) {
            errorCount++;
            phoneLoc.style.backgroundColor = "#e86666";
            document.getElementById("phoneError").style.display = "block";
            document.getElementById("phoneSuc").style.display = "none";

        }
        else {
            phoneLoc.style.backgroundColor = "white";
            document.getElementById("phoneError").style.display = "none";
            document.getElementById("phoneSuc").style.display = "block";

        }
        if (!webRegex.test(siteInput) || !isntBlank.test(siteInput)) {
            errorCount++;
            siteLoc.style.backgroundColor = "#e86666";
            document.getElementById("websiteError").style.display = "block";
            document.getElementById("siteSuc").style.display = "none";

        }
        else {
            siteLoc.style.backgroundColor = "white";
            document.getElementById("websiteError").style.display = "none";
            document.getElementById("siteSuc").style.display = "block";

        }

        console.log("Errors: " + errorCount);
        //check for errors
        if (errorCount <= 0) {
            errorCount = 0;
            return true;
        }
        else if (fnameInput === "" || lnameInput === "" || emailInput === "" || phoneInput === "" || siteInput === "") { //Anything blank? If yes, regardlesss of error count, we cannot proceede.
            errorCount = 0;
            errorType = "blank";
            return false;
        }
        else {
            errorCount = 0;
            errorType = "incor";
            return false;
        }
    }

    function objEval() {
        //OBJECT CLASS EVALUATION
        console.log("Validation Debug:");
        if (q1[0].checked == true) { //question 1: determines if object is safe or Euclid
            isSafe = false;
            isEuclid = true;
            console.log("q1 yes")
        }
        else if (q1[1].checked == true) {
            isSafe = true;
            isEuclid = false;
            console.log("q1 no");
        }

        if (q2[0].checked == true) { //question 2: flavor. Does nothing
            console.log("q2 yes")
        }
        else if (q2[1].checked == true) {
            console.log("q2 no");
        }

        if (q3[0].checked == true) { //question 3: determines if object is keter
            isKeter = true;
            console.log("q3 yes")
        }
        else if (q3[1].checked == true) {
            isKeter = false;
            console.log("q3 no");
        }

        if (q4[0].checked == true) { //question 4: determines if object is apollyon
            isApollyon = false;
            console.log("q4 yes")
        }
        else if (q4[1].checked == true) {
            isApollyon = true;
            console.log("q4 no");
        }

        if (q5[0].checked == true) { //question 5: determines if object is thaumiel
            isThaumiel = true;
            console.log("q5 yes")
        }
        else if (q5[1].checked == true) {
            isThaumiel = false;
            console.log("q5 no");
        }

        console.log(isApollyon + " " + isSafe + " " + isEuclid + " " + isKeter + " " + isThaumiel);
    }

    theForm.addEventListener('submit', function (event) { //when submitted, run this function
        event.preventDefault(); //prevent page reload
        console.log(validateData());
        //Personal Info Validation. Info must be valid before proceding.
        if (validateData()) {
            objEval();

            while (badgeLoc.firstChild) { //obliterate any extra badges
                badgeLoc.removeChild(badgeLoc.lastChild);
            }
            while (badgeTextLoc.firstChild) { //obliterate any extra badge text
                badgeTextLoc.removeChild(badgeTextLoc.lastChild);
            }

            //Create elements and give them text. Helpful side effect of having line-breaks built in.
            fnameH = document.createElement("p");
            fnameH.textContent = "First Name: " + fnameLoc.value;
            lnameH = document.createElement("p");
            lnameH.textContent = "Last Name: " + lnameLoc.value;
            emailH = document.createElement("p");
            emailH.textContent = "Email: " + emailLoc.value;
            phoneH = document.createElement("p");
            phoneH.textContent = "Phone Number: " + phoneLoc.value;
            siteH = document.createElement("p");
            siteH.textContent = "Website: " + siteLoc.value;

            badgeLinkAp = document.createElement("a");
            badgeLinkAp.href = badgeLink[assignObjectClass()];
            badgeLinkAp.textContent = "Absolute Link: " + badgeLink[assignObjectClass()];

            var badgeRes = document.createElement('img');
            badgeRes.src = badges[assignObjectClass()]; //retrive badge path from array
            badgeRes.width = '200'; //size control
            badgeRes.height = '200';
            badgeTextLoc.append(fnameH); //append text to text div

            badgeTextLoc.append(lnameH);

            badgeTextLoc.append(emailH);

            badgeTextLoc.append(phoneH);

            badgeTextLoc.append(siteH);

            badgeTextLoc.append(badgeLinkAp); //abs link

            badgeLoc.append(badgeRes); //append img to img div
        }
        else {
            switch (errorType) { //depending on type of error set in validateData(), alert with a unique error message
                case "blank":
                    alert("Please fill out all fields");
                    break;
                case "incor":
                    alert("Please correct errors before submitting");
                    break;
                default:
                    alert("Unknown error. Something catastrpohic has occured.");
                    break;
            }

        }
    });
}

