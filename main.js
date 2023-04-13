


// 


// make dice objects

// give dice methods and properties to generate and display random numbers

let dice = [];
let totalScore = 0;
let upperScore = 0;
let bonus = false;



for (i = 0; i < 5; i++) {
	dice[i] = new Die_obj();
}

// Roll();

function Roll() {
	for (i = 0; i < 5; i++) {
		dice[i].roll();
	}
	sumDice(dice);
	bonusCheck();
}


function Die_obj() {
	let self = this;
	
	self.active = true;
	self.value = 1;
	self.container = $("<div class='die'>1</div>");
	self.container.appendTo("#dice-container");
	self.container.addClass("active");
	self.container.click(function (e) {self.toggle()});
	
	self.roll = function() {
		if (self.active) {
			self.value = Math.floor(Math.random()*6)+1;
			self.container.text(self.value);
		}
	}
	
	self.toggle = function() {
		if (self.active) {
			self.active = false;
			self.container.removeClass("active");
		} else {
			self.active = true;
			self.container.addClass("active");
		}
	}
	
	
}

function sumDice(){
	let diceSum = 0;
	for(let i = 0; i < dice.length; i++){
		diceSum += dice[i].value;
	}
	// console.log(diceSum)
}



function bonusCheck(){
	if(upperScore >= 63){
		bonus = true;
	}
}

// ui


























