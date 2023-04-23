// Variable declarations
var clock = null; 
var state = 0;
var speed = 2;

// Initialization
function init() {
    for(var i = 0; i < 4; i++) { // Create the first row
        crow();
    }
    $('main').onclick  = function (ev) {
        judge(ev);
    }
} 

// Determine whether the click is valid
function judge(ev) { 
    if(state == 3) { // Game over
        alert("Game Over!");
        return;
    }
    if(ev.target.className.indexOf('black') == -1) { // Click the white tile
            over();
    } else { // Click the black tile
        ev.target.className = 'cell';
        ev.target.parentNode.pass = 1;
        score();
    }
}

// Start the game
function start() { 
    clock = window.setInterval('move()',30);
}

// Animation
function move() {
    // Get the top value of the container
    var con = $('container');
    var top = parseInt(window.getComputedStyle(con , null)['top']);

    if(speed + top > 0) { // The container is at the bottom
        top = 0;
    } else { // The container is not at the bottom
        top += speed;
        con.style.top = top + 'px';
    }
    if(top == 0) { // Create a new row
        crow();
        con.style.top = '-90px';

        draw();
    } else if(top == (speed - 90)) { // Check whether the row is at the bottom
        var rows = con.childNodes;

        if((rows.length == 5) && (rows[4].pass !== 1)) { // The row is at the bottom and the player does not click the black tile	
            over();
        }
    }
}

// Game over
function over() { 
    clearInterval(clock); // Stop the animation

    state = 3; // Set the game state to 3

    var mes = confirm("Your score: " + $('score').innerHTML + "\nWould you like to play again?");

    if(mes == true) { // Restart the game
        window.location.reload();
    } else { // Close the window
        window.close();
    }
}

// Increase the speed as the player scores
function speedUp() { 
    speed += 2; // Increase the speed by 2

    if(speed == 20) { // Speed reaches the maximum
        alert("You are a genius!");
    }
}

// Increase the score as the player clicks the black tile
function score() {
    var newScore = parseInt($('score').innerHTML) + 1; // Increase the score by 1

    $('score').innerHTML = newScore; // Update the score

    if(newScore % 10 == 0) { // Increase the speed every 10 points
        speedUp();
    }
}

// Create a row
function crow() { 
    // Variable declarations
    var con = $('container');
    var row = createDiv('row');
    var classes = createSequence();

    for(var i = 0; i < 4; i++) { // Create 4 cells
        row.appendChild(createDiv(classes[i]));
    } 		    
    if(con.firstChild == null) { // The first row
        con.appendChild(row);
    } else { // The other rows
        con.insertBefore(row, con.firstChild);
    }
}

// Delete the last row
function draw() { 
    var con = $('container'); // Get the container

    if(con.childNodes.length == 6) { // Delete the last row
        con.removeChild(con.lastChild);
    }
}

// Create a div element
function createDiv(className) {
    var div = document.createElement('div'); // Create a div element
    div.className = className; // Set the class name

    return div;
}

//Create a random array
function createSequence() {
    // Create an array and generate a random number
    var arr = ['cell', 'cell', 'cell', 'cell']; 
    var i = Math.floor(Math.random() * 4);

    arr[i] = 'cell black'; // Set the class name of the black tile

    return arr;
}

// Get the element by id
function $(id) { 
    return document.getElementById(id);
}

// Call functions
init();
start();