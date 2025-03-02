let ofertyPracy = document.querySelectorAll(".pracodawca")
let ofertyPracySection = document.querySelector(".pracodawca-sekcja")
let pracodawcyForm = document.querySelector("#centrum")
let pracodawcyInput = document.querySelector("#input")
let pracodawcyInputValue
let menuMobilne = document.querySelector(".mobilne-menu")

function pokazMenu(){
    menuMobilne.classList.toggle('menu-pokaz')
};
pracodawcyForm.addEventListener('keyup',function(e){
    e.preventDefault()
    pracodawcyInputValue = pracodawcyInput.value
    ofertyPracy.forEach(item => {
        console.log(item.textContent.trim().toLowerCase().includes(pracodawcyInputValue.toLowerCase()))
        if(item.textContent.trim().toLowerCase().includes(pracodawcyInputValue.toLowerCase())){
            console.log("hello?")
            item.style.display = "flex"
        }else{
            item.style.display = "none"
        }
    })
})