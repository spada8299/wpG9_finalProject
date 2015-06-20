Parse.initialize("9QneXdZeemlrFssrENAhKZSQ51hEtRGKerQAvhag", "vt92TSBq2yak0SXvvfcGE6TtuuZbrA5oxy03pFmo");
// var TestObject = Parse.Object.extend("TestObject");
// var testObject = new TestObject();
// testObject.save({foo: "bar"}).then(function(object) {
//   alert("yay! it worked");
// });

var choosenTag, choosenEdu, choosenProduct;

var getEduCard = function (tag) {
	var Education2 = Parse.Object.extend("education");
	var query2 = new Parse.Query(Education2);
	query2.equalTo("tag", tag);
	query2.find({
		success: function(eduCardArray){
			// alert('success!');
			console.log(eduCardArray);
			$('#transTitle').text("學化妝 - "+ tag);
			var edu = eduCardArray;
			for(var i=0; i<edu.length; i++){
				var someText = '<div class="col-md-6 edu-card">\
					<div class="col-md-6">\
						<img src="img/edu/'+ edu[i].get('number') +'-after.jpg" class="edu-card-pic">\
					</div>\
					<div class="col-md-6">\
						<h3>'+ edu[i].get('title') +'</h3>\
						<table class="table table-condensed">\
					    <tbody>\
					      <tr>\
					        <th>步驟</th>\
					        <td>'+ edu[i].get('steps').length +'</td>\
					       </tr>\
					       <tr>\
					        <th>難易度</th>\
					        <td>'+ getStar(edu[i].get('easy')) +'</td>\
					      </tr>\
					      <tr>\
					        <th>適合</td>\
					        <td>'+ edu[i].get('skin') +'<br>'+ edu[i].get('faceshape') +'<br>'+ edu[i].get('eyestyle') +'</td>\
					      </tr>\
					      <tr>\
					      	<th>所屬類別</th>\
					      	<td>'+ edu[i].get('tag') +'</td>\
					      </tr>\
					    </tbody>\
					  </table>\
				  </div>\
				</div>';
     		var newDiv = $(someText).click(edu[i].get('title'), toEdu);
				$('#transBody').append(newDiv);
			}
		},
		error: function(error){
			alert("error:" + error.message);
		}
	});
}, getProductCard = function (tag) {
	var Product = Parse.Object.extend("product");
	var query3 = new Parse.Query(Product);
	query3.equalTo("tag", tag);
	query3.find({
		success: function(proCardArray){
			alert('success!');
			console.log(proCardArray);
		},
		error: function(error){
			alert("error:" + error.message);
		}
	});
}, getEdu = function (title) {
	var Education = Parse.Object.extend("education");
	var query = new Parse.Query(Education);
	query.equalTo("title", title);
	query.find({
		success: function(eduObj) {
			// alert('edu catch!');
			console.log(eduObj);
			var edu = eduObj[0];
			$('#eduTitle').text(edu.get('title'));
			$('#eduDate').text("撰寫日期: " + edu.get('date'));
			$('#eduBeforePic').attr("src", "img/edu/" + edu.get('number') + "-before.jpg");
			$('#eduAfterPic').attr("src", "img/edu/" + edu.get('number') + "-after.jpg");
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
				$('#eduAllProduct').append('<img src="img/product/' + decodeURI(allProducts[i]) + '.jpg" class="col-md-6 product-pic">');
			}
			var steps = edu.get('steps');
			var tips = edu.get('tips');
			for(var i=0; i<steps.length; i++){
				if(tips[i] === "0"){
					$('#eduSteps').append('<div class="col-md-12 step-box">\
						<div>STEP '+ (i+1) +'</div>\
						<div class="col-md-6">\
						<img src="img/edu/'+ edu.get('number') +'-'+ (i+1) +'.jpg" class="step-pic">\
						<p class="well well-lg">'+ steps[i] +'</p>\
						<p></p>\
					</div>\
					<div class="col-md-6">\
						<img src="img/product/'+ decodeURI(allProducts[i]) +'.jpg" class="product-pic">\
						<p>'+ allProducts[i] +'</p>\
					</div>\
				</div>');
				} else {
					$('#eduSteps').append('<div class="col-md-12 step-box">\
							<div>STEP '+ (i+1) +'</div>\
							<div class="col-md-6">\
							<img src="img/edu/'+ edu.get('number') +'-'+ (i+1) +'.jpg" class="step-pic">\
							<p class="well well-lg">'+ steps[i] +'</p>\
							<p class="well well-lg">Tips: '+ tips[i] +'</p>\
						</div>\
						<div class="col-md-6">\
							<img src="img/product/'+ decodeURI(allProducts[i]) +'.jpg" class="product-pic">\
							<p>'+ allProducts[i] +'</p>\
						</div>\
					</div>');
				}
			}
			$('#finishPic').attr("src", "img/edu/"+ edu.get('number') +"-after.jpg");
		},
		error: function(error){
			alert("error:" + error.message);
		}
	});
}, getProduct = function () {
}, getValue = function (varname) {
	var url = window.location.href;
  var qparts = url.split("?");
  if (qparts.length == 0){return "";}
  var query = qparts[1];
  var vars = query.split("&");
  var value = "";
  for (i=0; i<vars.length; i++)
  {
    var parts = vars[i].split("=");
    if (parts[0] == varname)
    {
      value = parts[1];
      break;
    }
  }
  value = decodeURI(value);
  value.replace(/\+/g," ");
  return value;
}, getStar = function(num){
	if(num===1){
		return '<i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>';
	} else if(num===2){
		return '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-o"></i>';
	} else {
		return '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
	}
}, toEdu =  function (event){
	// alert(event.data);
	var key = event.data;
	window.location = 'education_1.html?title=' + key; 
};

$(document).ready(function(){
    $(".nav-dropdown").hover(
        function() { $('.nav-dropdown-menu', this).fadeIn("fast");
        },
        function() { $('.nav-dropdown-menu', this).fadeOut("fast");
    });
    $("#openAllProduct").on('click', function(){
    	$(".all-product").slideToggle('fast');
    });
    $('nav ul li.edu ul li ul li').on('click', function(){//to edu trans.
    	var key = $(this).text();
    	// key = decodeURI(key);
      // console.log(key);
    	window.location = 'transition_1.html?type=1&tag=' + key;
    });
    $('nav ul li.pro ul li ul li').on('click', function(){//to pro trans.
    	var key = $(this).text();
    	// key = decodeURI(key);
      // console.log(key);
    	window.location = 'transition_1.html?type=2&tag=' + key;
    });
});