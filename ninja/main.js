title = "NINJA DASH";

description = ` tap to attack.
 hold to stop 
 and charge
 a longer attack.
`;

characters = [
`
  Bbb
 Bbbbb
Bwywyw
 Bbbbb
BBBbbb
 B   b
`

];

options = {
    theme: "pixel"

};
// red squares
let burgers;

// sword slash
let teeth;

//distance until next square appears
let nextBurgDist;

// increaing attack distance
let swordX;


//Chris added some helpful constants, feel free to edit
const G = {  
	WIDTH: 100,
	HEIGHT: 100,
};

/** @typedef {number} */ let toggle = 0.5;  
/** @typedef {number} */ let sword_translate = 0;


player = {  // Chris added player function to define ninja movement
  x: G.WIDTH * 0.5, y: G.HEIGHT * 0.5
}; // feel free to edit



function update() {
  if (!ticks) {
    // make a burger
    burgers = [vec(100, 50)];
    nextBurgDist = 5;
    //distance til next burger
    x = 3;
    y = 20;
    scr = 0.1;
    swordX = 1;
    
  }
  
  
  
  
  // display character Ninja
  color("black");
  char("a",20,player.y);
  
  if(!input.isPressed){
    player.y += toggle;
    sword_translate += toggle;
  }
  
  if(player.y <= 5 || player.y >= G.HEIGHT -5){
    toggle *= -1;
  }

 
  
  


  // Charge Sword Slash
  if(input.isPressed){

    swordX +=0.03;
    
    if(swordX > 3.5){
      swordX = 3.5;
    }
    color("light_purple");
    rect(2, 49+ sword_translate, 12, 5);
    color("white");
    rect(3, 50+ sword_translate, 10, 3);
    color("green");
    rect(3, 50+ sword_translate, swordX*4-4, 3);
    
  }

  if(input.isJustReleased){
    // Sword Slash particles
    color("black");
    py = 48
    for(let i = 2 ; i < -11+(swordX*15) ; i+=2){
      parts = particle(28+i, py+ sword_translate, 0.2, 0.3+(2/i), -4*PI/5, PI/8);
    }

    for(let i = 0 ; i < 3*(swordX*2) ; i+=2){
      parts = particle(27-9-15+i+(swordX*15)+4, py+3+ sword_translate, 0.2, 0.3+(2/i), -4*PI/5, PI/8);
    }
    

    
    // Sword Slash sprite
    color("black");
    
    rect(24, 48+ sword_translate, -9+(swordX*15), 1);
    rect(26-12+(swordX*12), 49+ sword_translate, 3*(swordX*2), 1);
    rect(27-15+(swordX*15), 50+ sword_translate, 3*(swordX*1.8), 1);
    rect(27-15+(swordX*15), 51+ sword_translate, 3*(swordX*1.7), 1);
    rect(26-14+(swordX*14), 52+ sword_translate, 3*(swordX*1.7), 1);
    rect(26-12+(swordX*12), 53+ sword_translate, 2*(swordX*1.6), 1);

    swordX = 1;
  }

  // Burger Collision deletion
  remove(burgers, (b) =>{
    //move Burgers
    b.x -= scr;

    // if burger touches Sword Slash then add score and increase difficulty
    color("red");
    if(box(b,3).isColliding.rect.black){
        scr += 0.03;
        y+=0.1;
        addScore(100);
        return true;
        
    }

    // if Burger touches Ninja then end game
    if(box(b,3).isColliding.char.a){
        end();
    }
    color("red");

    // If burger leaves screen then delete it
    return(b.x < 0);
  });

  nextBurgDist -= scr;

  // deploy burger
  while(nextBurgDist < 0){
    burgers.push(vec(100 , rnd(10,90))); // Chris randomized enemy spawn
    nextBurgDist +=rnd(x,y);
  }
}
