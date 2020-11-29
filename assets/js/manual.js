window.onload = function(){
    var w = window.innerWidth || 360;
    var h = window.innerHeight || 500;
    
    var tsw = (w > h) ? h : w;
    
    var sw = (tsw - 16)/8;
    
    var container = document.getElementById("container");
    for(var n = 0; n < 64; n++){
        var square = document.createElement("div");
        square.classList.add("square");
        square.classList.add("s"+n);
        square.style.height = sw + 'px';
        square.style.width = sw + 'px';
        square.style.top = 7+(h-tsw)/2+sw*(Math.floor(n/8)) + 'px';
        square.style.left = 7+(w-tsw)/2+sw*(Math.floor(n%8)) + 'px';
        square.style.fontSize = sw*3/4 + 'px';
        container.appendChild(square);
    }

    var fonts = {
        'k' : '&#9818;',  //black king
        'q' : '&#9819;',  //black queen
        'r' : '&#9820',
        'b' : '&#9821',
        'n' : '&#9822',
        'p' : '&#9823',
        'l' : '&#9812;',    //white king
        'w' : '&#9813;',    //white queen
        't' : '&#9814',
        'v' : '&#9815',
        'm' : '&#9816',
        'o' : '&#9817',
        
    }
    
    var values = ['r','n','b','q','k','b','n','r','p','p','p','p','p','p','p','p',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'o','o','o','o','o','o','o','o','t','m','v','w','l','v','m','t'];
    var boxes = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜", "♟", "♟", "♟", "", "♟", "♟", "♟", "♟", "", "", "", "", "", "", "", "", "", "", "", "♟", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "♙", "", "", "", "♙", "♙", "♙", "♙", "", "♙", "♙", "♙", "♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
    var ck = false;
    var cr1 = false;
    var cr2 = false;
    var cl;
    
    var sqs = document.getElementsByClassName("square");

    for(var n = 0; n < 64; n++){
        if(values[n] !== 0){
           sqs[n].innerHTML = fonts[values[n]];
        }
        sqs[n].addEventListener("click",check);
    }
    
    function updateSquarecolor(){
        for(var n = 0; n < 64; n++){
            if(Math.floor(n/8)%2 === 0){
                if(n%2 === 0){
                    sqs[n].style.background = '#9ff';
                }
                else {
                    sqs[n].style.background = '#5fa';
                }
            }
            else {
                if(n%2 === 1){
                    sqs[n].style.background = '#9ff';
                }
                else {
                    sqs[n].style.background = '#5fa';
                }
            }
        }
    }
    
    updateSquarecolor();

    var moveable = false;
    var moveTarget = "";
    var moveScopes = [];


    function checkBlack(n,values){
        var target = values[n];
        var scopes = [];
        var x = n;
       
        if(target === "o"){
            x -= 8;
            if("prnbkq".indexOf(values[x-1]) >= 0 && x%8 != 0){
                scopes.push(x-1);
            }
            if("prnbkq".indexOf(values[x+1]) >= 0 && x%8 != 7){
                scopes.push(x+1);
            }
            if(x >= 0 && values[x] === 0){
                scopes.push(x);
                if(x >= 40){
                    if(x-8 >= 0 && values[x-8] === 0){
                        scopes.push(x-8);
                    }
                }
            }
        }
       
        else if(target === "t"){
            x = n;
            x -= 8;
            while(x >= 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 8;
            }
            x = n;
            x += 8;
            while(x < 64){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 8;
            }
            x = n;
            x++;
            while(x%8 != 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x++;
            }
            x = n;
            x--;
            while(x%8 != 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x--;
            }
        }
        
        else if(target === "m"){
            x = n;
            if(x%8 > 1 && x%8 < 6){
                x -= 17;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x -= 15;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }

                x = n;
                x -= 10;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x -= 6;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x += 6;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x += 10;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x += 15;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x += 17;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
            }
            else {
                x = n;
                if(x%8 <= 1){
                    x = n;
                    x -= 15;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x -= 6;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 10;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 17;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
                x = n;
                if(x%8 === 1){
                    x -= 17;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 15;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
                if(x%8 >= 6){
                    x = n;
                    x -= 17;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x -= 10;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 6;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 15;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
                x = n;
                if(x%8 === 6){
                    x = n;
                    x -= 15;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 17;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
            }
        }
        
        else if(target === "v"){
            x = n;
            x -= 9;
            while(x >= 0 && x%8 !== 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 9;
            }
            x = n;
            x += 7;
            while(x < 64 && x%8 !== 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 7;
            }
            x = n;
            x += 9;
            while(x%8 != 0 && x%8 !== 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 9;
            }
            x = n;
            x -= 7;
            while(x%8 != 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 7;
            }
        }
       
        else if(target === "w"){
            x = n;
            x -= 8;
            while(x >= 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 8;
            }
            x = n;
            x += 8;
            while(x < 64){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 8;
            }
            x = n;
            x++;
            while(x%8 != 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x++;
            }
            x = n;
            x--;
            while(x%8 != 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x--;
            }
            x = n;
            x -= 9;
            while(x >= 0 && x%8 !== 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 9;
            }
            x = n;
            x += 7;
            while(x < 64 && x%8 !== 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 7;
            }
            x = n;
            x += 9;
            while(x%8 != 0 && x%8 !== 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 9;
            }
            x = n;
            x -= 7;
            while(x%8 != 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 7;
            }
        }
        
        else if(target === "l"){
            x = n;
            x += 8;
            if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                scopes.push(x);
            }
            x = n;
            x -= 8;
            if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                scopes.push(x);
            }
            x = n;
            if(x%8 > 0){
                x = n;
                x -= 1;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x -= 9;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }

                x = n;
                x += 7;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
            }
            x = n;
            if(x%8 < 7){
                x = n;
                x += 1;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x += 9;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x -= 7;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
            }
            x = n;
            if(!ck){
                cl = false;
                if(!cr2){
                //    cl = false;
                    if(values[n+1] === 0 && values[n+2] === 0 && values[n+3] === "t"){
                        scopes.push(x+2);
                        cl = true;
                    }
                }
                if(!cr1){
                //    cl = false;
                    if(values[n-1] === 0 && values[n-2] === 0 && values[n-3] === 0 && values[n-4] === "t"){
                        scopes.push(x-2);
                        cl = true;
                    }
                }
            }
        }
        if(scopes.length) return scopes;
    }



    //Black Checks Complete
    // WHite Check Starts

    function checkWhite(n,values){
        var target = values[n];
        var scopes = [];
        var x = n;
        if(target === "p"){
            x += 8;
            if("otmvlw".indexOf(values[x-1]) >= 0 && x%8 != 0){
                scopes.push(x-1);
            }
            if("otmvlw".indexOf(values[x+1]) >= 0 && x%8 != 7){
                scopes.push(x+1);
            }
            if(x < 64 && values[x] === 0){
                scopes.push(x);
                if(x <= 23){
                    if(x+8 >= 0 && values[x+8] === 0){
                        scopes.push(x+8);
                    }
                }
            }
        }
        
        else if(target === "r"){
            x = n;
            x -= 8;
            while(x >= 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 8;
            }
            x = n;
            x += 8;
            while(x < 64){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 8;
            }
            x = n;
            x++;
            while(x%8 != 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x++;
            }
            x = n;
            x--;
            while(x%8 != 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x--;
            }
        }
        
        else if(target === "n"){
            x = n;
            if(x%8 > 1 && x%8 < 6){
                x -= 17;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x -= 15;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }

                x = n;
                x -= 10;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x -= 6;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x += 6;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x += 10;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x += 15;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x += 17;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
            }
            else {
                x = n;
                if(x%8 <= 1){
                    x = n;
                    x -= 15;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x -= 6;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 10;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 17;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
                x = n;
                if(x%8 === 1){
                    x -= 17;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 15;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
                if(x%8 >= 6){
                    x = n;
                    x -= 17;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x -= 10;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 6;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 15;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
                x = n;
                if(x%8 === 6){
                    x = n;
                    x -= 15;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 17;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
            }
        }
     
        else if(target === "b"){
            x = n;
            x -= 9;
            while(x >= 0 && x%8 !== 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 9;
            }
            x = n;
            x += 7;
            while(x < 64 && x%8 !== 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 7;
            }
            x = n;
            x += 9;
            while(x%8 != 0 && x%8 !== 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 9;
            }
            x = n;
            x -= 7;
            while(x%8 != 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 7;
            }
        }
        
        else if(target === "q"){
            x = n;
            x -= 8;
            while(x >= 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 8;
            }
            x = n;
            x += 8;
            while(x < 64){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 8;
            }
            x = n;
            x++;
            while(x%8 != 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x++;
            }
            x = n;
            x--;
            while(x%8 != 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x--;
            }
            x = n;
            x -= 9;
            while(x >= 0 && x%8 !== 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 9;
            }
            x = n;
            x += 7;
            while(x < 64 && x%8 !== 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 7;
            }
            x = n;
            x += 9;
            while(x%8 != 0 && x%8 !== 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 9;
            }
            x = n;
            x -= 7;
            while(x%8 != 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 7;
            }
        }
        
        else if(target === "k"){
            x = n;
            x += 8;
            if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                scopes.push(x);
            }
            x = n;
            x -= 8;
            if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                scopes.push(x);
            }
            x = n;
            if(x%8 > 0){
                x = n;
                x -= 1;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x -= 9;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }

                x = n;
                x += 7;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
            }
            x = n;
            if(x%8 < 7){
                x = n;
                x += 1;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x += 9;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x -= 7;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
            }
        }
        if(scopes.length) return scopes;
    }

    function check(e){
        var checkBox = e.target.innerHTML;
        //console.log(checkBox)
        if(checkBox=='♙'||checkBox=='♖'||checkBox=='♘'||checkBox=='♗'||checkBox=='♔'||checkBox=='♕'){
            whiteCheck(e);
            //console.log("Inside condition")
            
            for(var n = 0; n < 64; n++){
                if(values[n] !== 0){
                   sqs[n].innerHTML = fonts[values[n]];
                }
                sqs[n].addEventListener("click",function(e){
                    //console.log(e.target.innerHTML);
                    if(e.target.innerHTML==''||e.target.innerHTML=='♟'||e.target.innerHTML=='♜'||e.target.innerHTML=='♞'||e.target.innerHTML=='♝'||e.target.innerHTML=='♚'||e.target.innerHTML=='♛'){
                        whiteCheck(e);
                    }
                });
            }
        }else if(checkBox=='♟'||checkBox=='♜'||checkBox=='♞'||checkBox=='♝'||checkBox=='♚'||checkBox=='♛'){
            blackTurn(e);

            for(var n = 0; n < 64; n++){
                if(values[n] !== 0){
                   sqs[n].innerHTML = fonts[values[n]];
                }
                sqs[n].addEventListener("click",function(e){
                    //console.log(e.target.innerHTML);
                    if(e.target.innerHTML==''||e.target.innerHTML=='♙'||e.target.innerHTML=='♖'||e.target.innerHTML=='♘'||e.target.innerHTML=='♗'||e.target.innerHTML=='♔'||e.target.innerHTML=='♕'){
                        blackTurn(e);
                    }
                });
            }
        }
    }

    var myTurn = true;
    var oppTurn = false;

    function whiteCheck(e){
        //console.log(myTurn)
        if(myTurn){
            var n = Number(e.target.classList[1].slice(1));
            //console.log(e.target.classList[1].slice(1))
            var target = values[n];

            var scopes = checkBlack(n,values) || [];

            var x = n;

            if(!moveable){
                if(scopes.length > 0){
                    moveable = true;
                    moveTarget = n;
                    moveScopes = scopes.join(",").split(",");
                }
                else {

                }
            }
            else {
                if(moveScopes.indexOf(String(n)) >= 0){
                    var checkArr = [];
                    var saveKing = false;
                    for(var z = 0; z < 64; z++){
                        checkArr[z] = values[z];
                    }
                    
                    checkArr[n] = checkArr[moveTarget];
                    checkArr[moveTarget] = 0;
                    
                    for(var y = 0; y < 64; y++){
                        if("prnbkq".indexOf(checkArr[y]) >= 0){
                            var checkScp = checkWhite(y,checkArr) || [];
                            for(var z = 0; z < checkScp.length; z++){
                                if(checkArr[checkScp[z]] === 'l'){
                                    if(!saveKing){
                                        alert('Save Your King');
                                    }
                                }
                            }
                        }
                    }
                    
                    if(!saveKing){
                        //console.log(values)
                        //console.log(moveTarget)
                        values[n] = values[moveTarget];
                        values[moveTarget] = 0;
                        //console.log(values)
                        if(cl){
                            if(n === 62 && moveTarget === 60){
                                values[63] = 0;
                                values[61] = "t";
                            }
                            else if(n === 58 && moveTarget === 60){
                                values[59] = "t";
                                values[56] = 0;
                            }
                        }
                        if(moveTarget === 60){
                            ck = true;
                        }
                        else if(moveTarget === 63){
                            cr2 = true;
                        }
                        else if(moveTarget === 56){
                            cr1 = true;
                        }
                        if(values[n] === "o" && n < 8){
                            values[n] = "w";
                        }
                        moveable = false;
                        scopes = [];
                        myTurn = false;
                        //oppTurn = true;
                        setTimeout(whiteChooseTurn,1000);
                    }
                }
                else {
                    moveScopes = [];
                    moveable = false;
                }
            }

            updateSquarecolor();
            
            for(var x = 0; x < 64; x++){
                sqs[x].innerHTML = fonts[values[x]];
                //console.log([values[x]])
                if(values[x] === 0){
                    sqs[x].innerHTML = "";
                }
            }

            for(var x = 0; x < scopes.length; x++){
                sqs[scopes[x]].style.background = "#f45";//.classList.add("scope");
            //    alert(scopes)
            }
        }

    }
    


    var arr = [];

    function blackTurn(e){
        if(oppTurn){
            var n = Number(e.target.classList[1].slice(1));
            //console.log(this.classList[1].slice(1))
            var target = values[n];

            var scopes = checkWhite(n,values) || [];

            var x = n;

            if(!moveable){
                if(scopes.length > 0){
                    moveable = true;
                    moveTarget = n;
                    moveScopes = scopes.join(",").split(",");
                }
                else {

                }
            }
            else {
                if(moveScopes.indexOf(String(n)) >= 0){
                    var checkArr = [];
                    var saveKing = false;
                    for(var z = 0; z < 64; z++){
                        checkArr[z] = values[z];
                    }
                    
                    checkArr[n] = checkArr[moveTarget];
                    checkArr[moveTarget] = 0;
                    
                    for(var y = 0; y < 64; y++){
                        if("prnbkq".indexOf(checkArr[y]) >= 0){
                            var checkScp = checkBlack(y,checkArr) || [];
                            for(var z = 0; z < checkScp.length; z++){
                                if(checkArr[checkScp[z]] === 'l'){
                                    if(!saveKing){
                                        alert('Save Your King');
                                    }
                                }
                            }
                        }
                    }
                    
                    if(!saveKing){
                        //console.log(values)
                        //console.log(moveTarget)
                        values[n] = values[moveTarget];
                        values[moveTarget] = 0;
                        //console.log(values)
                        if(cl){
                            if(n === 62 && moveTarget === 60){
                                values[63] = 0;
                                values[61] = "t";
                            }
                            else if(n === 58 && moveTarget === 60){
                                values[59] = "t";
                                values[56] = 0;
                            }
                        }
                        if(moveTarget === 60){
                            ck = true;
                        }
                        else if(moveTarget === 63){
                            cr2 = true;
                        }
                        else if(moveTarget === 56){
                            cr1 = true;
                        }
                        if(values[n] === "o" && n < 8){
                            values[n] = "w";
                        }
                        moveable = false;
                        scopes = [];
                        oppTurn = false;
                        myTurn = true;
                        setTimeout(blackChooseTurn,1000);
                    }
                }
                else {
                    moveScopes = [];
                    moveable = false;
                }
            }

            updateSquarecolor();
            
            for(var x = 0; x < 64; x++){
                sqs[x].innerHTML = fonts[values[x]];
                //console.log([values[x]])
                if(values[x] === 0){
                    sqs[x].innerHTML = "";
                }
            }

            for(var x = 0; x < scopes.length; x++){
                sqs[scopes[x]].style.background = "#f45";//.classList.add("scope");
            //    alert(scopes)
            }
        }

    }


    function whiteChooseTurn(){
        var approved = [];
        var actions = [];
        var effects = [];

        //console.log(values)
        for(var n = 0; n < 64; n++){
            if("prnbqk".indexOf(values[n]) >= 0){
                //console.log("prnbqk".indexOf(values[n]));
                var scopes = checkWhite(n,values) || [];
                for(var x = 0; x < scopes.length; x++){
                    var tmp = []//values.join(',').split(',');
                    for(var xx = 0; xx < 64; xx++){
                        tmp[xx] = values[xx]
                    }
                    var effect = 0;
                    var action = Math.random()*3;
                    //Action value
                    var actionValue = tmp[scopes[x]];
                    if(actionValue === "l"){
                        action = 100 + Math.random()*3;
                    }
                    else if(actionValue === "w"){
                        action = 50 + Math.random()*3;
                    }
                    else if(actionValue === "v"){
                        action = 30 + Math.random()*3;
                    }
                    else if(actionValue === "m"){
                        action = 30 + Math.random()*3;
                    }
                    else if(actionValue === "t"){
                        action = 30 + Math.random()*3;
                    }
                    else if(actionValue === "o"){
                        action = 15 + Math.random()*3;
                    }
                    //Effect value
                    tmp[scopes[x]] = tmp[n];
                    tmp[n] = 0;
                    for(var y = 0; y < 64; y++){
                        //console.log(values[y])
                        if("otmvlw".indexOf(values[y]) >= 0){
                            var tmpScp = checkBlack(y,tmp) || [];
                            for(var z = 0; z < tmpScp.length; z++){
                                var effectValue = tmp[tmpScp[z]];
                                if(effectValue == "k"){
                                    if(effect < 100){
                                        effect = 100;
                                    }
                                }
                                else if(effectValue == "q"){
                                    if(effect < 50){
                                        effect = 50;
                                    }
                                }
                                else if(effectValue == "b"){
                                    if(effect < 30){
                                        effect = 30;
                                    }
                                }
                                else if(effectValue == "n"){
                                    if(effect < 30){
                                        effect = 30;
                                    }
                                }
                                else if(effectValue == "r"){
                                    if(effect < 30){
                                        effect = 30;
                                    }
                                }
                                else if(effectValue == "p"){
                                    if(effect < 15){
                                        effect = 15;
                                    }
                                }
                            }
                        }
                    }




                    actions.push(action);
                    effects.push(effect);
                    approved.push(n+"-"+scopes[x]);
                }
            }
        }
        //console.log(values)
        values[n] = values[moveTarget];
        //console.log(values)

        //console.log(effects,approved)

        //alert(effects);

        var bestEffect = Math.min.apply(null,effects);
        //alert(bestEffect);
        // if(!values.includes('k')){
        //     console.log("Hello world")
        // }else{
        //     console.log("loss")
        // }
        //console.log(values)

        var tmpA = [];
        var tmpB = [];
        var tmpC = [];
        var bestMove = "";

        for(var n = 0; n < effects.length; n++){
            if(effects[n] === bestEffect){
                tmpA.push(actions[n]);
                tmpB.push(approved[n]);
                tmpC.push(effects[n]);
            }
        }
        bestMove = tmpB[tmpA.indexOf(Math.max.apply(null,tmpA))];
        //alert(effects)
        //alert(bestMove);


        if(bestMove){
//Automation Code for Black Ones

            // values[Number(bestMove.split("-")[1])] = values[Number(bestMove.split("-")[0])];
            // values[Number(bestMove.split("-")[0])] = 0;
            // if(values[Number(bestMove.split("-")[1])] === "p" && Number(bestMove.split("-")[1]) >= 56){
            //     values[Number(bestMove.split("-")[1])] = "q";
            // }

            // sqs[bestMove.split("-")[1]].style.background = '#aaf';
            // sqs[bestMove.split("-")[0]].style.background = '#aaf';
            //console.log(sqs[bestMove.split("-")[0]])

            for(var x = 0; x < 64; x++){
                //sqs[x].style.background = "#afa"//classList.add("scope");
                sqs[x].innerHTML = fonts[values[x]];
                if(values[x] === 0){
                    sqs[x].innerHTML = "";
                }
            }
            myTurn = false;
            oppTurn = true;
        }
        else {
            //alert('You Win');
        }

        boxes = []
        document.querySelectorAll('.square').forEach(function(box){
            boxes.push(box.innerHTML)
        })
        //console.log(boxes)

        if(!boxes.includes('♚')){
            alert("White Win");
            setTimeout(function(){
                values = ['r','n','b','q','k','b','n','r','p','p','p','p','p','p','p','p',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'o','o','o','o','o','o','o','o','t','m','v','w','l','v','m','t'];
        },100);
        }else if(!boxes.includes("♔")){
            alert("Black Win");
            setTimeout(function(){
                values = ['r','n','b','q','k','b','n','r','p','p','p','p','p','p','p','p',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'o','o','o','o','o','o','o','o','t','m','v','w','l','v','m','t'];
        },100);
        }
    }

    function blackChooseTurn(){
        var approved = [];
        var actions = [];
        var effects = [];

        //console.log(values)
        for(var n = 0; n < 64; n++){
            if("prnbqk".indexOf(values[n]) >= 0){
                //console.log("prnbqk".indexOf(values[n]));
                var scopes = checkWhite(n,values) || [];
                for(var x = 0; x < scopes.length; x++){
                    var tmp = []//values.join(',').split(',');
                    for(var xx = 0; xx < 64; xx++){
                        tmp[xx] = values[xx]
                    }
                    var effect = 0;
                    var action = Math.random()*3;
                    //Action value
                    var actionValue = tmp[scopes[x]];
                    if(actionValue === "l"){
                        action = 100 + Math.random()*3;
                    }
                    else if(actionValue === "w"){
                        action = 50 + Math.random()*3;
                    }
                    else if(actionValue === "v"){
                        action = 30 + Math.random()*3;
                    }
                    else if(actionValue === "m"){
                        action = 30 + Math.random()*3;
                    }
                    else if(actionValue === "t"){
                        action = 30 + Math.random()*3;
                    }
                    else if(actionValue === "o"){
                        action = 15 + Math.random()*3;
                    }
                    //Effect value
                    tmp[scopes[x]] = tmp[n];
                    tmp[n] = 0;
                    for(var y = 0; y < 64; y++){
                        //console.log(values[y])
                        if("otmvlw".indexOf(values[y]) >= 0){
                            var tmpScp = checkBlack(y,tmp) || [];
                            for(var z = 0; z < tmpScp.length; z++){
                                var effectValue = tmp[tmpScp[z]];
                                if(effectValue == "k"){
                                    if(effect < 100){
                                        effect = 100;
                                    }
                                }
                                else if(effectValue == "q"){
                                    if(effect < 50){
                                        effect = 50;
                                    }
                                }
                                else if(effectValue == "b"){
                                    if(effect < 30){
                                        effect = 30;
                                    }
                                }
                                else if(effectValue == "n"){
                                    if(effect < 30){
                                        effect = 30;
                                    }
                                }
                                else if(effectValue == "r"){
                                    if(effect < 30){
                                        effect = 30;
                                    }
                                }
                                else if(effectValue == "p"){
                                    if(effect < 15){
                                        effect = 15;
                                    }
                                }
                            }
                        }
                    }




                    actions.push(action);
                    effects.push(effect);
                    approved.push(n+"-"+scopes[x]);
                }
            }
        }
        //console.log(values)
        values[n] = values[moveTarget];
        //console.log(values)

        //console.log(effects,approved)

        //alert(effects);

        var bestEffect = Math.min.apply(null,effects);
        //alert(bestEffect);
        // if(!values.includes('k')){
        //     console.log("Hello world")
        // }else{
        //     console.log("loss")
        // }
        //console.log(values)

        var tmpA = [];
        var tmpB = [];
        var tmpC = [];
        var bestMove = "";

        for(var n = 0; n < effects.length; n++){
            if(effects[n] === bestEffect){
                tmpA.push(actions[n]);
                tmpB.push(approved[n]);
                tmpC.push(effects[n]);
            }
        }
        bestMove = tmpB[tmpA.indexOf(Math.max.apply(null,tmpA))];
        //alert(effects)
        //alert(bestMove);

        
        if(bestMove){
//Automation Code for Black Ones

            // values[Number(bestMove.split("-")[1])] = values[Number(bestMove.split("-")[0])];
            // values[Number(bestMove.split("-")[0])] = 0;
            // if(values[Number(bestMove.split("-")[1])] === "p" && Number(bestMove.split("-")[1]) >= 56){
            //     values[Number(bestMove.split("-")[1])] = "q";
            // }

            // sqs[bestMove.split("-")[1]].style.background = '#aaf';
            // sqs[bestMove.split("-")[0]].style.background = '#aaf';
            //console.log(sqs[bestMove.split("-")[0]])

            for(var x = 0; x < 64; x++){
                //sqs[x].style.background = "#afa"//classList.add("scope");
                sqs[x].innerHTML = fonts[values[x]];
                if(values[x] === 0){
                    sqs[x].innerHTML = "";
                }
            }
            myTurn = true;
            oppTurn = false
        }
        else {
            //alert('You Win');
        }

        boxes = []
        document.querySelectorAll('.square').forEach(function(box){
            boxes.push(box.innerHTML)
        })
        //console.log(boxes)

        if(!boxes.includes('♚')){
            alert("White Win");
            setTimeout(function(){
                values = ['r','n','b','q','k','b','n','r','p','p','p','p','p','p','p','p',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'o','o','o','o','o','o','o','o','t','m','v','w','l','v','m','t'];
        },100);
        }else if(!boxes.includes("♔")){
            alert("Black Win");
            setTimeout(function(){
                values = ['r','n','b','q','k','b','n','r','p','p','p','p','p','p','p','p',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'o','o','o','o','o','o','o','o','t','m','v','w','l','v','m','t'];
        },100);
        }
    }
    //console.log(document.querySelector('container').classList)
}
//chooseTurn();


