let templates = {
    'gamePlay': `<h1 id="title">PaperCricket</h1>
    <div class="container" id = "main-container">
        <div class="section" id="user-section">
            <div id="user-playarea" class="circle" style= "background: #C400FF;">
                ?
            </div>
    	<div id = "user-scoreboard"></div>
        </div>
        <div class="section btn-section" id ="button-section">
            <div class="buttons-container">
                <button id="game-btn-1" style="background-color: #69B34C;   margin-right: 50px;">1</button>
                <button id="game-btn-2" style="background-color: #ACB334">2</button>
            </div>
             <div class="buttons-container">
                <button id="game-btn-3" style="background-color: #FAB733; margin-right: 50px;">3</button>
                <button id="game-btn-4" style="background-color: #FF8E15; ;">4</button>
            </div>
             <div class="buttons-container">
                <button id="game-btn-5" style="background-color: #FF4E11; margin-right: 50px;">5</button>
                <button id="game-btn-6" style="background-color: #FF0D0D; ">6</button>
            </div>
            <div>
            <h1 id="update-box" style="line-height: 0px; font-size:x-large; font-family: 'Oswald'; text-align:center; color: #FF6F3C; margin-top: 35px; white-space: nowrap;"></h1>
            <h1 style=" line-height: 0px;font-size:xx-large; text-align:center; font-family: 'Oswald'; color: #FF6F3C; margin-top: 35px;"> <span id="countdown-box" style="color: #FAB733;"></span></h1>
            </div>
            
        </div>
        <div class="section" id = "opponent-section">
            <div id="opponent-playarea" class="circle" style="background: #00C1D4;">
                ?
            </div>  
           <div id = "opponent-scoreboard"></div>
        </div>
    </div>`,
    'joinRoom': ` <p id="error-bar"></p>
    	<form method="post" action="index.html">
    	<div class="box">
    	<h1>PaperCricket</h1>
    	<button name="joinGameBtn" id="new-game-btn" type="submit" class="btn">Create Game</button>
    	<input type="text" name="gameid" placeholder="Game ID" id="gameid-box" class="text-box" /> 
    	<button name="joinGameBtn" id="join-game-btn" type="submit" class="btn">Join Game</button>
    	</div>   
    	</form>`,
    'battingScoreBoard': `<h1 style=" line-height: 0px; font-size:xx-large; font-family: 'Oswald', sans-serif;text-align: center; color: #FF6F3C;">Score: <span id="Runs" style="color: #FFC93C;">0/0</span></h1> `,
    'bowlingScoreBoard': `<h1 style="line-height: 0px; font-size:xx-large; font-family: 'Oswald', sans-serif;text-align: center; color: #FF6F3C;">Overs: <span id="Balls" style="color: #FFC93C;">0.0</span></h1></div>
   `,
    'target': ` <h1 style="font-size:x-large; font-family: 'Oswald', sans-serif;text-align: center; color: #FF6F3C;">Target: <span id ="Target" style="color: #FFC93C;"></span></h1>`,
    'buttonSection' : `  <div class="section btn-section" id ="button-section">
            <div class="buttons-container">
                <button id="game-btn-1" style="background-color: #69B34C;">1</button>
                <button id="game-btn-2" style="background-color: #ACB334">2</button>
                <button id="game-btn-3" style="background-color: #FAB733;">3</button>
                <button id="game-btn-4" style="background-color: #FF8E15">4</button>
                <button id="game-btn-5" style="background-color: #FF4E11;">5</button>
                <button id="game-btn-6" style="background-color: #FF0D0D;">6</button>
            </div>
            <div>
                <h1 id="update-box" style=" font-size:x-large; font-family:'Oswald'; text-align:center; color: #FAB733; margin-top: 35px;"></h1>
            <h1 style=" font-size:x-large; text-align:center; font-family: 'Oswald'; color: #FF6F3C; margin-top: 35px;"> <span id="countdown-box" style="color: #FAB733;"></span></h1>
            </div>
            
        </div>`,
      'tossSection': `<h1 id="title">PaperCricket</h1>
    <div class="section" style="margin: auto; text-align: center; margin-top: 100px; width: 100%;  ">
        <h1 id="update-box" style=" font-size:x-large; font-family: 'Oswald'; text-align:center; color: #FAB733; margin-top: 35px; white-space: nowrap; width:100% display:inline-block  "><span id = "loading-dots" style="width: 0px; display: inline-block; text-align:center padding:0; margin: 0;"></span></h1> 
        <h1 id="countdown-box" style=" font-size:x-large; font-family: 'Oswald'; text-align:center; color: #FAB733; margin-top: 5px; white-space: nowrap; width:100% display: inline-block"><span id="countdown-box" style="color: #FAB733;"></span></h1>
    </div>`,
    'coinButtons': `     <div   style = "margin-top: 5px; text-align:center;">
            <button id="head-btn" class = "coin-btn" >Head</button>
            <button id="tail-btn" class = "coin-btn" >Tail</button>
        </div>`,
    'inningsButtons': `     <div c style = "margin-top: 5px; text-align: center;">
        <button id="bat-btn" class = "coin-btn">Batting</button>
        <button id="bowl-btn" class = "coin-btn">Bowling</button>
    </div>`,
    'roomTable' : `<table>
			<thead>
			</thead>
			<tbody>
			</tbody>
		</table>`
}