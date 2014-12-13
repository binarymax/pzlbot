var KeepAware = (function(){

	var _width,_height,imagedata;

	//------------------------------------------------------------------
	//Initializes a canvas/div width and height
	$.fn.canvas = function(width,height,scale) {
		var canvas = this;
		scale = scale || 1;
		width  = parseInt(width||_width) * scale;
		height = parseInt(height||_height) * scale;
		canvas[0].width  = width;
		canvas[0].height = height;
		canvas.css("width",width + 'px');
		canvas.css("height",height + 'px');
		canvas.data("scale",scale);
		return canvas;
	};
	
	//------------------------------------------------------------------
	//Initializes the context of a canvas
	$.fn.loadimage = function(src) {
		var canvas = this;
		var context = canvas[0].getContext('2d');
		var image = new Image();
		image.onload = function() {
			_width = image.width;
			_height = image.height
			canvas.canvas(_width,_height);
			context.drawImage(image, 0, 0);
			imagedata = context.getImageData(0, 0, _width,_height);
		}
		image.src = src;
		return this;
	};

	//------------------------------------------------------------------

	var display = function(obj) {
		var str = typeof obj==="object"?JSON.stringify(obj):obj;
		$("#coords").text(str);
	}

	//------------------------------------------------------------------

	var onChange = function(c){
		$("#x1").val(c.x);
		$("#y1").val(c.y);
		$("#x2").val(c.x2);
		$("#y2").val(c.y2);
		display(c);
	};

	var onColorStart = function(){
		$("#imagepreview").parent().hide();
		$("#canvaspreview").show();
	};

	var onColorPick = function(){
		$("#imagepreview").parent().show();
		$("#canvaspreview").hide();
	};

	//------------------------------------------------------------------

	var onSubmit = function(e){
		e.preventDefault();
		e.stopPropagation();

		var imgid = $("#image").val();
		var body = {};
		var url = "/calibrations/" + imgid;

		$("#calibrate > input").each(function(){
			var itm = $(this);
			var key = itm.attr("name");
			var val = itm.val();
			if (key) body[key] = val;
		});

		display(body);

		$.ajax(url,{
			type:"PUT",
			data:body
		});

		return false;
	};

	//------------------------------------------------------------------

	var setPreview = function() {
		var image = $("#imagepreview");
		image.parent().show();
		$("#canvaspreview").loadimage(image.attr("src")).hide();
	}

	var init = function(){
		setPreview();
		$("#calibrate").on("submit",onSubmit);
		$("#colorpick").on("click",onColorStart);
		$('#imagepreview').Jcrop({onChange:onChange});
	};

	return {init:init};

})();