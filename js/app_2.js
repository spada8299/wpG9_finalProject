Parse.initialize("9QneXdZeemlrFssrENAhKZSQ51hEtRGKerQAvhag", "vt92TSBq2yak0SXvvfcGE6TtuuZbrA5oxy03pFmo");
// var TestObject = Parse.Object.extend("TestObject");
// var testObject = new TestObject();
// testObject.save({foo: "bar"}).then(function(object) {
//   alert("yay! it worked");
// });

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
				if(i%2===0 && i!==0){
					$('#transBody').append('<div class="col-md-12"></div>');
				}
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
			// alert('success!');
			console.log(proCardArray);
			$('#transTitle').text("化妝箱 - "+ tag);
			var pro = proCardArray;
			for(var i=0; i<pro.length; i++){
				if(i%3===0 && i!==0){
					$('#transBody').append('<div class="col-md-12"></div>');
				}
				var someText = '<div class="col-md-4 product-card">\
					<h3>'+ pro[i].get('productname') +'</h3>\
					<img src="img/product/'+ pro[i].get('productname') +'.jpg" class="pro-card-pic">\
				</div>';
     		var newDiv = $(someText).click(pro[i].get('productname'), toPro);
				$('#transBody').append(newDiv);
			}
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
				$('#eduTags').append('<a href="transition_1.html?type=1&tag='+ tags[i] +'" class="btn btn-default">'+ tags[i] + '</a>');
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
			var unique = allProducts.filter(function(elem, index, self) {
			  return index === self.indexOf(elem);
			});
			for(var i=0; i<unique.length; i++){
				if(unique[i]==="0"){
					continue;
				}
				$('#eduAllProduct').append('<a href="product_1.html?productname='+ decodeURI(unique[i]) +'"><img src="img/product/' + decodeURI(unique[i]) + '.jpg" class="col-md-6 product-pic"></a>');
			}
			var steps = edu.get('steps');
			var tips = edu.get('tips');
			for(var i=0; i<steps.length; i++){
				if(tips[i] === "0" && allProducts[i] !== "0"){ //沒tip,有工具
					$('#eduSteps').append('<div class="col-md-10 col-md-offset-1 step-box">\
						<p class="step-cnt">STEP '+ (i+1) +'</p>\
						<div class="col-md-4">\
						<img src="img/edu/'+ edu.get('number') +'-'+ (i+1) +'.jpg" class="step-pic">\
					</div>\
					<div class="col-md-8">\
							<p class="well well-lg">'+ steps[i] +'</p>\
							<p></p>\
							<a href="product_1.html?productname='+ decodeURI(allProducts[i]) +'">\
							<div><img src="img/product/'+ decodeURI(allProducts[i]) +'.jpg" class="product-pic">\
								<p>'+ allProducts[i] +'</p>\
							</div></a>\
						</div>\
					</div>');
				} else if(tips[i]==="0" && allProducts[i]==="0"){ //沒tip,沒工具
					$('#eduSteps').append('<div class="col-md-10 col-md-offset-1 step-box">\
						<p class="step-cnt">STEP '+ (i+1) +'</p>\
						<div class="col-md-4">\
						<img src="img/edu/'+ edu.get('number') +'-'+ (i+1) +'.jpg" class="step-pic">\
					</div>\
					<div class="col-md-8">\
							<p class="well well-lg">'+ steps[i] +'</p>\
							<p></p>\
						</div>\
					</div>');
				} else if(tips[i]!=="0" && allProducts[i]==="0"){ //有tip,沒工具
					$('#eduSteps').append('<div class="col-md-10 col-md-offset-1 step-box">\
							<p class="step-cnt">STEP '+ (i+1) +'</p>\
							<div class="col-md-4">\
							<img src="img/edu/'+ edu.get('number') +'-'+ (i+1) +'.jpg" class="step-pic">\
						</div>\
						<div class="col-md-8">\
							<p class="well well-lg">'+ steps[i] +'</p>\
							<p class="well well-lg">Tips: '+ tips[i] +'</p>\
						</div>\
					</div>');
				} else { //有tip,有工具
					$('#eduSteps').append('<div class="col-md-10 col-md-offset-1 step-box">\
							<p class="step-cnt">STEP '+ (i+1) +'</p>\
							<div class="col-md-4">\
							<img src="img/edu/'+ edu.get('number') +'-'+ (i+1) +'.jpg" class="step-pic">\
						</div>\
						<div class="col-md-8">\
							<p class="well well-lg">'+ steps[i] +'</p>\
							<p class="well well-lg">Tips: '+ tips[i] +'</p>\
							<a href="product_1.html?productname='+ decodeURI(allProducts[i]) +'">\
							<div><img src="img/product/'+ decodeURI(allProducts[i]) +'.jpg" class="product-pic">\
								<p>'+ allProducts[i] +'</p>\
							</div></a>\
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

	var OtherEdu = Parse.Object.extend("education");
	var query5 = new Parse.Query(OtherEdu);
	query5.notEqualTo("title", title);
	query5.find({
		success: function(otherArray){
			console.log(otherArray);
			var other = otherArray;
			for(var i=0; i<3; i++){
				$('#eduOther').append('<div class="col-md-4 other-card">\
					<a href="education_1.html?title='+ other[i].get('title') +'">\
						<img src="img/edu/'+ other[i].get('number') +'-after.jpg" class="other-pic">\
						<h3>'+ other[i].get('title') +'</h3>\
					</a>\
				</div>');
			}
		},
		error: function(error){
			alert("error:" + error.message);
		}
	});
}, getProduct = function (productname) {
	var Product2 = Parse.Object.extend("product");
	var query4 = new Parse.Query(Product2);
	query4.equalTo("productname", productname);
	query4.find({
		success: function(proObj){
			console.log(proObj);
			var pro = proObj[0];
			$('#proBigPic').attr("src", "img/product/"+ pro.get('productname') +".jpg");
			$('#proSmPic1').attr("src", "img/product/"+ pro.get('productname') +"-1.jpg");
			$('#proSmPic2').attr("src", "img/product/"+ pro.get('productname') +"-2.jpg");
			$('#proSmPic3').attr("src", "img/product/"+ pro.get('productname') +"-3.jpg");
			$('#proName').text(pro.get('productname'));
			$('#proPlace').text(pro.get('place'));
			$('#proPrice').append('<i class="fa fa-usd"></i>'+ pro.get('price'));
			var using = pro.get('using');
			var usingNum = pro.get('using_num');
			for(var i=0; i<using.length; i++){
				$('#proToEdu').append('<div class="col-md-4">\
						<a href="education_1.html?title='+ using[i] +'">\
							<img src="img/edu/'+ usingNum[i] +'-after.jpg" class="other-pic">\
							<h3>'+ using[i] +'</h3>\
						</a>\
					</div>');
			}
				
		},
		error: function(error){
			alert("error: " + error.message);
		}
	});
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
}, toEdu = function (event){
	// alert(event.data);
	var key = event.data;
	window.location = 'education_1.html?title=' + key; 
}, toPro = function (event){
	var key = event.data;
	window.location = 'product_1.html?productname=' + key;
}, getIndexEdu = function(){
	var IndexEdu = Parse.Object.extend("education");
	var query6 = new Parse.Query(IndexEdu);
	query6.containedIn("title", ["超正女神妝系列→粉紅色淚滴效果的穗花彩妝","電眼美眸祕技大揭露－－假睫毛教學文","簡易日常咬唇妝教學"]);
	query6.find({
		success: function(indexEduArray){
			console.log(indexEduArray);
			var iEdu = indexEduArray;
			for(var i=0; i<3; i++){
				$('#indexEduHref' + (i+1)).attr("href", "education_1.html?title=" + iEdu[i].get('title'));
				$('#indexEduPic' + (i+1)).attr("src", "img/edu/"+ iEdu[i].get('number') +"-after.jpg");
				$('#indexEduTitle' + (i+1)).text(iEdu[i].get('title'));
				$('#indexEduDescribe' + (i+1)).text(iEdu[i].get('describe'));
			}
		},
		error: function(error){
			alert("error: " + error.message);
		}
	});
}, getBeginEdu = function(){
	var BeginEdu = Parse.Object.extend("education");
	var query7 = new Parse.Query(BeginEdu);
	query7.equalTo("easy", 1);
	query7.find({
		success: function(beginEduArray){
			console.log(beginEduArray);
			var bEdu = beginEduArray;
			for(var i=0; i<3; i++){
				$('#beginnerEdu').append('<div class="col-md-4">\
						<a href="education_1.html?title='+ bEdu[i].get('title') +'">\
							<img src="img/edu/'+ bEdu[i].get('number') +'-after.jpg" class="other-pic">\
							<h3>'+ bEdu[i].get('title') +'</h3>\
						</a>\
					</div>');
			}
		},
		error: function(error){
			alert("error: " + error.message);
		}
	});
}, getAllEdu = function () {
	var AllEdu = Parse.Object.extend("education");
	var query8 = new Parse.Query(AllEdu);
	query8.find({
		success: function(EduArray){
			console.log(EduArray);
			var edu = EduArray;
			$('#transTitle').text("學化妝");
			for(var i=0; i<edu.length; i++){
				if(i%2===0 && i!==0){
					$('#transBody').append('<div class="col-md-12"></div>');
				}
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
			alert("error: " + error.message);
		}
	});
}, getAllPro = function () {
	var Product = Parse.Object.extend("product");
	var query3 = new Parse.Query(Product);
	query3.find({
		success: function(proCardArray){
			// alert('success!');
			console.log(proCardArray);
			$('#transTitle').text("化妝箱");
			var pro = proCardArray;
			for(var i=0; i<pro.length; i++){
				if(i%3===0 && i!==0){
					$('#transBody').append('<div class="col-md-12"></div>');
				}
				var someText = '<div class="col-md-4 product-card">\
					<h3>'+ pro[i].get('productname') +'</h3>\
					<img src="img/product/'+ pro[i].get('productname') +'.jpg" class="pro-card-pic">\
				</div>';
     			var newDiv = $(someText).click(pro[i].get('productname'), toPro);
				$('#transBody').append(newDiv);
			}
		},
		error: function(error){
			alert("error:" + error.message);
		}
	});
};

$(document).ready(function(){
    $(".nav-dropdown").hover(
        function() { $('.nav-dropdown-menu', this).fadeIn("fast");
        },
        function() { $('.nav-dropdown-menu', this).fadeOut("fast");
    });
    $('[data-toggle="tooltip"]').tooltip();
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
    $('nav ul li.edu').on('click', function(){
    	window.location = 'transition_1.html?type=3';
    });
    $('nav ul li.pro').on('click', function(){
    	window.location = 'transition_1.html?type=4';
    });
    $('#allEdu').on('click', function(){
    	window.location = 'transition_1.html?type=3';
    });
    $('nav>ul>li#eduNav').tooltip({title: "<h5>學化妝</h5><h6>Beauty Up將化妝教學文章分成了六個類別，分別為部位、場合、風格、色調、季節、臉型，希望能幫助您快速找到需要的教學文章哦！</h6>", html: true, placement: "top"});
    $('nav>ul>li#proNav').tooltip({title: "<h5>化妝箱</h5><h6>點進去可以看到化妝產品的價錢、通路，以及最重要的──使用教學文哦！</h6>", html: true, placement: "top"});
    $('nav>ul>li#knowNav').tooltip({title: "<h5>美知識</h5><h6>為什麼我都照著教學步驟做了，畫出來的樣子還是怪怪的啊？那是因為不同臉型都有不同的化妝技巧哦！更多化妝的精進術，都在化妝小常識裡等您一探究竟哦！</h6>", html: true, placement: "top"});
    $('nav>ul>li#beginNav').tooltip({title: "<h5>新手上路</h5><h6>進入Beauty Up專門為還是新手的您準備的化妝教學文章！希望您能因此輕鬆學會化妝這件事。</h6>", html: true, placement: "top"});
});