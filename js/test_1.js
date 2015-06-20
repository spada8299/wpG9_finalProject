Parse.initialize("9QneXdZeemlrFssrENAhKZSQ51hEtRGKerQAvhag", "vt92TSBq2yak0SXvvfcGE6TtuuZbrA5oxy03pFmo");
// var TestObject = Parse.Object.extend("TestObject");
// var testObject = new TestObject();
// testObject.save({foo: "bar"}).then(function(object) {
//   alert("yay! it worked");
// });

var Education = Parse.Object.extend("education");
var query = new Parse.Query(Education);
query.equalTo("number", 1);
query.find({
	success: function(eduObj) {
		// alert('edu catch!');
		console.log(eduObj);
		var edu = eduObj[0];
		$('#eduTitle').text(edu.get('title'));
		// $('#eduDate').text(edu.get('date'));
		$('#eduBeforePic').attr("src", "img/edu/" + 1 + "-before.png");
		$('#eduAfterPic').attr("src", "img/edu/" + 1 + "-after.png");
		var tags = edu.get('tag');
		for(var i=0; i<tags.length; i++){
			$('#eduTags').append('<a href="" class="btn btn-default">'+ tags[i] + '</a>');
		}
		$('#eduDescribe').text(edu.get('describe'));
		$('#eduStepCounts').text(edu.get('steps').length);
		if(edu.get('easy') === 1){
			$('#eduEasy').append('<i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>');
		} else if(edu.get('easy') === 2){
			$('#eduEasy').append('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-o"></i>');
		} else {
			$('#eduEasy').append('<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>');
		}
		$('#eduSkin').text(edu.get('skin'));
		$('#eduFaceshape').text(edu.get('faceshape'));
		$('#eduEyestyle').text(edu.get('eyestyle'));
		var allProducts = edu.get('products');
		for(var i=0; i<allProducts.length; i++){
			$('#eduAllProduct').append('<img src="img/product/' + allProducts[i] + '.png" class="col-md-6 product-pic">');
		}
		var steps = edu.get('steps');
		var tips = edu.get('tips');
		for(var i=0; i<steps.length; i++){
			if(tips[i] === "0"){
				$('#eduSteps').append('<div class="col-md-12 step-box">\
					<div>STEP '+ (i+1) +'</div>\
					<div class="col-md-6">\
					<img src="img/edu/1-'+ (i+1) +'.png" class="step-pic">\
					<p class="well well-lg">'+ steps[i] +'</p>\
					<p></p>\
				</div>\
				<div class="col-md-6">\
					<img src="img/product/'+ allProducts[i] +'.png" class="product-pic">\
					<p>'+ allProducts[i] +'</p>\
				</div>\
			</div>');
			} else {
				$('#eduSteps').append('<div class="col-md-12 step-box">\
						<div>STEP '+ (i+1) +'</div>\
						<div class="col-md-6">\
						<img src="img/edu/1-'+ (i+1) +'.png" class="step-pic">\
						<p class="well well-lg">'+ steps[i] +'</p>\
						<p class="well well-lg">Tips: '+ tips[i] +'</p>\
					</div>\
					<div class="col-md-6">\
						<img src="img/product/'+ allProducts[i] +'.png" class="product-pic">\
						<p>'+ allProducts[i] +'</p>\
					</div>\
				</div>');
			}
		}
		$('#finishPic').attr("src", "img/edu/"+ 1 +"-after.png");
	},
	error: function(error){
		alert("error:" + error.message);
	}
});

$(document).ready(function(){
    $(".nav-dropdown").hover(
        function() { $('.nav-dropdown-menu', this).fadeIn("fast");
        },
        function() { $('.nav-dropdown-menu', this).fadeOut("fast");
    });
    $("#openAllProduct").on('click', function(){
    	$(".all-product").slideToggle('fast');
    });
});