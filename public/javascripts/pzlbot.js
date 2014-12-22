var pzlbot = (function(){

	var duration = 200;

	//------------------------------------------------------------------

	var onCorrect = function(type,id,solution) {
		var div = "#" + type;
		$(div + " > .card-input").slideUp(duration);
		$(div + " > .card-incorrect").slideUp(duration);
		$(div + " > .card-correct").slideDown(duration);

	};

	//------------------------------------------------------------------

	var onIncorrect = function(type,id,solution) {
		var div = "#" + type;
		$(div + " > .card-incorrect").slideDown(duration);
	};

	//------------------------------------------------------------------

	var onDone = function(type,id,solution) {
		return function(data) {
			if(data&&data.d&&data.d.results&&data.d.results.length) {
				data.d.results[0].correct ? onCorrect(type,id,solution) : onIncorrect(type,id,solution);
			} else {
				console.log('error');
			}
		}
	};

	var onFail = function(type,id,solution) {
		return function(xhr,status) {
			console.log(status);
		}
	};

	//------------------------------------------------------------------

	var onLocalSubmit = function(e){
		e.preventDefault();
		e.stopPropagation();

		var form = $(this);
		var type = form.attr("data-type");
		var id = $("#"+type+"id").val();
		var solution = $("#"+type+"text").val();
		var answer = $("#"+type+"answer").val();

		console.log(solution,answer,type);
		(solution.toLowerCase() === answer.toLowerCase()) ? onCorrect(type,id,solution) : onIncorrect(type,id,solution);

		return false;
	};

	//------------------------------------------------------------------

	var onRemoteSubmit = function(e){
		e.preventDefault();
		e.stopPropagation();

		var form = $(this);
		var type = form.attr("data-type");
		var id = $("#"+type+"id").val();
		var solution = $("#"+type+"text").val();

		var url = "/solutions/" + id;
		var body = {solution:solution};
		var opts = {
			type:"POST",
			data:body,
			dataType:"json"
		};

		$("#" + type + " > .card-incorrect").slideUp(duration);

		$.ajax(url,opts)
			.done(onDone(type,id,solution))
			.fail(onFail(type,id,solution))

		return false;
	};

	//------------------------------------------------------------------

	var init = function(){
		$("form:not(.local)").on("submit",onRemoteSubmit);
		$("form.local").on("submit",onLocalSubmit);
	};

	init();

	return "I solve, therefore I am.";

})();