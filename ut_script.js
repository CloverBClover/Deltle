let answer;

const board=document.getElementById("board");
const guessInput=document.getElementById("guess-input");
const guessBtn=document.getElementById("guess-btn");

guessBtn.onclick=submitGuess;

startGame();

function startGame(){

if(MODE==="random"){
answer=characters[Math.floor(Math.random()*characters.length)];
}

if(MODE==="daily"){
let day=Math.floor(Date.now()/86400000);
answer=characters[day%characters.length];
}

console.log(answer);
}

function submitGuess(){

let name=guessInput.value.trim().toUpperCase();
let guess=characters.find(c=>c.name===name);

if(!guess){
alert("Invalid character");
return;
}

displayGuess(guess);
guessInput.value="";
}

function displayGuess(guess){

let row=document.createElement("div");
row.className="row";

row.appendChild(makeCell(guess.name,guess.name===answer.name));

row.appendChild(makeCell(
guess.species,
guess.species===answer.species
));

row.appendChild(comparePlace(guess.place));

row.appendChild(compareRole(guess.role));

row.appendChild(makeCell(
guess.gender,
guess.gender===answer.gender
));

row.appendChild(makeCell(
guess.deltarune?"Yes":"No",
guess.deltarune===answer.deltarune
));

board.appendChild(row);

}

function comparePlace(place){

if(place===answer.place) return makeCell("Place "+place,true);
if(place<answer.place) return makeCell("Place "+place+" ↑","close");

return makeCell("Place "+place+" ↓","close");
}

function compareRole(roles){

let correct=roles.length===answer.role.length &&
roles.every(r=>answer.role.includes(r));

if(correct) return makeCell(roles.join(","),true);

let partial=roles.some(r=>answer.role.includes(r));

if(partial) return makeCell(roles.join(","),"close");

return makeCell(roles.join(","),false);
}

function makeCell(text,state){

let cell=document.createElement("div");
cell.className="cell";
cell.innerText=text;

if(state===true) cell.classList.add("correct");
if(state==="close") cell.classList.add("close");
if(state===false) cell.classList.add("wrong");

return cell;
}
