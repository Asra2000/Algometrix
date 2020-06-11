var options = document.querySelectorAll(".options");
var button = $("button");
var nav = $("#nav");
var modal = document.querySelector('.modal');
var unanimated = document.querySelectorAll('.unanimated');
for(var i =0; i < button.length ;i++){
  button[i].addEventListener("click", function(){
    // console.log("button clicked");
     nav.toggleClass("hide");
  });
}
 for(var i=0; i< options.length; i++)
 {
   options[i].addEventListener("mouseover", function(){
     removeColor(i);
     this.classList.toggle("divColor");
     this.classList.toggle("zoom");
   });
 }

function removeColor(j){
   for(var i =0 ;i< options.length;i++)
   {
     if ( i!== j)
     options[i].classList.remove("divColor");
     options[i].classList.remove("zoom");
   }
}

unanimated.forEach(option =>{
  option.addEventListener('click', ()=>{
      modal.classList.toggle("hide");
  });
})

modal.addEventListener('click', ()=>{
  modal.classList.toggle('hide');
})