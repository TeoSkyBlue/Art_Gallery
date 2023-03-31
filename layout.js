

const header_pages = document.querySelectorAll(".nav-link.link-dark.shadow-sm, #visit");


for (header_page of header_pages){
    if (header_page.nodeName == "BUTTON"){
        console.log("in button");
        header_page.addEventListener("mouseup", change_frame);
    }
}

function change_frame(e){
    item = e.currentTarget;
    let source = item.id;
    console.log(source);
    if(source =="#"){
        return
    }
    if(source === "visit"){
        source = "visit/visit.html"
    }
    let iframe_item = document.querySelector("iframe");
    console.log(iframe_item);
    iframe_item.src = source;
    console.log(iframe_item.source);
}

