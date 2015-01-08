pzlbot.arithmetic = (function(){

	var cols = 8;
	var rows = 8;

	//------------------------------------------------------------------

	//Build a puzzle!
	var build = function() {

		var str = Math.floor(Math.random()*cols*rows);
		var end = Math.floor(Math.random()*cols*rows);

		var s=0,e=0;

		var $tbl = $("<table></table>");
		
		for(var y=0;y<rows;y++) {
			//Each row
			var $row = $("<tr></tr>");
		
			for(var x=0;x<cols;x++) {
				//Each column
				var $col = $("<td></td>");
				$col.addClass("mathcell");

				if (s++===str) {
					$col.text(0);
					$col.addClass("mathstep");
				} else if (e++===end) {
					$col.text('#');
					$col.addClass("mathgoal");
				} else {
					var num = Math.floor(Math.random()*9)+1;
					$col.text(num);
				}
				
				$row.append($col);
			}
		
			$tbl.append($row);
		}
		
		$(this).append($tbl);
	};

	//------------------------------------------------------------------

	var init = function(){
		$(".arithmetic").each(build);
	};

	init();

	return "I bot, therefore I am.";

})();