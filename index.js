let music = new Audio('audio/music.mp3');
let ting = new Audio('audio/ting.mp3');
let gameover = new Audio('audio/gameover.mp3');
let error = new Audio('audio/error.mp3');
let count=0;

let turn="0";
let isgameover = false;

line = document.getElementsByClassName('line')[0];

boxes = document.querySelectorAll('.box');
let boxesArr = Array.from(boxes);

let player_info = document.getElementsByClassName('player-info')[0];

let moves = document.getElementsByClassName('move');
let movesArr = Array.from(moves);



// function to change the turn

function changeTurn()
{
    turn=="X"?turn="0":turn="X";
    player_info.innerHTML=`Turn for ${turn}`;
}





// function to check for win

function checkWin()
{
    let win_cases = [[0,1,2,0,5,0],[3,4,5,0,15,0],[6,7,8,0,25,0],[0,3,6,15,10,90],[1,4,7,15,0,90],[2,5,8,15,-10,90],[0,4,8,-5,15,45],[2,4,6,-5,15,-45]];

    win_cases.forEach(function(e)
    {
        if(moves[e[0]].innerHTML == moves[e[1]].innerHTML && moves[e[1]].innerHTML == moves[e[2]].innerHTML && moves[e[0]].innerHTML != "")
        {
            document.querySelectorAll('.win-anim img')[0].style.width='96px';
            isgameover = true;
            gameover.play();
            if(moves[e[0]].innerHTML=="0")
            {
                player_info.innerHTML="0 Won ✌️";
            }
            else
            {
                player_info.innerHTML="X Won ✌️";
            }


            if((e[0]==0 || e[0]==2) && (e[1]==4))
            {
                line.style.width='40vw';
                line.style.transform=`translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg) `;
                line.hidden=false;
            }
            else
            {
                line.style.transform=`rotate(${e[5]}deg) translate(${e[3]}vw,${e[4]}vw)`;
                line.hidden=false;
            }
        }
        else if(count==9)
        {
            gameover.play();
            isgameover = true;
            player_info.innerHTML = "Match Tie 😅";
        }
    })
}




// Main Logic
  
boxesArr.forEach(function(box)
{
    box.addEventListener('click',function()
    {
        if(!isgameover)
        {
            a = box.firstElementChild;

            if(a.innerHTML=="")
            {
                count++;
                a.innerHTML=turn;
                changeTurn();
                ting.play();
                checkWin();
            }
            else
            {
                wrong = document.getElementsByClassName('wrong-move')[0];
                wrong.hidden=false;
                error.play();
                setTimeout(function()
                {
                    wrong.hidden=true;
                },300);
            }
        }
    });
})




// Resetting the Game Logic

reset = document.getElementById('btn-reset');

reset.addEventListener('click',()=>
{
    movesArr.forEach((move)=>
    {
        move.innerHTML = "";
    })
    turn = "0";
    isgameover = false;
    line.hidden=true;

    document.querySelector('.win-anim img').style.width='0';
})