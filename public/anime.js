var sort = document.querySelectorAll('.sort');
var play = document.querySelector('.play');
var restart = document.querySelector('.restart');
var p = document.querySelector("#status");
var loop = $('.loop');
var outer = $('.outer');
var swap = $('.swap');
var total = 10;
var j = 1;
var flag = 0;
function ordercheck(i){
            outer.addClass('check')
            var temp1 = sort[i].getAttribute('value');
            var temp2 = sort[i+1].getAttribute('value');
            if(Number(temp1)> Number(temp2)){
                swap.addClass('inner');
                p.textContent = "Swapped as current value was greater than adjacent";
                sort[i].style.height = temp2+"px";
                sort[i+1].style.height = temp1+"px";
                sort[i].setAttribute('value', temp2);
                sort[i+1].setAttribute('value', temp1);
            }
            else{
                swap.removeClass('inner');
                p.textContent = "Compairing each pair";
            }
            }
play.addEventListener('click', ()=>{
    var i =0;
    total--;
    play.disabled = true;
    p.textContent = 'Incrementing value of i';
var interval = setInterval(()=>{
    loop.addClass('outline');
    outer.removeClass('check');
    p.textContent = "Compairing each pair";
    if(i<(sort.length-j))
    {
        loop.removeClass('outline');
        outer.addClass('check');

        anime({
            targets:[sort[i], sort[i+1]],
            duration: 100,
            borderRadius: 50,
            // Property Parameters
            easing: 'linear',
            // Animation Parameters
            direction: 'alternate',
            backgroundColor: '#ccc', 
            complete: ordercheck(i)
 
        });
    
       
    }
    else{
    clearInterval(interval);
    j++;
    // loop.removeClass('outline');
    outer.removeClass('check');
    swap.removeClass('inner');
    click();
    }
    i++;
}, 800);


});

function click(){
    if(total !== -1){
    sort[total].style.backgroundColor = "#DA4167";
    play.disabled = false;
    play.click();
    }
   else{
       play.disabled = false;
       p.textContent = "finished";
   }
}

restart.addEventListener('click', ()=>{
    location.reload();
    p.textContent = "Click play to start";
})

// ----------------------------------------------------


    


    $(document).keypress(function(e) {
       play.attr('disabled', 'true');
    });