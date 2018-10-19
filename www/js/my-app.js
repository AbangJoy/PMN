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

		path: '/forum/',
		url: 'forum.html',
		on: {
			pageInit: function (page) {
				var id;
				app.request.post('http://localhost/phpfile/tampilForum.php', {
					email: localStorage.getItem('email')
				},
					function (data) {
						$$('.container-forum').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.container-forum').append(
								'<div class="card demo-facebook-card" style="height:30%;">' +
								'<div class="card-header">' +
								'<div class="demo-facebook-name">' + obj[i].email + '</div>' +
								'<div class="demo-facebook-date">' + obj[i].tanggal_buat + '</div>' +
								'</div>' +
								'<div class="card-content card-content-padding">' +
								'<p>' +
								'<b>' + obj[i].judul_forum + '</b>' +
								'</p>' +
								'<p>' + obj[i].isi_forum + '</p>' +
								'<a id="' + obj[i].id_forum + '" href="#" class="link sheet-open" data-sheet=".komentarSheet" style="color: black;">' +
								'<i class="f7-icons chats">chats</i>' +
								'<p style="margin-top: 10px; margin-left: 5px;">' + obj[i].komentar + '</p>' +
								'</a>' +
								'</div>' +
								'</div>'
							);
						}
					});

				$$(document).on('click', '.sheet-open', function () {
					id = $$(this).attr('id'); //id_forum

				});

				$$('#btnKomentar').on('click', function () {
					var isiKomentar = $$('#isi_komentar').val();

					app.request.post('http://localhost/phpfile/inputKomentar.php', {
						komentar: isiKomentar,
						id_forum: id,
						email: localStorage.getItem('email')
					},
						function (data) {
							// $$('.container-komentar').html('');
							// var obj = JSON.parse(data);
							// var counter = Object.keys(obj).length;
							// for (var i = 0; i < counter; i++) {
							// 	$$('.container-forum').append(
							// 		'<div class="block-title">Block title</div>' +
							// 		'<div class="block">' +
							// 		'<p>Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit' +
							// 		'vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis.' +
							// 		'</p>' +
							// 		'</div>'
							// 	);


							// }
							app.dialog.alert(data);
							app.router.navigate('/forum/');

						});
				});


			}
		}
	},

	{

		path: '/buatForum/',
		url: 'buatForum.html',
		on: {
			pageInit: function (e, page) {
				$$('#btnBuatForum').on('click', function () {
					var simpan_email = localStorage.getItem('email');
					var simpan_judul = $$('#judulForum').val();
					var simpan_isi = $$('#isiForum').val();

					app.request.post('http://localhost/phpfile/inputForum.php',
						{
							email: simpan_email,
							judul: simpan_judul,
							isi: simpan_isi

						},
						function (data) {
							app.dialog.alert(data);
							app.router.navigate('/forum/');
						});

				});
			}

		}


	},

	{
		path: '/informasiKondisi/',
		url: 'informasiKondisi.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://localhost/phpfile/select_condition.php', {
					email: localStorage.getItem('email')
				},
					function (data) {
						$$('.container').html('');
						var obj = JSON.parse(data);
						app.dialog.alert(obj[2]);
						$$('.container').append(

							'<div class="block-header" style="text-align: center; font-size: 20px; font-weight:bold; letter-spacing: -1px; color: black;">HASIL PERHITUNGAN' +
							'</div>' +
							'<div class="block-content" style="color: black;">' +
							'<p>BMI anda adalah ' + obj[2] + '</p>' +
							'<h2></h2>' +
							'<p>BMR anda adalah...</p>' +
							'<h2>' + obj[3] + ' Kal</h2>' +
							'<p>BMR adalah jumlah ' +
							'<b>MINIMAL</b>' + ' setiap hari yang dibutuhkan oleh tubuh agar organ-organ dapat berfungsi.</p>' +
							'<p>Berat lemak anda adalah...</p>' +
							'<h2>' + obj[4] + 'Kg </h2>' +
							'<p>Ini adalah berat lemak yang ada pada tubuh anda saat ini.</p>' +
							'<p>Kebutuhan kalori anda adalah...</p>' +
							'<h2>' + obj[5] + ' Kal</h2>' +
							'<p>Jumlah tersebut adalah jumlah kebutuhan kalori harian yang anda harus cukupi.</p>' +
							'</div>'
						);
					});
			}
		}
	},

	{
		path: '/helpActivity/',
		url: 'helpActivity.html',
		on: {

		}
	},

	{
		path: '/myNutrition/',
		url: 'myNutrition.html',
		on: {

		}
	},

	{
		path: '/menuGeneralPlan/',
		url: 'menuGeneralPlan.html',
		on: {
			pageInit: function (page) {
				$$('#pindahMenuGeneralPlan').on('click', function () {

					app.router.navigate('/cuttingGeneralPlan/');
				});

				$$('#pindahMenuGeneralPlan2').on('click', function () {

					app.router.navigate('/bulkingGeneralPlan/');
				});

				$$('#pindahMenuGeneralPlan3').on('click', function () {

					app.router.navigate('/conditioningGeneralPlan/');
				});
			}
		}
	},

	{
		path: '/plans/',
		url: 'plans.html',
		on: {

		}

	},

	{
		path: '/general_plan_paket_latihan_cutting/',
		url: 'general_plan_paket_latihan_cutting.html',
		on: {

		}
	},

	{
		path: '/cuttingGeneralPlan/',
		url: 'cuttingGeneralPlan.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://localhost/phpfile/cuttingGeneralPlan.php',
					function (data) {
						$$('.cuttingplanscard').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.cuttingplanscard').append(

								'<div class="card demo-card-header-pic" id="cardplanshome">' +

								'<a href="/general_plan_paket_latihan_cutting/" style="height:100px; background-size: 100% 100%;background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_tampilan + ');" class="card-content card-content-padding">' +
								'<div class="block fullbodytrainingtitle" style="height: 20px; width: 260px; border: 1px solid; color: white; border-color: black; background-color: black;">' + obj[i].nama_plan + '</div>' +
								'</a>' +
								'<div class="card-footer" style="text-align: left;">' +
								'<h7>' + obj[i].level_plan + '</h7><h7>|</h7><h7>' + obj[i].jenis_program + '</h7><h7>|</h7><h7>' + obj[i].jumlah_hari + 'days/week</h7>' +
								'</div>' +
								'</div>'



							);
						}
					});
			}
		}

	},

	{
		path: '/bulkingGeneralPlan/',
		url: 'bulkingGeneralPlan.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://localhost/phpfile/bulkingGeneralPlan.php',
					function (data) {
						$$('.bulkingplanscard').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.bulkingplanscard').append(

								'<div class="card demo-card-header-pic" id="cardplanshome">' +

								'<a href="/plans/" style="height:100px; background-size: 100% 100%; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_tampilan + ');" class="card-content card-content-padding">' +
								'<div class="block fullbodytrainingtitle" style="height: 20px; width: 180px; border: 1px solid; color: white; border-color: black; background-color: black;">' + obj[i].nama_plan + '</div>' +
								'</a>' +
								'<div class="card-footer" style="text-align: left;">' +
								'<h7>' + obj[i].level_plan + '</h7><h7>|</h7><h7>' + obj[i].jenis_program + '</h7><h7>|</h7><h7>' + obj[i].jumlah_hari + 'days/week</h7>' +
								'</div>' +
								'</div>'



							);
						}
					});
			}
		}

	},

	{
		path: '/conditioningGeneralPlan/',
		url: 'conditioningGeneralPlan.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://localhost/phpfile/conditioningGeneralPlan.php',
					function (data) {
						$$('.conditioningplanscard').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.conditioningplanscard').append(

								'<div class="card demo-card-header-pic" id="cardplanshome">' +

								'<a href="/plans/" style="height:100px; background-size: 100% 100%; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_tampilan + ');" class="card-content card-content-padding">' +
								'<div class="block fullbodytrainingtitle" style="height: 20px; width: 180px; border: 1px solid; color: white; border-color: black; background-color: black;">' + obj[i].nama_plan + '</div>' +
								'</a>' +
								'<div class="card-footer" style="text-align: left;">' +
								'<h7>' + obj[i].level_plan + '</h7><h7>|</h7><h7>' + obj[i].jenis_program + '</h7><h7>|</h7><h7>' + obj[i].jumlah_hari + 'days/week</h7>' +
								'</div>' +
								'</div>'



							);
						}
					});
			}
		}

	},

	{
		path: '/generalplan/',
		url: 'generalplan.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://localhost/phpfile/generalplan.php',
					function (data) {
						$$('.generalplanscard').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.generalplanscard').append(

								'<div class="card demo-card-header-pic" id="cardplanshome">' +

								'<a href="/plans/" style="height:100px; background-size: 100% 100%; background-image:url(img/generalplans.jpg)" class="card-content card-content-padding">' +
								'<div class="block fullbodytrainingtitle" style="height: 20px; width: 180px; border: 1px solid; color: white; border-color: black; background-color: black;">' + obj[i].nama_plan + '</div>' +
								'</a>' +
								'<div class="card-footer" style="text-align: left;">' +
								'<h7>' + obj[i].level_plan + '</h7><h7>|</h7><h7>' + obj[i].jenis_program + '</h7><h7>|</h7><h7>' + obj[i].jumlah_hari + 'days/week</h7>' +
								'</div>' +
								'</div>'



							);
						}
					});
			}
		}

	},

	{
		path: '/customplan/',
		url: 'customplan.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://localhost/phpfile/cekCustomPlan.php', {
					email: localStorage.getItem('email')
				},
					function (data) {
						var obj = JSON.parse(data);
						if (obj == "ada") {
							app.dialog.alert(obj);
							app.router.navigate('/customplan/');
						}
						else {
							app.dialog.alert("aaa");
							app.router.navigate('/setcondition/');
						}
					});
			}
		}
	},

	{
		path: '/cekplan/',
		url: 'plans.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://localhost/phpfile/cekCustomPlan.php', {
					email: localStorage.getItem('email')
				},
					function (data) {
						var obj = JSON.parse(data);
						if (obj == "ada") {
							app.dialog.alert(obj);
							app.router.navigate('/customplan/');
						}
						else {
							app.dialog.alert(obj);
							app.router.navigate('/home/');
						}
					});
			}
		}
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
				app.request.post('http://localhost/phpfile/select_condition.php', {
					email: localStorage.getItem('email')
				},
					function (data) {
						var obj = JSON.parse(data);
						var a = localStorage.getItem('email');
						$$('.bottom-section').html('');
						$$('.bottom-section').append(
							'<h5 style="text-align: center;">' + a + '</h5>' +
							'<div class="bodycondition">' +
							'<div class="list">' +
							'<ul>' +
							'<li>' +
							'<div class="item-content">' +

							'<div class="item-inner">' +
							'<div class="item-title">Height</div>' +
							'<div class="item-after">' + obj[1] + '</div>' +
							'</div>' +
							'</div>' +
							'</li>' +
							'<li>' +
							'<div class="item-content">' +

							'<div class="item-inner">' +
							'<div class="item-title">Weight</div>' +
							'<div class="item-after">' + obj[0] + '</div>' +
							'</div>' +
							'</div>' +
							'</li>' +
							'<li>' +
							'<div class="item-content">' +

							'<div class="item-inner">' +
							'<div class="item-title">Age</div>' +
							'<div class="item-after">' + obj[9] + '</div>' +
							'</div>' +
							'</div>' +
							'<div class="item-content">' +

							'<div class="item-inner">' +
							'<div class="item-title">Gender</div>' +
							'<div class="item-after">' + obj[10] + '</div>' +
							'</div>' +
							'</div>' +
							'</li>' +
							'<li>' +
							'<div class="item-content">' +

							'<div class="item-inner">' +
							'<div class="item-title">Body type</div>' +
							'<div class="item-after">' + obj[11] + '</div>' +
							'</div>' +
							'</div>' +
							'</li>' +
							'<li>' +
							'<div class="item-content">' +

							'<div class="item-inner">' +
							'<div class="item-title">BMI</div>' +
							'<div class="item-after">' + obj[2] + '</div>' +
							'</div>' +
							'</div>' +
							'</li>' +
							'<li>' +
							'<div class="item-content">' +

							'<div class="item-inner">' +
							'<div class="item-title">Total fat</div>' +
							'<div class="item-after">' + obj[4] + '</div>' +
							'</div>' +
							'</div>' +
							'</li>' +

							'</ul>' +

							'</div>' +

							'</div>'
						)
					});
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


					var simpan_email = localStorage.getItem('email');
					var simpan_weight = $$('#weight').val();
					var simpan_height = $$('#height').val();
					var simpan_age = $$('#age').val();
					var simpan_gender = $$('#gender').val();
					var simpan_bodytype = $$('#bodytype').val();
					var simpan_activity = $$('#levelaktifitas').val();



					app.request.post('http://localhost/phpfile/inputcondition.php',
						{
							email: simpan_email,
							weight: simpan_weight,
							height: simpan_height,
							age: simpan_age,
							gender: simpan_gender,
							bodytype: simpan_bodytype,
							aktifitas: simpan_activity

						},
						function (data) {
							app.dialog.alert(data);
							app.router.navigate('/informasiKondisi/');
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
								'<a href="#" class="item-link item-content" style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
								'<div class="item-inner" style="margin-top: 8px;">' +
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
								'<a href="#" class="item-link item-content" style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
								'<div class="item-inner" style="margin-top: 8px;">' +
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
								'<a href="#" class="item-link item-content" style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
								'<div class="item-inner" style="margin-top: 8px;">' +
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
								'<a href="#" class="item-link item-content" style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
								'<div class="item-inner" style="margin-top: 8px;">' +
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
								'<a href="#" class="item-link item-content" style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
								'<div class="item-inner" style="margin-top: 8px;">' +
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
								'<a href="#" class="item-link item-content" style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
								'<div class="item-inner" style="margin-top: 8px;">' +
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
								'<a href="#" class="item-link item-content" style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px;  margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
								'<div class="item-inner" style="margin-top: 8px;">' +
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
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
								'<div class="item-inner" style="margin-top: 8px;">' +
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
								'<a href="#" class="item-link item-content" style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px;  margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
								'<div class="item-inner" style="margin-top: 8px;">' +
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
								'<a href="#" class="item-link item-content" style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
								'<div class="item-inner" style="margin-top: 8px;">' +
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
								'<a href="#" class="item-link item-content"  style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
								'<div class="item-inner" style="margin-top: 8px;">' +
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
								'<a href="' + obj[i].url + '" class="item-link item-content" style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px; margin-top:8px; background-image: url(http://localhost/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
								'<div class="item-inner" style="margin-top: 8px;">' +
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
		// on:{
		// 	pageInit:function(e,page){
		// 		if(localStorage.getItem('email')!=null){
		// 			app.dialog.alert('bisa');
		// 			app.router.navigate('/home/');
		// 		}


		// 	}
		// }
	},

	{
		path: '/home/',
		url: 'home.html',
		on: {
			pageInit: function (e, page) {

				var mySwiper = new Swiper('.swiper-container', {
					init: true,
					autoplay: {
						delay: 3000,
					}
				});


				$$('#logOut').on('click', function () {
					localStorage.removeItem('email');
					app.router.navigate('/index/');

				});
			}
		}

	},

	{

		path: '/login/',
		url: 'login.html',
		on: {
			pageInit: function (e, page) {
				if (localStorage.getItem('email') != null) {
					app.router.navigate('/home/');
				}

				$$('#btnLogin').on('click', function () {


					var a = $$('#email').val();
					var b = $$('#password').val();
					app.request.post('http://localhost/phpfile/login.php', {
						email: a,
						password: b
					}, function (data) {
						if (data == 1) {
							localStorage.setItem('email', a);
							sessionStorage.setItem('email', a);

							notificationFull.open();
							app.router.navigate('/home/');
							// app.dialog.alert(localStorage.getItem('email'));


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

	{

		path: '/dumbbellAlternateHammerCurl/',
		url: 'dumbbellAlternateHammerCurl.html',
		on: {
			pageInit: function (e, page) {

			}
		}

	},

	{

		path: '/dumbbellHammerCurl/',
		url: 'dumbbellHammerCurl.html',
		on: {
			pageInit: function (e, page) {

			}
		}

	},

	{

		path: '/dumbbellAlternateBicepCurl/',
		url: 'dumbbellAlternateBicepCurl.html',
		on: {
			pageInit: function (e, page) {

			}
		}

	},

	{

		path: '/dumbbellBicepsCurl/',
		url: 'dumbbellBicepsCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellInclineCurl/',
		url: 'dumbbellInclineCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellConcentrationCurl/',
		url: 'dumbbellConcentrationCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/barbellCurl/',
		url: 'barbellCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/EzBarCurl/',
		url: 'EzBarCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/barbellPreacherCurl/',
		url: 'barbellPreacherCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/barbellCloseGripPreacherCurl/',
		url: 'barbellCloseGripPreacherCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/inclineAlternateBicepCurl/',
		url: 'inclineAlternateBicepCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellOneArmPreacherCurl/',
		url: 'dumbbellOneArmPreacherCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/cableCloseGripCurl/',
		url: 'cableCloseGripCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/cableRopeCurl/',
		url: 'cableRopeCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellSeatedCurl/',
		url: 'dumbbellSeatedCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellInclineBenchCurl/',
		url: 'dumbbellInclineBenchCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellFlexorInclineCurl/',
		url: 'dumbbellFlexorInclineCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellSpiderCurl/',
		url: 'dumbbellSpiderCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellAlternateHammerPreacherCurl/',
		url: 'dumbbellAlternateHammerPreacherCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellSeatedHammerCurl/',
		url: 'dumbbellSeatedHammerCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/tricepsPushdownVBar/',
		url: 'tricepsPushdownVBar.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/cableReverseGripTricepsPushdown/',
		url: 'cableReverseGripTricepsPushdown.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellStandingOneArmTricepsExtension/',
		url: 'dumbbellStandingOneArmTricepsExtension.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellStandingTricepsExtension/',
		url: 'dumbbellStandingTricepsExtension.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/cableRopeTricepsPushdown/',
		url: 'cableRopeTricepsPushdown.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellTricepKickback/',
		url: 'dumbbellTricepKickback.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellSeatedTricepsPress/',
		url: 'dumbbellSeatedTricepsPress.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/singleBenchDip/',
		url: 'singleBenchDip.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/EZBarTricepsExtension/',
		url: 'EZBarTricepsExtension.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dip/',
		url: 'dip.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/benchDip/',
		url: 'benchDip.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/cableOneArmTricepExtension/',
		url: 'cableOneArmTricepExtension.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/closeTricepsPushup/',
		url: 'closeTricepsPushup.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellLyingSupineTwoArmTricepsExtension/',
		url: 'dumbbellLyingSupineTwoArmTricepsExtension.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellLyingSingleExtension/',
		url: 'dumbbellLyingSingleExtension.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellLateralRaise/',
		url: 'dumbbellLateralRaise.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellShoulderPress/',
		url: 'dumbbellShoulderPress.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellFrontRaise/',
		url: 'dumbbellFrontRaise.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/DumbbellArnoldPress/',
		url: 'DumbbellArnoldPress.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellStandingPress/',
		url: 'dumbbellStandingPress.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/barbbellShoulderPress/',
		url: 'barbbellShoulderPress.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/barbbellUpRightRow/',
		url: 'barbbellUpRightRow.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/barbbellStandingMilitaryPress/',
		url: 'barbbellStandingMilitaryPress.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellBentOverDeltRaise/',
		url: 'dumbbellBentOverDeltRaise.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellUpRightRow/',
		url: 'dumbbellUpRightRow.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellReverseFlyes/',
		url: 'dumbbellReverseFlyes.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/barbbellFrontRaise/',
		url: 'barbbellFrontRaise.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellSeatedSideLateralRaise/',
		url: 'dumbbellSeatedSideLateralRaise.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/SmithMachineOverheadShoulderPress/',
		url: 'SmithMachineOverheadShoulderPress.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/cableUpRightRow/',
		url: 'cableUpRightRow.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/cableLateralRaise/',
		url: 'cableLateralRaise.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/cableFrontRaise/',
		url: 'cableFrontRaise.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/barbbellPushPress/',
		url: 'barbbellPushPress.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellFrontTwoRaise/',
		url: 'dumbbellFrontTwoRaise.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/weightPlateFrontRaise/',
		url: 'weightPlateFrontRaise.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/cableStandingReverseCurl/',
		url: 'cableStandingReverseCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellPalmsUpWristCurlOverABench/',
		url: 'dumbbellPalmsUpWristCurlOverABench.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellPalmsDownWristCurlOverABench/',
		url: 'dumbbellPalmsDownWristCurlOverABench.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/barbellReverseCurl/',
		url: 'barbellReverseCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/barbellSeatedPalmsUpWristCurl/',
		url: 'barbellSeatedPalmsUpWristCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/barbellSeatedPalmsDownWristCurl/',
		url: 'barbellSeatedPalmsDownWristCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/barbellPalmsUpWristCurlOverABench/',
		url: 'barbellPalmsUpWristCurlOverABench.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/barbellPalmsDownWristCurlOverABench/',
		url: 'barbellPalmsDownWristCurlOverABench.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/cableWristCurl/',
		url: 'cableWristCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/barbellReversePreacherCurls/',
		url: 'barbellReversePreacherCurls.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellSeatedPalmsDownWristCurl/',
		url: 'dumbbellSeatedPalmsDownWristCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellSeatedPalmsUpWristCurl/',
		url: 'dumbbellSeatedPalmsUpWristCurl.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/barbellBenchPress/',
		url: 'barbellBenchPress.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/barbellInclineBenchPress/',
		url: 'barbellInclineBenchPress.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellBenchPress/',
		url: 'dumbbellBenchPress.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellInclineBenchPress/',
		url: 'dumbbellInclineBenchPress.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbelIFly/',
		url: 'dumbbelIFly.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellInclineFly/',
		url: 'dumbbellInclineFly.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/barbellDeclineBenchPress/',
		url: 'barbellDeclineBenchPress.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellDeclineBenchPress/',
		url: 'dumbbellDeclineBenchPress.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/machineFly/',
		url: 'machineFly.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},


	{

		path: '/cableCrossOver/',
		url: 'cableCrossOver.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/benchPressMachine/',
		url: 'benchPressMachine.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/machineInclineChestPress/',
		url: 'machineInclineChestPress.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/smithMachineBenchPress/',
		url: 'smithMachineBenchPress.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellDeclineFly/',
		url: 'dumbbellDeclineFly.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellStraightArmPullover/',
		url: 'dumbbellStraightArmPullover.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/cableLowerChestRaise/',
		url: 'cableLowerChestRaise.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/ButterflyMachine/',
		url: 'ButterflyMachine.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/smithMachineInclineBenchPress/',
		url: 'smithMachineInclineBenchPress.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/dumbbellHammerGripInclineBenchPress/',
		url: 'dumbbellHammerGripInclineBenchPress.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/platePress/',
		url: 'platePress.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/leverageChestPress/',
		url: 'leverageChestPress.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/pushUp/',
		url: 'pushUp.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/benchPushups/',
		url: 'benchPushups.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/wideGripLatPulldown/',
		url: 'wideGripLatPulldown.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},


	{

		path: '/wideGripRearPulldowns/',
		url: 'wideGripRearPulldowns.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/closeGripFrontlatPulldown/',
		url: 'closeGripFrontlatPulldown.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/cableUnderhandPullDown/',
		url: 'cableUnderhandPullDown.html',
		on: {
			pageInit: function (e, page) {
				app.dialog.alert("hai");
			}
		}

	},

	{

		path: '/cableVBarPullDown/',
		url: 'cableVBarPullDown.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/PullUps/',
		url: 'PullUps.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/cableSeatedRow/',
		url: 'cableSeatedRow.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/dumbbellOneArmRow/',
		url: 'dumbbellOneArmRow.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/dumbbellBentOverRow/',
		url: 'dumbbellBentOverRow.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/barbellBentOverRow/',
		url: 'barbellBentOverRow.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/ChinUp/',
		url: 'ChinUp.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/barbellDeadlift/',
		url: 'barbellDeadlift.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/backExtensions/',
		url: 'backExtensions.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/TBarRow/',
		url: 'TBarRow.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/barbellRomanianDeadlift/',
		url: 'barbellRomanianDeadlift.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/cableStraightArmPushDown/',
		url: 'cableStraightArmPushDown.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/dumbbellDeadlift/',
		url: 'dumbbellDeadlift.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/barbellReverseGripBentOverRow/',
		url: 'barbellReverseGripBentOverRow.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/seatedMachineRow/',
		url: 'seatedMachineRow.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/machineLatPullDown/',
		url: 'machineLatPullDown.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/dumbbellSquat/',
		url: 'dumbbellSquat.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/barbellSquat/',
		url: 'barbellSquat.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/dumbbellLunges/',
		url: 'dumbbellLunges.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/barbellLunge/',
		url: 'barbellLunge.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/prisonerSquat/',
		url: 'prisonerSquat.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/bodyweightLunge/',
		url: 'bodyweightLunge.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/barbellFrontSquat/',
		url: 'barbellFrontSquat.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/legExtensions/',
		url: 'legExtensions.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/legPressMachine/',
		url: 'legPressMachine.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/smithMachineSquat/',
		url: 'smithMachineSquat.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/dumbbellStepUps/',
		url: 'dumbbellStepUps.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/freehandJumpSquat/',
		url: 'freehandJumpSquat.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/dumbbellRearLunge/',
		url: 'dumbbellRearLunge.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/bodyweightWalkingLunge/',
		url: 'bodyweightWalkingLunge.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/sitSquat/',
		url: 'sitSquat.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/dumbbellPileSquat/',
		url: 'dumbbellPileSquat.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/dumbbellStiffLeggedDeadlift/',
		url: 'dumbbellStiffLeggedDeadlift.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/Bridge/',
		url: 'Bridge.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/GluteKickback/',
		url: 'GluteKickback.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/FlutterKick/',
		url: 'FlutterKick.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/OneLegKickback/',
		url: 'OneLegKickback.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/OneKneetoChest/',
		url: 'OneKneetoChest.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/BarbellGluteBridge/',
		url: 'BarbellGluteBridge.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/KneeAcrossTheBody/',
		url: 'KneeAcrossTheBody.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/StandingAdductor/',
		url: 'StandingAdductor.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/DumbbellStandingCalfRaise/',
		url: 'DumbbellStandingCalfRaise.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/BarbellStandingCalfRaise/',
		url: 'BarbellStandingCalfRaise.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/BodyweightStandingCalfRaise/',
		url: 'BodyweightStandingCalfRaise.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/CalfPressOnLegPress/',
		url: 'CalfPressOnLegPress.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/SmithMachineReverseCalfRaises/',
		url: 'SmithMachineReverseCalfRaises.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/CalfRaiseWithDumbbell/',
		url: 'CalfRaiseWithDumbbell.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/StandingOneLegBodyweightCalfRaise/',
		url: 'StandingOneLegBodyweightCalfRaise.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/Plank/',
		url: 'Plank.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/Situp/',
		url: 'Situp.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/LegRaise/',
		url: 'LegRaise.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/DeclineCrunch/',
		url: 'DeclineCrunch.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/HangingLegRaise/',
		url: 'HangingLegRaise.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/AirBike/',
		url: 'AirBike.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/Crunches/',
		url: 'Crunches.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/CableCrunches/',
		url: 'CableCrunches.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/DumbbellSideBend/',
		url: 'DumbbellSideBend.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/AlternateHeelTouchers/',
		url: 'AlternateHeelTouchers.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/SideBridge/',
		url: 'SideBridge.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/BarbellAbRolloutonKnees/',
		url: 'BarbellAbRolloutonKnees.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/CableSideBends/',
		url: 'CableSideBends.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/CrossBodyCrunch/',
		url: 'CrossBodyCrunch.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/WeightplateTwist/',
		url: 'WeightplateTwist.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/DumbbellTwoArmSideBend/',
		url: 'DumbbellTwoArmSideBend.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/BentKneeHipRaise/',
		url: 'BentKneeHipRaise.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/WeightedCrunches/',
		url: 'WeightedCrunches.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/HangingKneeRaise/',
		url: 'HangingKneeRaise.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/BarbellSeatedTwist/',
		url: 'BarbellSeatedTwist.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/DeclineBenchLegRaise/',
		url: 'DeclineBenchLegRaise.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/ToeTouchers/',
		url: 'ToeTouchers.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/ScissorKick/',
		url: 'ScissorKick.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/SeatedFlatBenchLegPullIn/',
		url: 'SeatedFlatBenchLegPullIn.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/TreadmillRunning/',
		url: 'TreadmillRunning.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/WalkingTreadmill/',
		url: 'WalkingTreadmill.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/StationaryBike/',
		url: 'StationaryBike.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/JumpRope/',
		url: 'JumpRope.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/BarbellShrug/',
		url: 'BarbellShrug.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/DumbbellShrug/',
		url: 'DumbbellShrug.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/DumbbellShrugInclineBench/',
		url: 'DumbbellShrugInclineBench.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/CableShrug/',
		url: 'CableShrug.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/SideCableRaise/',
		url: 'SideCableRaise.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/BarbellShoulderHighpull/',
		url: 'BarbellShoulderHighpull.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/DumbbellOne-ArmUprightRow/',
		url: 'DumbbellOne-ArmUprightRow.html',
		on: {
			pageInit: function () {

			}
		}

	},

	{

		path: '/UprightCableRow/',
		url: 'UprightCableRow.html',
		on: {
			pageInit: function () {

			}
		}

	},











	]

});
var notificationFull = app.notification.create({

	icon: '<i class="f7-icons">home</i>',
	title: 'Alfa Fit',
	subtitle: 'Welcome',
	text: 'Aplikasi Alfa Fit akan membantu mewujudkan body goals anda!',
	closeTimeout: 1000,
	on: {
		opened: function () {
			var a = localStorage.getItem('email');
			text: 'hallo';
		}
	},

});


var $$ = Dom7;

$$('.my-sheet').on('sheet:open', function (e, sheet) {
	console.log('my-sheet open');
});
$$('.my-sheet').on('sheet:opened', function (e, sheet) {
	console.log('my-sheet opened');
});

var ip = '192.168.43.236';

var mainView = app.views.create('.view-main');

var loginScreen = app.loginScreen.create({ /* parameters */ });


