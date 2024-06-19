var sidebarLinks = document.querySelectorAll('.sidebar a');
var matches=document.getElementById('matches');
var findBtn=document.getElementById('find');
console.log(matches);   

function addActive(event){
    event.preventDefault();

    // Remove 'active' class from all <a> elements within .sidebar
    sidebarLinks.forEach(function(link) {
        link.classList.remove('active');
    });

    // Add 'active' class to the clicked <a> element
    this.classList.add('active');
}
sidebarLinks.forEach(function(link) {
    link.addEventListener('click', addActive);
});

findBtn.addEventListener('click',(event)=>{
    console.log('fgh');
    event.preventDefault();
    matches.classList.remove('hide');
})