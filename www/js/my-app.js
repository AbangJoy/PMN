var app = new Framework7({
	root: '#app',
	name: 'F7App',
	theme: 'md',

	panel: { swipe: 'left' },
	routes: [
		{	
			
			path: '/about/',
			url: 'about.html',
		},

		{
			path : '/index/',
			url : 'index.html',
		},

		{
			path : '/home/',
			url : 'home.html',
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
				pageInit: function(e,page) 
		  {
		  	
		  	  if (localStorage.getItem('email')) {
        		
        		app.router.navigate('/home/');
   			}


        	$$('#btnsubmit').on('click', function() {
        		localStorage.clear();
            app.panel.close();
			var a = $$('#email').val();
			var b = $$('#password').val();
			app.request.post('http://localhost/phpfile/login.php', {email:a, password:b}, function (data)
			{
				if(data == 1){
					localStorage.setItem('email', a);
					app.dialog.alert('Anda berhasil login');
					app.router.navigate('/home/');
					 ignoreCache: true
				}
				else{
					app.dialog.alert('Email atau Password anda salah');
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
          pageInit: function(e,page) 
		  {
            $$('#btnsign').on('click', function() {
			localStorage.clear();
            app.panel.close();
            //page.router.navigate('/product/');
			var x = new FormData($$(".form-ajax-submit")[0]);
			app.request.post('http://localhost/phpfile/signup.php', x, function (data)
			{
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

var ip= "192.168.43.236:3000";	

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