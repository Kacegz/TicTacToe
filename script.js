function playGame(firstplayer,secondplayer){
    let round=0;
    const boxes=document.querySelectorAll(".box");
    const playerFactory = (name,sign) =>{
        return {name,sign}
    };
    function getPlayers(){

    }
    const player1=playerFactory(firstplayer,'X')
    const player2=playerFactory(secondplayer,'O');
    const bot=playerFactory('bot','O');

    const gameboard = {
        board: board=["","","","","","","","",""],
        currentplayer: player1,
        refresh(){
            boxes.forEach(box=>{
                box.textContent=board[box.id];//refresh DOM with board array
            })
        }
    };
    function startPlaying(){
        boxes.forEach(box => {
            box.addEventListener('click',move);
        });
    }
    function move(e){//player makes move by clicking dom element
        board[e.target.id]=gameboard.currentplayer.sign;
        if(secondplayer=="bot"&&gameboard.board.filter(function(x){return x==""}).length!==0){
            botmove()
        }
        checkWinner(gameboard.currentplayer);
        e.target.removeEventListener('click',move)

    }
    function botmove(){
        let botChoice=Math.floor(Math.random()*9)
        console.log("bot "+botChoice)
        console.log(gameboard.board[botChoice])
        while((gameboard.board[botChoice]!=="")&&gameboard.board.filter(function(x){return x==""}).length!==0){
            
            botChoice=Math.floor(Math.random()*9)
        }
        gameboard.board[botChoice]=player2.sign;
        boxes[botChoice].removeEventListener('click',move)
        gameboard.refresh();
        checkWinner(player2)
    }
    function checkWinner(current){
        if(
        (gameboard.board[0]===current.sign && gameboard.board[1]==current.sign && gameboard.board[2]==current.sign)||
        (gameboard.board[3]===current.sign && gameboard.board[4]==current.sign && gameboard.board[5]==current.sign)||
        (gameboard.board[6]===current.sign && gameboard.board[7]==current.sign && gameboard.board[8]==current.sign)||
        (gameboard.board[0]===current.sign && gameboard.board[3]==current.sign && gameboard.board[6]==current.sign)||
        (gameboard.board[1]===current.sign && gameboard.board[4]==current.sign && gameboard.board[7]==current.sign)||
        (gameboard.board[2]===current.sign && gameboard.board[5]==current.sign && gameboard.board[8]==current.sign)||
        (gameboard.board[0]===current.sign && gameboard.board[4]==current.sign && gameboard.board[8]==current.sign)||
        (gameboard.board[2]===current.sign && gameboard.board[4]==current.sign && gameboard.board[6]==current.sign))
        {
            //if won remove event listeners and display winner
            gameboard.refresh();
            boxes.forEach(box => {
                box.removeEventListener('click',move)
            });
            console.log(current.name+" wins!")
        }else if(gameboard.board.filter(function(x){return x==""}).length===0){
            gameboard.refresh();
            console.log("tie!!!!!!!!!")
        }else{
            //if no one wins play another round and change player
            nextRound();
            if(secondplayer=="bot"){
                /*let botChoice
                do{
                    botChoice=Math.floor(Math.random()*9)
                    console.log(gameboard.board[botChoice])
                    gameboard.board[botChoice]=bot.sign
                }while(gameboard.board[botChoice]=="")
                console.log("bot "+botChoice)
                
                let botChoice=Math.floor(Math.random()*9)
                console.log("bot "+botChoice)
                console.log(gameboard.board[botChoice])
                while(gameboard.board[botChoice]!==undefined){
                    botChoice=Math.floor(Math.random()*9)
                }
                gameboard.board[botChoice]=player2.sign;
                gameboard.refresh();
                */
            }else{
                changeTurn(gameboard.currentplayer);
            }
            //changeTurn(gameboard.currentplayer);
        }
    }
    function changeTurn(currentplayer){
        if(currentplayer==player1){
            console.log( player2.name+" turn")
            return gameboard.currentplayer=player2;
        }else{
            console.log(player1.name+" turn")
            return gameboard.currentplayer=player1;
        }
    }
    const nextRound=()=>{
        round++;
        console.log("Round "+round)
        gameboard.refresh();
    }
    (function start(){
        gameboard.refresh();
        console.log("Round "+round)
        console.log(player1.name+" turn")
        startPlaying();
    })();
    
};
const modifyScreen={
    coop: function generateNicknames(){
        const panel=document.querySelector("#info");
        panel.textContent="";
        const nickinfo1=document.createElement('label')
        nickinfo1.setAttribute('for','nickname1')
        nickinfo1.setAttribute("class","nickinfo")
        nickinfo1.textContent="Enter first nickname:"
        const nickname1=document.createElement('input');
        nickname1.setAttribute("type","text")
        nickname1.setAttribute("name","nickname1")
        nickname1.setAttribute("id","nickname1")
        
        const nickinfo2=document.createElement('label')
        nickinfo2.setAttribute('for','nickname2')
        nickinfo2.setAttribute("class","nickinfo")
        nickinfo2.textContent="Enter second nickname:"
        const nickname2=document.createElement('input');
        nickname2.setAttribute("type","text")
        nickname2.setAttribute("name","nickname2")
        nickname2.setAttribute("id","nickname2")
        panel.appendChild(nickinfo1)
        panel.appendChild(nickname1)
        panel.appendChild(nickinfo2)
        panel.appendChild(nickname2)
        const applybutton=document.createElement("button");
        applybutton.setAttribute("id","apply")
        applybutton.textContent="Start game!"
        panel.appendChild(applybutton)
        applybutton.addEventListener('click',modifyScreen.sendData)
    },
    sendData: function sendData(){
        const firstplayer=document.querySelector("#nickname1").value
        const secondplayer=document.querySelector("#nickname2").value
        const panel=document.querySelector("#info");
        panel.textContent=""
        playGame(firstplayer,secondplayer)
    }
}