let templates = {
    'gamePlay': `<div id ="scoreboard" style="position: relative;">
    <h1 class="title">Paper Cricket</h1>
    <h1 style="position: absolute; left: 400px; ">Target: n/a</h1>
    <h1 style="position: absolute; top: 110px;left: 405px; ">Runs: 23</h1> 
    <h1 style="position: absolute; right: 400px;">Balls Left: 18</h1>
    <h1 style="position: absolute; top: 110px;right: 405px;">Wickets: 3</h1>
</div>
<div id="game-box" style="position: relative; top: 150px;">
    <div class="circle-container" id="user-playarea">
        ?
    </div>
    <h1 id = "update-box">+5 runs</h1>
    <div class="circle-container" id = "opponent-playarea">
        ?
    </div>
</div>
<div id="buttons-container" style="position: relative; top: 500px; left:375px;">
    <button  id="game-btn-1" type="submit" class="run-btn">1</button>
    <button  id="game-btn-2" type="submit" class="run-btn">2</button>
    <button  id="game-btn-3" type="submit" class="run-btn">3</button>
    <button  id="game-btn-4" type="submit" class="run-btn">4</button>
    <button  id="game-btn-5" type="submit" class="run-btn">5</button>
    <button  id="game-btn-6" type="submit" class="run-btn">6</button>
</div>`,
'joinRoom': ` <p id="error-bar">error bar</p>
<form method="post" action="index.html">
    <div class="box">
    <h1>PaperCricket</h1>
    <button name="joinGameBtn" id="new-game-btn" type="submit" class="btn">Create Game</button>
    <input type="text" name="gameid" placeholder="Game ID" id="gameid-box" class="text-box" /> 
    <button name="joinGameBtn" id="join-game-btn" type="submit" class="btn">Join Game</button>
    </div>   
    </form>`
}