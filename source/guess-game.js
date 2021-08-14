(function(K16777216)
{
	"use strict"

	K16777216.GuessGame = (function()
	{
		function GuessGame(initialCorrectGuesses = 0, initialIncorrectGuesses = 0)
		{
			this._correctGuesses = initialCorrectGuesses;
			this._incorrectGuesses = initialIncorrectGuesses;

			this._currentColor = null;

			this._guessesUpdatedCallback = null;
			this._guessCompleteCallback = null;
		}

		GuessGame.prototype.getCorrectGuesses = function()
		{
			return this._correctGuesses;
		};

		GuessGame.prototype.getIncorrectGuesses = function()
		{
			return this._incorrectGuesses;
		};

		GuessGame.prototype.getCurrentColor = function()
		{
			return this._currentColor;
		};

		GuessGame.prototype.guess = function(color)
		{
			let colorGenerator = new K16777216.RandomColorGenerator();

			this._currentColor = colorGenerator.generate();

			let correctGuess = false;

			if (color.getRed() == this._currentColor.getRed() &&
				color.getGreen() == this._currentColor.getGreen() &&
				color.getBlue() == this._currentColor.getBlue())
			{
				++this._correctGuesses;

				correctGuess = true;

				if (this._guessCompleteCallback != null)
				{
					this._guessCompleteCallback(true, this._correctGuesses, this._incorrectGuesses);
				}
			}
			else
			{
				++this._incorrectGuesses;

				if (this._guessCompleteCallback != null)
				{
					this._guessCompleteCallback(false, this._correctGuesses, this._incorrectGuesses);
				}
			}

			if (this._guessesUpdatedCallback != null)
			{
				this._guessesUpdatedCallback(this._correctGuesses, this._incorrectGuesses);
			}

			return true;
		};

		GuessGame.prototype.guessHex = function(hex)
		{
			let colorValue = parseInt(hex, 16);
			let red = (colorValue >> 16) & 255;
			let green = (colorValue >> 8) & 255;
			let blue = colorValue & 255;

			return this.guess(new K16777216.Color(red, green, blue));
		};

		GuessGame.prototype.resetGuesses = function()
		{
			this._correctGuesses = 0;
			this._incorrectGuesses = 0;

			if (this._guessesUpdatedCallback != null)
			{
				this._guessesUpdatedCallback(this._correctGuesses, this._incorrectGuesses);
			}
		};

		GuessGame.prototype.setGuessesUpdatedCallback = function(callback)
		{
			this._guessesUpdatedCallback = callback;
		};

		GuessGame.prototype.setGuessCompleteCallback = function(callback)
		{
			this._guessCompleteCallback = callback;
		};

		return GuessGame;
	})();
})(window.K16777216 = window.K16777216 || {});