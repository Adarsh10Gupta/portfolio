var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}


/*changing text function*/ 
const texts = ["Web Developer", "UI/UX Designer", "App Developer", "Content Creator", "Video Editor"];
let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {
    const textElement = document.getElementById("changing-text");

    if (!isDeleting && charIndex < texts[index].length) {
        currentText += texts[index][charIndex];
        charIndex++;
    } else if (isDeleting && charIndex > 0) {
        currentText = currentText.slice(0, -1);
        charIndex--;
    }

    textElement.textContent = currentText;

    if (charIndex === texts[index].length && !isDeleting) {
        isDeleting = true;
        setTimeout(typeEffect, 1000);
        return;
    }

    if (charIndex === 0 && isDeleting) {
        isDeleting = false;
        index = (index + 1) % texts.length;
    }
    const typingSpeed = isDeleting ? 100 : 150;
    setTimeout(typeEffect, typingSpeed);
}
typeEffect();



/*Sidemenu function*/
var sidemenu = document.getElementById("sidemenu");

function openmenu(){
    sidemenu.style.right = "0";
}
function closemenu(){
    sidemenu.style.right = "-200px";
}

