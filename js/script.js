
	let board;
	let stopwatch;

	function newGame (){
		document.getElementById("choose").style.display = 'block';
		document.getElementById("stopwatch").style.display = 'block';
		document.getElementById("menu").style.display = 'block';
		
		let radios = document.forms[0].level;
		
		let numberOfElements = radios.value;

		board = new Board();
		let memoryArray = board.createCardsArray(numberOfElements);

		stopwatch = new Stopwatch();

		setInterval("stopwatch.secondsCounter()", 1000);

		board.createNewBoard(memoryArray);
	};

	document.getElementById('continue').addEventListener('click', newGame);

	document.getElementById('choose_shirt').addEventListener('click', function(e){
		board.changeShirt(e);
	});

	document.getElementById('choose_suit').addEventListener('click', function(e){
		board.changeSuit(e);
	});

	document.getElementById('menu').addEventListener('click', function(){
		location.reload();
	});



