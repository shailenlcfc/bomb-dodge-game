var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var spacePressed = false;
var gamestarted = false;
var counter = 0;
var numberofbombs = 0;
var playerdead = false;

function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}
	if (event.keyCode == 32) {
		spacePressed = false;

	}


	player.className = 'character stand ' + lastPressed;
}
function removebombs() {

	var bombelements = document.getElementsByClassName('bomb');
	while (bombelements.length > 0) {
		bombelements[0].parentNode.removeChild(bombelements[0]);
	}
	var explosionelements = document.getElementsByClassName('explosion');
	while (explosionelements.length > 0) {
		explosionelements[0].parentNode.removeChild(explosionelements[0]);
	}
}
function move() {
	if (playerdead) {
		return;
	}


	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (downPressed) {
		var newTop = positionTop + 1;

		var element = document.elementFromPoint(player.offsetLeft, newTop + 32);

		if (element!=null && element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';

		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop - 1;

		var element = document.elementFromPoint(player.offsetLeft, newTop);

		if (element!=null && element.classList.contains('sky') == false) {

			player.style.top = newTop + 'px';
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}
		}
	}
	if (leftPressed) {
		var newLeft = positionLeft - 1;

		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element!=null && element.classList.contains('sky') == false) {

			player.style.left = newLeft + 'px';
		}


		player.className = 'character walk left';
	}
	if (rightPressed) {
		var newLeft = positionLeft + 1;

		var element = document.elementFromPoint(newLeft + 32, player.offsetTop);
		if (element!=null && element.classList.contains('sky') == false) {

			player.style.left = newLeft + 'px';
		}

		player.className = 'character walk right';
	}



	if (gamestarted) {
		var bombelements = document.getElementsByClassName('bomb');
		for (var i = 0; i < bombelements.length; i++) {
			bombPositionLeft = bombelements.item(i).offsetLeft;
			bombPositionTop = bombelements.item(i).offsetTop;
			var newTop = bombPositionTop + 1;

			var randomY = Math.floor(Math.random() *4);
			var randomX = (Math.floor(Math.random() *4))-1.5;

			bombelements.item(i).style.top = newTop + randomY + 'px';
			bombelements.item(i).style.left = bombPositionLeft + randomX + 'px';

			var element = document.elementFromPoint(bombPositionLeft + 32, bombelements.item(i).offsetTop);
			if (element != null && element.classList.contains('grass') == true) {
				bombelements.item(i).className = 'explosion';

			}
		}
		var explosionelements = document.getElementsByClassName('explosion');
		for (var i = 0; i < explosionelements.length; i++) {
			explosionPositionLeft = explosionelements.item(i).offsetLeft;
			explosionPositionTop = explosionelements.item(i).offsetTop;
			var newTop = explosionPositionTop + 1;



			explosionelements.item(i).style.top = newTop + 'px';


			var randomY = Math.floor(Math.random() *40);
			if (explosionPositionTop > 600+randomY) {
				explosionelements.item(i).remove();
			}

			if (positionTop + 32 >= explosionPositionTop &&
				positionTop <= explosionPositionTop + 32 &&
				positionLeft + 32 >= explosionPositionLeft &&
				positionLeft <= explosionPositionLeft + 32) {
				gamestarted = false;
				player.className = 'character dead';
				playerdead = true;
				removebombs();
				var gameoverbutton = document.getElementById("gameoverbutton");
				gameoverbutton.style.visibility = 'visible';
				return;
			}






		}







	}
	var randombombrate = (Math.floor(Math.random() *20));
	if (gamestarted && counter %  (60 + randombombrate) == 0) {
		var img = document.createElement('div');
		img.setAttribute("id", "shailensbomb");
		img.setAttribute("style", "position:absolute;");
		img.className = "bomb";
		document.body.appendChild(img);
		var xy = getRandomPosition(img);
		img.style.top = xy[0] + 'px';
		img.style.left = xy[1] + 'px';

	}

	counter++;

}




function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
	if (event.keyCode == 32) {
		spacePressed = true;
	}
}

function startbuttonclick (element) {
	var startbutton = document.getElementById("startbutton");
	startbutton.style.visibility = 'hidden';
	gamestarted = true;
	playerdead = false;
}
function gameoverbuttonclick (element) {
	var gameoverbutton = document.getElementById("gameoverbutton");
	gameoverbutton.style.visibility = 'hidden';
	var startbutton = document.getElementById("startbutton");
	startbutton.style.visibility = 'visible';
}
function myLoadFunction() {
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);


	var startbutton = document.getElementById("startbutton");
	startbutton.onclick = startbuttonclick;
	var gameoverbutton = document.getElementById("gameoverbutton");
	gameoverbutton.onclick = gameoverbuttonclick;
}
var elements = document.getElementsByClassName("bomb");
function getRandomPosition(element) {
	var x = document.body.offsetHeight - element.clientHeight;
	var y = document.body.offsetWidth - element.clientWidth;
	var randomX = Math.floor(Math.random() * x);
	var randomY = Math.floor(Math.random() * y);
	return [randomX, randomY];
}




document.addEventListener('DOMContentLoaded', myLoadFunction);

