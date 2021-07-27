<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="src/styles/style.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lobster&family=Oswald:wght@500&display=swap" rel="stylesheet">
<title>PaperCricket</title>
</head>
<body>
	<p id="error-bar"></p>
	<form method="post">
		<div class="box">
			<h1>PaperCricket</h1>
			<button name="joinGameBtn" id="new-game-btn" type="submit"
				class="btn">Create Game</button>
			<input type="text" name="gameid" placeholder="Game ID"
				id="gameid-box" class="text-box" />
			<button name="joinGameBtn" id="join-game-btn" type="submit"
				class="btn">Join Game</button>
		</div>
	</form>
</body>
<script src="src/scripts/game/workerhandler.js"></script>
<script src="src/scripts/game/templates.js"></script>
<script src="src/scripts/game/tossview.js"></script>
<script src="src/scripts/game/roomjoinview.js"></script>
<script src="src/scripts/game/gameview.js"></script>
<script src="src/scripts/game/main.js"></script>
</html>