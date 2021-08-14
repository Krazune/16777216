(function()
{
	"use strict";

	document.addEventListener("DOMContentLoaded", start);

	function start()
	{
		let backgroundElement = document.body;

		let colorPicker = document.getElementById("color-picker");
		let guessButton = document.getElementById("guess-button");

		let resetGuessesButton = document.getElementById("reset-guesses-button");

		let correctGuessesDisplay = document.getElementById("correct-guesses-display");
		let incorrectGuessesDisplay = document.getElementById("incorrect-guesses-display");

		let correct = window.localStorage.getItem("correct");

		if (correct === null)
		{
			correct = 0;
		}

		let incorrect = window.localStorage.getItem("incorrect");

		if (incorrect === null)
		{
			incorrect = 0;
		}

		let game = new K16777216.GuessGame(parseInt(correct), parseInt(incorrect));

		updateGuessesDisplays(game, correctGuessesDisplay, incorrectGuessesDisplay);

		game.setGuessesUpdatedCallback(function(correctGuesses, incorrectGuesses)
		{
			updateLocalStorageGuesses(game);
			updateGuessesDisplays(game, correctGuessesDisplay, incorrectGuessesDisplay);
		});

		game.setGuessCompleteCallback(function(isCorrectGuess, correctGuesses, incorrectGuesses)
		{
			updateBackgroundColor(backgroundElement, game);
		});

		guessButton.addEventListener("click", function()
		{
			guess(game, colorPicker.value.substr(1, colorPicker.value.length));
		});

		resetGuessesButton.addEventListener("click", function()
		{
			window.localStorage.clear();
			game.resetGuesses();
		});
	}

	function guess(game, hex)
	{
		game.guessHex(hex);
	}

	function updateLocalStorageGuesses(game)
	{
		window.localStorage.setItem("correct", game.getCorrectGuesses().toString());
		window.localStorage.setItem("incorrect", game.getIncorrectGuesses().toString());
	}

	function updateCorrectGuessesDisplay(correctGuessesDisplay, newCount)
	{
		correctGuessesDisplay.innerHTML = newCount.toString();
	}

	function updateIncorrectGuessesDisplay(incorrectGuessesDisplay, newCount)
	{
		incorrectGuessesDisplay.innerHTML = newCount.toString();
	}

	function updateGuessesDisplays(game, correctGuessesDisplay, incorrectGuessesDisplay)
	{
		updateCorrectGuessesDisplay(correctGuessesDisplay, game.getCorrectGuesses());
		updateIncorrectGuessesDisplay(incorrectGuessesDisplay, game.getIncorrectGuesses());
	}

	function updateBackgroundColor(backgroundElement, game)
	{
		backgroundElement.style.backgroundColor = "#" + game.getCurrentColor().getHex();
	}
})();