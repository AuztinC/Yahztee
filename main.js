
// make dice objects

// give dice methods and properties to generate and display random numbers
const rollBtn = document.querySelector('.roll-button')
let dice = [];
let totalScore = 0;
let upperScore = 0;
let bonus = false;

let rollNum = 0;



for (i = 0; i < 5; i++) {
	dice[i] = new Die_obj();
}

// Roll();
let state = {
	aces: ()=>checkNumber(1, "aces"),
	twos: ()=>checkNumber(2, "twos"),
	threes: ()=>checkNumber(3, "threes"),
	fours: ()=>checkNumber(4, "fours"),
	fives: ()=>checkNumber(5, "fives"),
	sixes: ()=>checkNumber(6, "sixes"),
	
	bonusCheck: ()=>bonusCheck(),
	
	chance: ()=>chance(),
	
	howManyNums: ()=>howManyNums(),

}

function Roll() {
	if(rollNum <= 2){
		if (rollNum === 0) {
			dice.forEach(di=>{
				di.container.addClass('active');
				di.active = true;
			})
		}
		
		for (i = 0; i < 5; i++) {
			dice[i].roll();
		}
		
		for(let key in state){
			state[key]()
		}
		
		if (rollNum == 2) {
			rollBtn.disabled = true
		}
		
	} 
	rollNum++
}


function Die_obj() {
	let self = this;
	
	self.active = false;
	self.value = 1;
	self.container = $("<div class='die'>1</div>");
	self.container.appendTo("#dice-container");
	// self.container.addClass("active");	
	self.container.click(function(e){ 
		if(rollNum !== 0)self.toggle() 
	});
	
	self.roll = function() {
		if (self.active) {
			self.value = Math.floor(Math.random()*6)+1;
			self.container.text(self.value);
		}
	}
	
	self.toggle = function() {
		
		self.active = !self.active;
		self.container.toggleClass("active");
		
	}
}

function chance(){
	let diceSum = 0;
	for(let i = 0; i < dice.length; i++){
		diceSum += dice[i].value;
	}
	document.getElementById("chance").innerHTML = diceSum;
	// console.log(diceSum)
}

function bonusCheck(){
	if(upperScore >= 63){
		bonus = true;
	}
}

function checkNumber(num, elem) {
	n = 0;
	dice.forEach(d => {
		if (d.value === num) {n++}
	});
	document.getElementById(elem).innerHTML = n * num;
}

function howManyNums(){
	let totals = [0, 0, 0, 0, 0, 0]
	for (let i = 1; i < 7; i++) {
		dice.forEach((e) => {
			if(e.value === i){
				totals[i - 1]++
			}
		})
	}
	
	// check yahtzee
	
	let y = false;
	let threeOfKind = 0;
	let fourOfKind = 0;
	let fullHouse = false
	totals.forEach( (t, i) => {
		console.log(t * (i+1))
		t===5 ? y = true : null;
		if (t===4) {
			fourOfKind = (4 * (i+1));
			threeOfKind = (3 * (i+1));
		}
		if(t >= 3){
			
			 threeOfKind = (3 * (i+1));
		}
	});
	
	document.getElementById("yahztee").innerHTML = 50 * y;
	document.getElementById("fourOfKind").innerHTML = fourOfKind;
	document.getElementById("threeOfKind").innerHTML = threeOfKind;
	
	
	
	
	
	console.log(totals)
}

function writeScore(elem) {
	if(state[elem.id]){
		elem.style.color = "black";
		elem.style.fontWeight = "bold";
		rollNum = 0;
		rollBtn.disabled = false
		dice.forEach(di=>{
			di.container.text("1")
			di.container.removeClass('active')
		})
		delete state[elem.id]
	}
}

// ui


























