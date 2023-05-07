



const cards = document.querySelectorAll(".card");
//cards.addEventListener("mouseover", bring_to_focus);
const card_texts = document.querySelectorAll(".text-truncate-container");



for (card of cards){
    
    card.addEventListener("mouseover", bring_img_in_focus);
    card.addEventListener("mouseout", get_img_out_of_focus);
}


for (card_text of card_texts){
    card_text.addEventListener("mouseover", bring_txt_in_focus);
    card_text.addEventListener("mouseout", get_txt_out_of_focus);
}


function bring_img_in_focus(event){
    item = event.currentTarget;
    item.classList.add("focused-content");
    
    //myWindow.blur();
}

function get_img_out_of_focus(event){
    item = event.currentTarget;
    if (item.classList.contains("focused-content")){
        item.classList.remove("focused-content");
    }
    
}


function bring_txt_in_focus(event){
    item = event.currentTarget;
    try{
        item.classList.contains("text-truncate-container");
    }catch(error){
        return
    }
    item.classList.remove("text-truncate-container");
    item.firstElementChild.classList.add("text-truncate-container-focused");
}

function get_txt_out_of_focus(event){
    item = event.currentTarget;
    try{
        item.classList.contains("text-truncate-container-focused");
    }catch(error){
        return
    }
    item.firstElementChild.classList.remove("text-truncate-container-focused");
    item.classList.add("text-truncate-container");
}


let searchBox = document.querySelector('#search-box');
let images = document.querySelectorAll('.card img');

searchBox.oninput = () =>{
    images.forEach(hide => hide.style.display = 'none');
    let value = searchBox.value;
    images.forEach(filter =>{
        let title = images.alt
        if(value == title){
            filter.style.display = 'block';
        }
        if(searchBox.value == ''){
            filter.style.display = 'block';
        }
    });
};

const optionMenu = document.querySelector(".select-menu"),
       selectBtn = optionMenu.querySelector(".select-btn"),
       options = optionMenu.querySelectorAll(".option"),
       sBtn_text = optionMenu.querySelector(".sBtn-text");
selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));   
    
options.forEach(option =>{
    option.addEventListener("click", ()=>{
        let selectedOption = option.querySelector(".option-text").innerText;
        sBtn_text.innerText = selectedOption;
        optionMenu.classList.remove("active");
    });
});