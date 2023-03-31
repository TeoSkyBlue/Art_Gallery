const observer=new IntersectionObserver((entries)=> {
    entries.forEach((entry) => {
        
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        }
    });
});

const borderElements=document.querySelectorAll('.border');
borderElements.forEach((el)=> observer.observe(el));