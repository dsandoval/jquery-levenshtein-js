/*
 * jquery.levenshtein.js
 * Based in String.levenshtein (https://github.com/thinkphp/String.levenshtein)
 * 
 * Copyright 2014 Danilo A Sandoval <dsandoval@sernac.cl>
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 * 
 * 
 */

/* You need JQUERY */
/* Tested in jQuery v1.11.0 */

(function( $ ){

	$.fn.levenshtein = function(words) {

		function minimun(a,b,c) {
	    	var min = a;
	        if(b < min) { min = b; }
	        if(c < min) { min = c; }
	      	return min;
	    }

		var suggestion = new Array, cost = new Array();
		var str1, str2, n, m, i, j;

		str1 = $(this).val();
		n = str1.length;

		if (n == 0) { return false; }

		$.each(words,function (index,str2) {
			
			m = str2.length;

			if (m == 0) { return false; }

			for(i=0;i<=n;i++) { cost[i] = new Array(); cost[i][0] = i; }

			for(j=0;j<=m;j++) { cost[0][j] = j; }

			for(i=1;i<=n;i++) {

				var x = str1.charAt(i-1);
				for(j=1;j<=m;j++) {
					var y = str2.charAt(j-1);
					if(x == y) {
						cost[i][j] = cost[i-1][j-1];
					} else {
						cost[i][j] = 1 + minimun(cost[i-1][j-1], cost[i][j-1], cost[i-1][j]);
					}
				}

			}

			if (cost[n][m] >= 0 && cost[n][m] <=3) {
				suggestion.push(str2);
			}

		});

		return suggestion;
		
    }

})( jQuery );
