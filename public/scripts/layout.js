

const header_pages = document.querySelectorAll(".nav-link.link-dark.shadow-lg, #home");


for (header_page of header_pages){
    if (header_page.nodeName == "BUTTON"){
        header_page.addEventListener("mouseup", change_frame);
    }
}

function change_frame(e){
    item = e.currentTarget;
    let source = item.id;
    
    if(source =="#"){
        return
    }
    if(source === "home"){
        source = "home/home.html"
    }
    let iframe_item = document.querySelector("iframe");
    
    iframe_item.src = source;
    
}

