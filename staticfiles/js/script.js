//answers
const greetings = ['Hello Mate', 'How are you doing today?', 'Good morning, are you ready for Chess?']


//dom
const mainContainer = document.querySelector('.main-container')
const btn = document.querySelector('.talk');
const fullName = document.querySelector('.Full_Name');
const chessAuto = document.querySelector('.With_Assistant');
const chessMan = document.querySelector('.With_Player');
const chessScript = document.getElementById('chessScript');
const form = document.querySelector('.basic-form')




const speechRecog = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecog
const speech = new SpeechSynthesisUtterance;

recognition.onstart = function(){
    console.log("We are Listening")
}

recognition.onresult = function(e){
    //console.log("Voice Recognition Ended")
    const transcript = e.results[0][0].transcript;
    //content.textContent = transcript;
    readSentences(transcript)
}


//btn hover effect
btn.addEventListener('mouseenter', function(e){
    e.target.textContent = 'PRESS TO TALK'
    e.target.style.width = '200px'
    e.target.style.boxShadow = '5px 5px 5px 6px #ccc'
})
btn.addEventListener('mouseleave', function(e){
    e.target.textContent = 'TALK'
    e.target.style.width = '150px'
    e.target.style.boxShadow = '3px 3px 5px 6px #ccc'
})
//add the listener to button
btn.addEventListener('click', function(e){
    window.speechSynthesis.cancel()
    recognition.start();
})


//main function
function readSentences(message){
    // Browser support messages. (You might need Chrome 33.0 Beta)
    if (!('speechSynthesis' in window)) {
        alert("You don't have speechSynthesis in your browser.");
    }else {
        const fallback = speech.text = "I don't know what you said.";
    
        //condition whether the user inpur includes some keyword or not
        if(message.toLowerCase().includes('hi') || message.toLowerCase().includes("hello") || message.toLowerCase().includes("how are you") || message.toLowerCase().includes("good") || message.toLowerCase().includes("hai")){
            const finalText = greetings[Math.floor(Math.random() * greetings.length)] + 'Please say, Start a game to start a new game';
            speech.text = finalText;
        }else if(message.toLowerCase().includes('start')){
            const finalText = "Okay, new Game is Starting, We don't store your information since we don't have budget for a server, you can say your name so that we can start this game. Please say 'My name is Bla Bla Bla'";
            speech.text = finalText;
        }else if(message.toLowerCase().includes('name')){
            const name = message.toUpperCase().replace('MY NAME IS ','')
            console.log(name)
            fullName.value = name.toUpperCase()
            const finalText = `Okay, so your name is ${name}. Before starting this game let me ask you one more question, Do you have anyone with you to play Chess or you are like me alone? You can say 'Play with Assistant' to play with me. If you have a partner, you can say play with my partner or multiplayer. Again I'm repeating, say Play with Assistant to play with me, or say multiplayer`;
            speech.text = finalText;
        }else if(message.toLowerCase().includes('assistant') || message.toLowerCase().includes("system")){
            const finalText = "Okay, so you want to play with me? That's cool. I'm ready to win.";
            speech.text = finalText;
            setTimeout(function(){
                chessAuto.click();
            }, 6000)
        }else if(message.toLowerCase().includes('multiplayer') || message.toLowerCase().includes("partner")){
            const finalText = "Why? If you don't like my voice you can change it to female. I really wanted to play with you. None the less You're game is getting ready.. Good luck";
            speech.text = finalText;
            setTimeout(function(){
                chessMan.click();
            }, 15000)
        }else{

        }

        //voice equilizer
        speech.volume = 1
        speech.pitch = 1
        speech.rate = 1
        window.speechSynthesis.speak(speech)
    }
}




// //chess automatic open
// chessAuto.addEventListener('click', function(e){
//     window.open("./chess.htm");
// })

// //chess manual open
// chessMan.addEventListener('click', function(e){
//     window.open("./man_chess.htm");
// })

