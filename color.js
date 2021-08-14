(function(K16777216)
{
	"use strict"

	K16777216.Color = (function()
	{
		function Color(red = 0, green = 0, blue = 0)
		{
			this._red = red;
			this._green = green;
			this._blue = blue;
		}

		Color.prototype.getRed = function()
		{
			return this._red;
		};

		Color.prototype.getGreen = function()
		{
			return this._green;
		};

		Color.prototype.getBlue = function()
		{
			return this._blue;
		};

		Color.prototype.getHex = function()
		{
			return this._getChannelHex(this._red) + this._getChannelHex(this._green) + this._getChannelHex(this._blue);
		};

		Color.prototype._getChannelHex = function(channelValue = 0)
		{
			let hex = channelValue.toString(16);

			if (hex.length == 1)
			{
				hex += "0";
			}

			return hex;
		};

		return Color;
	})();
})(window.K16777216 = window.K16777216 || {});