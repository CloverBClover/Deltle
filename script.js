let answer;

const board = document.getElementById("board");
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");

guessBtn.onclick = submitGuess;

startGame();

function startGame(){

if(MODE === "random"){
answer = characters[Math.floor(Math.random()*characters.length)];
}

if(MODE === "daily"){
let day = Math.floor(Date.now()/86400000);
answer = characters[day % characters.length];
}

console.log("Answer:",answer.name);
}

function submitGuess(){

let name = guessInput.value.trim().toUpperCase();

let guess = characters.find(c => c.name === name);

if(!guess){
alert("Invalid character name");
return;
}

displayGuess(guess);

guessInput.value="";
}

function displayGuess(guess){

let row = document.createElement("div");
row.className = "row";

row.appendChild(makeCell(guess.name, guess.name === answer.name));

row.appendChild(makeCell(
guess.lightner,
guess.lightner === answer.lightner
));

row.appendChild(compareChapter(guess.chapter));

row.appendChild(compareRole(guess.role));

row.appendChild(makeCell(
guess.gender,
guess.gender === answer.gender
));

row.appendChild(makeCell(
guess.undertale ? "Yes" : "No",
guess.undertale === answer.undertale
));

board.appendChild(row);

}

function compareChapter(ch){

if(ch === answer.chapter){
return makeCell("Chapter "+ch,true);
}

if(ch < answer.chapter){
return makeCell("Chapter "+ch+" ↑","close");
}

return makeCell("Chapter "+ch+" ↓","close");
}

function compareRole(roles){

let correct = roles.length === answer.role.length &&
roles.every(r => answer.role.includes(r));

if(correct){
return makeCell(roles.join(","),true);
}

let partial = roles.some(r => answer.role.includes(r));

if(partial){
return makeCell(roles.join(","),"close");
}

return makeCell(roles.join(","),false);
}

function makeCell(text,state){

let cell = document.createElement("div");
cell.className = "cell";
cell.innerText = text;

if(state === true) cell.classList.add("correct");
if(state === "close") cell.classList.add("close");
if(state === false) cell.classList.add("wrong");

return cell;
}
