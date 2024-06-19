console.log('heyy');
var next=document.getElementById("next");
var form=document.getElementById("bottom");
var sbmt=document.getElementById("submit-btn");

next.addEventListener( "click", function(event){ 
    event.preventDefault();
    form.classList.remove("hide") ;
    sbmt.classList.remove("hide") ;
});