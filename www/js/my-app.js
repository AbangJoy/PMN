var app = new Framework7({
	root: '#app',
	name: 'F7App',
	theme: 'md',

	panel: {
		swipe: 'left'
	},
	routes: [{

			path: '/about/',
			url: 'about.html',
		},


		{

			path: '/helpbodytype/',
			url: 'helpbodytype.html',
		},

		{

			path: '/myprofile/',
			url: 'myprofile.html',
			on: {
				pageInit: function (page) {
					$$('#btnsetcondition').on('click', function () {
						app.router.navigate('/setcondition/');


					});

				}
			}
		},

		{

			path: '/setcondition/',
			url: 'setcondition.html',
			on: {
				pageInit: function (e, page) {
					$$('#btnsubmitcondition').on('click', function () {

						var h = document.forms["formSubmitCondition"]["height"].value;
						if (h == "") {
							app.dialog.alert("kolom height harus diisi");
							return false;
						}
						var w = document.forms["formSubmitCondition"]["weight"].value;
						if (w == "") {
							app.dialog.alert("kolom weight harus diisi");
							return false;
						}
						var a = document.forms["formSubmitCondition"]["age"].value;
						if (a == "") {
							app.dialog.alert("kolom age harus diisi");
							return false;
						}
						

						var s = new FormData($$(".form-ajax-submit")[0]);
						app.request.post('http://localhost/phpfile/inputcondition.php', s, function (data) {
							app.dialog.alert('Data anda telah berhasil diset');
							app.router.navigate('/myprofile/');
						});

					});
				}

			}
		},

		{
			path: '/trapezius-home/',
			url: 'trapezius-home.html',
			on: {
				pageInit: function (page) {
					app.request.post('http://localhost/phpfile/exercise_trapezius.php',
						function (data) {
							$$('.list').html('');
							var obj = JSON.parse(data);
							var counter = Object.keys(obj).length;
							for (var i = 0; i < counter; i++) {
								$$('.list').append(
									'<ul>' +
									'<li>' +
									'<a href="#" class="item-link item-content">' +
									'<div class="item-media" style="height: 35px; width:40px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
									'<div class="item-inner">' +
									'<div class="item-title-row">' +
									'<div class="item-title">' + obj[i].nama_exercise + '</div>' +
									'</div>' +
									'</div>' +
									'</a>' +
									'</li>' +
									'</ul>' +
									'<ul>'
								);
							}
						});
				}
			}
		},

		{
			path: '/cardio-home/',
			url: 'cardio-home.html',
			on: {
				pageInit: function (page) {
					app.request.post('http://localhost/phpfile/exercise_cardio.php',
						function (data) {
							$$('.list').html('');
							var obj = JSON.parse(data);
							var counter = Object.keys(obj).length;
							for (var i = 0; i < counter; i++) {
								$$('.list').append(
									'<ul>' +
									'<li>' +
									'<a href="#" class="item-link item-content">' +
									'<div class="item-media" style="height: 35px; width:40px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
									'<div class="item-inner">' +
									'<div class="item-title-row">' +
									'<div class="item-title">' + obj[i].nama_exercise + '</div>' +
									'</div>' +
									'</div>' +
									'</a>' +
									'</li>' +
									'</ul>' +
									'<ul>'
								);
							}
						});
				}
			}
		},

		{
			path: '/abs-home/',
			url: 'abs-home.html',
			on: {
				pageInit: function (page) {
					app.request.post('http://localhost/phpfile/exercise_abs.php',
						function (data) {
							$$('.list').html('');
							var obj = JSON.parse(data);
							var counter = Object.keys(obj).length;
							for (var i = 0; i < counter; i++) {
								$$('.list').append(
									'<ul>' +
									'<li>' +
									'<a href="#" class="item-link item-content">' +
									'<div class="item-media" style="height: 35px; width:40px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
									'<div class="item-inner">' +
									'<div class="item-title-row">' +
									'<div class="item-title">' + obj[i].nama_exercise + '</div>' +
									'</div>' +
									'</div>' +
									'</a>' +
									'</li>' +
									'</ul>' +
									'<ul>'
								);
							}
						});
				}
			}
		},

		{
			path: '/lowerleg-home/',
			url: 'lowerleg-home.html',
			on: {
				pageInit: function (page) {
					app.request.post('http://localhost/phpfile/exercise_lowerleg.php',
						function (data) {
							$$('.list').html('');
							var obj = JSON.parse(data);
							var counter = Object.keys(obj).length;
							for (var i = 0; i < counter; i++) {
								$$('.list').append(
									'<ul>' +
									'<li>' +
									'<a href="#" class="item-link item-content">' +
									'<div class="item-media" style="height: 35px; width:40px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
									'<div class="item-inner">' +
									'<div class="item-title-row">' +
									'<div class="item-title">' + obj[i].nama_exercise + '</div>' +
									'</div>' +
									'</div>' +
									'</a>' +
									'</li>' +
									'</ul>' +
									'<ul>'
								);
							}
						});
				}
			}
		},

		{
			path: '/glutes-home/',
			url: 'glutes-home.html',
			on: {
				pageInit: function (page) {
					app.request.post('http://localhost/phpfile/exercise_glutes.php',
						function (data) {
							$$('.list').html('');
							var obj = JSON.parse(data);
							var counter = Object.keys(obj).length;
							for (var i = 0; i < counter; i++) {
								$$('.list').append(
									'<ul>' +
									'<li>' +
									'<a href="#" class="item-link item-content">' +
									'<div class="item-media" style="height: 35px; width:40px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
									'<div class="item-inner">' +
									'<div class="item-title-row">' +
									'<div class="item-title">' + obj[i].nama_exercise + '</div>' +
									'</div>' +
									'</div>' +
									'</a>' +
									'</li>' +
									'</ul>' +
									'<ul>'
								);
							}
						});
				}
			}
		},

		{
			path: '/upperleg-home/',
			url: 'upperleg-home.html',
			on: {
				pageInit: function (page) {
					app.request.post('http://localhost/phpfile/exercise_upperleg.php',
						function (data) {
							$$('.list').html('');
							var obj = JSON.parse(data);
							var counter = Object.keys(obj).length;
							for (var i = 0; i < counter; i++) {
								$$('.list').append(
									'<ul>' +
									'<li>' +
									'<a href="#" class="item-link item-content">' +
									'<div class="item-media" style="height: 35px; width:40px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
									'<div class="item-inner">' +
									'<div class="item-title-row">' +
									'<div class="item-title">' + obj[i].nama_exercise + '</div>' +
									'</div>' +
									'</div>' +
									'</a>' +
									'</li>' +
									'</ul>' +
									'<ul>'
								);
							}
						});
				}
			}
		},

		{
			path: '/back-home/',
			url: 'back-home.html',
			on: {
				pageInit: function (page) {
					app.request.post('http://localhost/phpfile/exercise_back.php',
						function (data) {
							$$('.list').html('');
							var obj = JSON.parse(data);
							var counter = Object.keys(obj).length;
							for (var i = 0; i < counter; i++) {
								$$('.list').append(
									'<ul>' +
									'<li>' +
									'<a href="#" class="item-link item-content">' +
									'<div class="item-media" style="height: 35px; width:40px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
									'<div class="item-inner">' +
									'<div class="item-title-row">' +
									'<div class="item-title">' + obj[i].nama_exercise + '</div>' +
									'</div>' +
									'</div>' +
									'</a>' +
									'</li>' +
									'</ul>' +
									'<ul>'
								);
							}
						});
				}
			}
		},

		{
			path: '/shoulders-home/',
			url: 'shoulders-home.html',
			on: {
				pageInit: function (page) {
					app.request.post('http://localhost/phpfile/exercise_shoulder.php',
						function (data) {
							$$('.list').html('');
							var obj = JSON.parse(data);
							var counter = Object.keys(obj).length;
							for (var i = 0; i < counter; i++) {
								$$('.list').append(
									'<ul>' +
									'<li>' +
									'<a href="#" class="item-link item-content">' +
									'<div class="item-media" style="height: 35px; width:40px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
									'<div class="item-inner">' +
									'<div class="item-title-row">' +
									'<div class="item-title">' + obj[i].nama_exercise + '</div>' +
									'</div>' +
									'</div>' +
									'</a>' +
									'</li>' +
									'</ul>' +
									'<ul>'
								);
							}
						});
				}
			}
		},

		{
			path: '/chest-home/',
			url: 'chest-home.html',
			on: {
				pageInit: function (page) {
					app.request.post('http://localhost/phpfile/exercise_chest.php',
						function (data) {
							$$('.list').html('');
							var obj = JSON.parse(data);
							var counter = Object.keys(obj).length;
							for (var i = 0; i < counter; i++) {
								$$('.list').append(
									'<ul>' +
									'<li>' +
									'<a href="#" class="item-link item-content">' +
									'<div class="item-media" style="height: 35px; width:40px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
									'<div class="item-inner">' +
									'<div class="item-title-row">' +
									'<div class="item-title">' + obj[i].nama_exercise + '</div>' +
									'</div>' +
									'</div>' +
									'</a>' +
									'</li>' +
									'</ul>' +
									'<ul>'
								);
							}
						});
				}
			}
		},

		{
			path: '/forearm-home/',
			url: 'forearm-home.html',
			on: {
				pageInit: function (page) {
					app.request.post('http://localhost/phpfile/exercise_forearm.php',
						function (data) {
							$$('.list').html('');
							var obj = JSON.parse(data);
							var counter = Object.keys(obj).length;
							for (var i = 0; i < counter; i++) {
								$$('.list').append(
									'<ul>' +
									'<li>' +
									'<a href="#" class="item-link item-content">' +
									'<div class="item-media" style="height: 35px; width:40px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
									'<div class="item-inner">' +
									'<div class="item-title-row">' +
									'<div class="item-title">' + obj[i].nama_exercise + '</div>' +
									'</div>' +
									'</div>' +
									'</a>' +
									'</li>' +
									'</ul>' +
									'<ul>'
								);
							}
						});
				}
			}
		},

		{
			path: '/triceps-home/',
			url: 'triceps-home.html',
			on: {
				pageInit: function (page) {
					app.request.post('http://localhost/phpfile/exercise_triceps.php',
						function (data) {
							$$('.list').html('');
							var obj = JSON.parse(data);
							var counter = Object.keys(obj).length;
							for (var i = 0; i < counter; i++) {
								$$('.list').append(
									'<ul>' +
									'<li>' +
									'<a href="#" class="item-link item-content">' +
									'<div class="item-media" style="height: 35px; width:40px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
									'<div class="item-inner">' +
									'<div class="item-title-row">' +
									'<div class="item-title">' + obj[i].nama_exercise + '</div>' +
									'</div>' +
									'</div>' +
									'</a>' +
									'</li>' +
									'</ul>' +
									'<ul>'
								);
							}
						});
				}
			}
		},

		{
			path: '/biceps-home/',
			url: 'biceps-home.html',
			on: {
				pageInit: function (page) {
					app.request.post('http://localhost/phpfile/exercise_biceps.php',
						function (data) {
							$$('.list').html('');
							var obj = JSON.parse(data);
							var counter = Object.keys(obj).length;
							for (var i = 0; i < counter; i++) {
								$$('.list').append(
									'<ul>' +
									'<li>' +
									'<a href="#" class="item-link item-content">' +
									'<div class="item-media" style="height: 35px; width:40px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
									'<div class="item-inner">' +
									'<div class="item-title-row">' +
									'<div class="item-title">' + obj[i].nama_exercise + '</div>' +
									'</div>' +
									'</div>' +
									'</a>' +
									'</li>' +
									'</ul>' +
									'<ul>'
								);
							}
						});
				}
			}
		},

		{
			path: '/exercise/',
			url: 'exercise.html',

		},

		{
			path: '/index/',
			url: 'index.html',
		},

		{
			path: '/home/',
			url: 'home.html',
			on:{
				pageInit:function(e,page){
					var mySwiper = new Swiper('.swiper-container', {
						init: true,
						autoplay: {
    						delay: 3000,
  						}
					});
				}
}

		},

		{

			path: '/login/',
			url: 'login.html',
			on: {
				pageInit: function (e, page) {

					if (localStorage.getItem('email')) {

						app.router.navigate('/home/');
					}


					$$('#btnsubmit').on('click', function () {
						localStorage.clear();
						app.panel.close();
						var a = $$('#email').val();
						var b = $$('#password').val();
						app.request.post('http://localhost/phpfile/login.php', {
							email: a,
							password: b
						}, function (data) {
							if (data == 1) {
								localStorage.setItem('email', a);
								app.dialog.alert('Anda berhasil login');
								app.router.navigate('/home/');

							} else {
								app.dialog.alert('Email atau Password anda salah');
							}
							if (data == 'gagal') {
								app.dialog.alert('Anda belum memasukan email atau password');
							}

						});
					});

				}

			}
		},

		{

			path: '/signup/',
			url: 'signup.html',
			on: {
				pageInit: function (e, page) {
					$$('#btnsign').on('click', function () {
						var n = document.forms["formSubmit"]["name"].value;
						if (n == "") {
							app.dialog.alert("nama kolom harus diisi");
							return false;
						}
						var e = document.forms["formSubmit"]["email"].value;
						if (e == "") {
							app.dialog.alert("email kolom harus diisi");
							return false;
						}
						var p = document.forms["formSubmit"]["pass"].value;
						if (p == "") {
							app.dialog.alert("password kolom harus diisi");
							return false;
						}
						localStorage.clear();
						app.panel.close();
						//page.router.navigate('/product/');
						var x = new FormData($$(".form-ajax-submit")[0]);
						app.request.post('http://localhost/phpfile/signup.php', x, function (data) {
							app.dialog.alert('Anda telah terdafar');
							app.router.navigate('/home/');
						});

					});






				}
			}

		},




	]

});
var $$ = Dom7;

var ip = '192.168.43.236';

var mainView = app.views.create('.view-main');

var loginScreen = app.loginScreen.create({ /* parameters */ });




// var x = new FormData($$(".form-ajax-submit")[0]);
// app.request.post('http://localhost/F7App/phpfile/signup.php', x, function (data) {
// 	  	console.log(data);




// app.request.post('http://localhost/F7App/phpfile/signup.php', 
// 	{	name : $$('#name').val(),
// 		email : $$('#email').val(),
// 		password : $$('#password').val()}, function(data){
// 			console.log(data);
// 		});





//     $$('#btnlogin').on('click', function () {
//     var a = $$('#email').val();
//     var b = $$('#password').val();

//     if (isNullOrWhitespace(a) || isNullOrWhitespace(b) || (isNullOrWhitespace(a) && isNullOrWhitespace(b))) {
//         myApp.alert('Masukkan NRP dan Password Terlebih Dahulu', 'Sorry...');
//     } else {
//         $$.post('http://' + ip + '/phpfile/login.php', {
//                 email: a,
//                 password: b
//             },
//             function (data) {
//                 if (data == 'success') {
//                     localStorage.setItem('email', a);
//                     mainView.router.load({
//                         url: 'signup.html',
//                         ignoreCache: true
//                     });
//                 } else {
//                     myApp.alert('NRP atau Password Salah', 'Sorry...');
//                     $$('#email').val('');
//                     $$('#password').val('');
//                 }
//             });
//     }
// });






// var myApp = new Framework7();
// var $$ = Dom7;

// var mainView = myApp.addView('.view-main');



// myApp.onPageInit('login-screen', function (page) {
//   var pageContainer = $$(page.container);
//   pageContainer.find('.list-button').on('click', function () {
//     var email = pageContainer.find('input[name="email"]').val();
//     var password = pageContainer.find('input[name="password"]').val();
//     // Handle username and password
//     myApp.alert('email: ' + email + ', Password: ' + password, function () {
//       mainView.goBack();
//     });
//   });
// });