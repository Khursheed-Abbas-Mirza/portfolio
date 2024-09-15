let section=document.querySelectorAll("section");
let navLinks=document.querySelectorAll("header nav a");
try {
    window.onscroll=function(){
    section.forEach(sec=>{
        let top=window.scrollY;
        let offset=sec.offsetTop-300;
        let height=sec.offsetHeight;
        let id=sec.getAttribute("id");
        if(document.querySelector("header nav a[href*="+id+"]").classList==null){
            return 0
        }
        else{

            if(top>=offset && top<offset+height){
                navLinks.forEach(links=>{
                    links.classList.remove("active");
                    document.querySelector("header nav a[href*="+id+"]").classList.add("active");
                });
            }
        }
    });
}
} catch (error) {
    console
}
