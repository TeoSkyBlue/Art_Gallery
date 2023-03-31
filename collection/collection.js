



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

