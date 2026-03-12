let answer;
let turns=0;
const maxTurns=6;

const board=document.getElementById("board");
const guessInput=document.getElementById("guess-input");
const guessBtn=document.getElementById("guess-btn");

guessBtn.onclick=submitGuess;

const params=new URLSearchParams(window.location.search);
const list=params.get("list");
const mode=params.get("mode");

loadCharacters();

function loadCharacters(){

let script=document.createElement("script");

script.src=list+".js";

script.onload=startGame;

document.body.appendChild(script);

}

function startGame(){

if(mode==="random"){
answer=characters[Math.floor(Math.random()*characters.length)];
}

if(mode==="daily"){
let day=Math.floor(Date.now()/86400000);

if(localStorage.getItem(list+"_daily")==day){
alert("You already played today's daily.");
window.location="index.html";
return;
}

answer=characters[day%characters.length];
}

console.log(answer);

}

function submitGuess(){

if(turns>=maxTurns) return;

let name=guessInput.value.trim().toUpperCase();
let guess=characters.find(c=>c.name===name);

if(!guess){
alert("Invalid character");
return;
}

turns++;

displayGuess(guess);

if(guess.name===answer.name){
endGame(true);
return;
}

if(turns>=maxTurns){
endGame(false);
}

guessInput.value="";
}

function displayGuess(guess){

let row=document.createElement("div");
row.className="row";

for(let key in guess){

if(key==="name"){
row.appendChild(makeCell(guess[key],guess[key]===answer[key]));
}

}

board.appendChild(row);

}

function makeCell(text,state){

let cell=document.createElement("div");
cell.className="cell";
cell.innerText=text;

if(state===true) cell.classList.add("correct");
else cell.classList.add("wrong");

return cell;

}

function endGame(win){

if(win){
document.getElementById("resultText").innerText="You Win!";
}else{
document.getElementById("resultText").innerText="You Lost!";
}

document.getElementById("answerText").innerText="Answer: "+answer.name;

if(mode==="daily"){
let day=Math.floor(Date.now()/86400000);
localStorage.setItem(list+"_daily",day);
}

document.getElementById("resultMenu").style.display="block";

}

function playAgain(){

window.location="game.html?mode=random&list="+list;

}
