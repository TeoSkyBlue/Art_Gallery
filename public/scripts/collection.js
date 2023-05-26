
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


// search bar

// let searchBox = document.querySelector('#search-box');
// let images = document.querySelectorAll('.card-img-top');
// let removedCards = [];

// searchBox.oninput = () =>{
  
    // images.forEach(image => {
    //   let card = image.closest(".card");
    //   card.style.display = 'none';
    // });
    // let value = searchBox.value;
    // images.forEach(filter =>{
    //     let title = filter.alt;
    //     if(title.includes(value)){
    //       let card = filter.closest(".card");
    //       card.style.display = 'block';

    //     }
    //     if(searchBox.value == ''){
    //       let card = filter.closest(".card");
    //       card.style.display = 'block';

    //     }
    // });
    
    // let value = searchBox.value;
    // images.forEach(filter =>{
    //     let title = filter.alt;
    //     if(!title.includes(value)){
    //       let card = filter.closest(".card-content");
    //       removedCards.push(card);
    //       card.remove();
    //     }
    //     // if(searchBox.value == ''){
    //     //   let row = filter.closest(".row");
    //     //   removedCards.forEach(card => {
    //     //     row.appendChild(card);
    //     //   });
    //     // }
    // });
// };

// search filter

const optionMenu = document.querySelector(".filter-menu"),
       selectBtn = optionMenu.querySelector(".filter-btn"),
       options = optionMenu.querySelectorAll(".filter-option"),
       sBtn_text = optionMenu.querySelector(".filter-sBtn-text");
selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));   
    
options.forEach(option =>{
    option.addEventListener("click", ()=>{
        let selectedOption = option.querySelector(".option-text").innerText;
        sBtn_text.innerText = selectedOption;
        optionMenu.classList.remove("active");
    });
});



// pagination

let art_per_page=12;

function getPageList(totalPages, page, maxLength){
    function range(start, end){
      return Array.from(Array(end - start + 1), (_, i) => i + start);
    }
  
    var sideWidth = maxLength < 9 ? 1 : 2;
    var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;
  
    if(totalPages <= maxLength){
      return range(1, totalPages);
    }
  
    if(page <= maxLength - sideWidth - 1 - rightWidth){
      return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
    }
  
    if(page >= totalPages - sideWidth - 1 - rightWidth){
      return range(1, sideWidth).concat(0, range(totalPages- sideWidth - 1 - rightWidth - leftWidth, totalPages));
    }
  
    return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
}
  
function show(){
  var numberOfItems = $(".card-content .card").length;

  var limitPerPage = art_per_page; //How many card items visible per a page
  var totalPages = Math.ceil(numberOfItems / limitPerPage);
  var paginationSize = 7; //How many page elements visible in the pagination
  var currentPage;


  function showPage(whichPage){

    $("html, body").animate({ scrollTop: 0 }, 10);

    if(whichPage < 1 || whichPage > totalPages) return false;

    currentPage = whichPage;

    $(".card-content .card").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();

    $(".pagination li").slice(1, -1).remove();

    getPageList(totalPages, currentPage, paginationSize).forEach(item => {
      $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
      .toggleClass("on", item === currentPage).append($("<a>").addClass("page-link")
      .attr({href: "javascript:void(0)"}).text(item || "...")).insertBefore(".next-page");
    });

    $(".previous-page").toggleClass("off", currentPage === 1);
    $(".next-page").toggleClass("off", currentPage === totalPages);
    return true;
  }

  $(".pagination .list").append(
    $("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link").attr({href: "javascript:void(0)"}).text("Prev")),
    $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link").attr({href: "javascript:void(0)"}).text("Next"))
  );

  $(".card-content").show();
  showPage(1);

  $(document).on("click", ".pagination li.current-page:not(.on)", function(){
    return showPage(+$(this).text());
  });

  $(".next-page").on("click", function(){
    return showPage(currentPage + 1);
  });

  $(".previous-page").on("click", function(){
    return showPage(currentPage - 1);
  });
};
show();

// show art cards per page filter

const showMenu = document.querySelector(".show-menu"),
      showBtn = showMenu.querySelector(".show-btn"),
      show_options = showMenu.querySelectorAll(".show-option"),
      show_sBtn_text = showMenu.querySelector(".show-sBtn-text");
showBtn.addEventListener("click", () => showMenu.classList.toggle("active"));   
    
show_options.forEach(option =>{
    option.addEventListener("click", ()=>{
      art_per_page = option.querySelector(".option-text").innerText;
      show_sBtn_text.innerText = art_per_page;
      showMenu.classList.remove("active");
      show();
    });
});


// preview cards 

let cardBox = document.querySelectorAll('.card-content');
let previewBox = document.querySelectorAll('.card-preview');

cardBox.forEach(card => {
  const cards = card.querySelectorAll('.card-img-top');
  cards.forEach(card_img => {
    card_img.addEventListener('click', () => {
      let name = card_img.getAttribute('alt');
      previewBox.forEach(preview => {
        const previews = preview.querySelectorAll('.card-img-top');
        previews.forEach(preview_img => {
          if (name == preview_img.getAttribute('alt')){
              let closest_preview_container = preview_img.closest('.preview-container');
              closest_preview_container.classList.add('active');
          }
        });
      });
    });
  });
});

previewBox.forEach(preview =>{
  
  let closest_preview_container = preview.closest('.preview-container');

  closest_preview_container.onclick = () =>{
    let closest_preview_container = preview.closest('.preview-container');
    closest_preview_container.classList.remove('active');
  };
  preview.querySelector('.close').onclick = () =>{
    let closest_preview_container = preview.closest('.preview-container');
    closest_preview_container.classList.remove('active');
  };
});
