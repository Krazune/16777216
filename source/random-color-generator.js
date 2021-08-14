(function(K16777216)
{
	"use strict"

	K16777216.RandomColorGenerator = (function()
	{
		function RandomColorGenerator()
		{
			this._color = new K16777216.Color();
		}

		RandomColorGenerator.prototype.generate = function()
		{
			let newRed = this._getRandomChannelValue();
			let newGreen = this._getRandomChannelValue();
			let newBlue = this._getRandomChannelValue();

			return new K16777216.Color(newRed, newGreen, newBlue);
		};

		RandomColorGenerator.prototype.getColor = function()
		{
			return this._color;
		};

		RandomColorGenerator.prototype._getRandomChannelValue = function()
		{
			return Math.floor(Math.random() * 256);
		};

		return RandomColorGenerator;
	})();
})(window.K16777216 = window.K16777216 || {});