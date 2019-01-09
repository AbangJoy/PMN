var $$ = Dom7;
var ip = '192.168.43.213';

var app = new Framework7({
	view: {
		pushState: true,
		pushStateSeparator: '#',
		pushStateOnLoad: false
	},
	root: '#app',
	name: 'Alfa Fit',
	theme: 'md',

	panel: {
		swipe: 'left'
	},

	routes: [{

		path: '/about/',
		url: 'about.html',
	},

	{
		path: '/tampilFeedback/',
		url: 'tampilFeedback.html',
		on: {
			pageInit: function (e, page) {
				app.request.post('http://' + ip + '/phpfile/tampilFeedBack.php', {
					email: localStorage.getItem('email')
				},
					function (data) {
						//append nampilin hasil feedback
						var obj = JSON.parse(data);
						if (obj.feedback != 'failed') {
							$$('.container').html('');
							if (obj[0].feedback == "puas") {
								$$('.container').append(
									'<div class="block-header" style="text-align: center; font-size: 20px; font-weight:bold; letter-spacing:' + '-1px; color: black;">' +
									'FEEDBACK' +
									'</div>' +
									'<div class="block-content" style="text-align: center; font-size: 14px; color: black;">Terima kasih ' +
									'atas feedback yang anda berikan. Semoga program anda terus berjalan efektif' +
									'<ul>' +
									'<input type="button" value="Berikan Feedback Baru" class="btn btn-primary btn-sm" id="btnFeedbackBaru" style="margin-top:180px;margin-left:-30px;" />' +
									'</ul>'
								);
							}
							else {
								$$('.container').append(
									'<div class="block-header" style="text-align: center; font-size: 20px; font-weight:bold; letter-spacing:' + '-1px; color: black;">' +
									'FEEDBACK' +
									'</div>' +
									'<div class="block-content" style="text-align: center; font-size: 14px; color: black;">Terima kasih ' +
									'atas feedback yang anda berikan. Kami akan membuat plan terbaru secepatnya' +
									'<ul>' +
									'<input type="button" value="Berikan Feedback Baru" class="btn btn-primary btn-sm" id="btnFeedbackBaru" style="margin-top:180px;margin-left:-30px;" />' +
									'</ul>'
								);

							}
						}
					});
				$$(document).on('click', '#btnFeedbackBaru', function () {
					app.router.navigate('/feedback/');
				});
			}
		}
	},

	{
		path: '/feedback/',
		url: 'feedback.html',
		on: {
			pageInit: function (e, page) {
				app.request.post('http://' + ip + '/phpfile/tampilFeedBack.php', {
					email: localStorage.getItem('email')
				}, function (data) {
					var obj = JSON.parse(data);
					if (obj.feedback != 'failed') {
						app.router.navigate('/tampilFeedback/');
					}
				});

				$$('.gridFeedback').on('click', function () {
					app.request.post('http://' + ip + '/phpfile/simpanFeedback.php', {
						email: localStorage.getItem('email'),
						feedback: $$(this).attr('id')
					}, function (data) {
						app.router.navigate('/tampilFeedback/');
					});
				});
			}
		}
	},

	{

		path: '/forum/',
		url: 'forum.html',
		on: {
			pageInit: function (page) {
				var id;
				app.request.post('http://' + ip + '/phpfile/tampilForum.php', {
					email: localStorage.getItem('email')
				},
					function (data) {
						if (data != 0) {
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
						}
					});

				$$(document).on('click', '.sheet-open', function () {
					id = $$(this).attr('id'); //id_forum

					app.request.post('http://' + ip + '/phpfile/selectTampilKomentar.php', {
						id_forum: id,
					},
						function (data) {
							$$('.container-komentar').html('');
							if (data != "0 results") {
								var obj = JSON.parse(data);
								var counter = Object.keys(obj).length;
								for (var i = 0; i < counter; i++) {
									$$('.container-komentar').append(
										'<div class="block-title">' + obj[i].nama_user + '</div>' +
										'<div class="block">' +
										'<p>' + obj[i].isi_komentar + '</p>' +
										'</div>'
									);
								}
							}
						});
				});

				$$('#btnKomentar').on('click', function () {
					var isiKomentar = $$('#isi_komentar').val();
					if (isiKomentar == "") {
						app.dialog.alert("Komentar harus diisi");
						return false;
					}
					app.request.post('http://' + ip + '/phpfile/inputKomentar.php', {
						komentar: isiKomentar,
						id_forum: id,
						email: localStorage.getItem('email')
					},
						function (data) {
							app.dialog.alert(data);
							document.getElementById("isi_komentar").value = "";
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
					var j = document.forms["formBuatForum"]["judulForum"].value;
					if (j == "") {
						app.dialog.alert("kolom Judul harus diisi");
						return false;
					}
					var i = document.forms["formBuatForum"]["isiForum"].value;
					if (i == "") {
						app.dialog.alert("kolom Isi harus diisi");
						return false;
					}

					var simpan_email = localStorage.getItem('email');
					var simpan_judul = $$('#judulForum').val();
					var simpan_isi = $$('#isiForum').val();

					app.request.post('http://' + ip + '/phpfile/inputForum.php',
						{
							email: simpan_email,
							judul: simpan_judul,
							isi: simpan_isi

						},
						function (data) {
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
				app.request.post('http://' + ip + '/phpfile/select_condition.php', {
					email: localStorage.getItem('email')
				},
					function (data) {
						$$('.container').html('');
						var obj = JSON.parse(data);
						$$('.container').append(
							'<div class="block-header" style="text-align: center; font-size: 20px; font-weight:bold; letter-spacing: -1px; color: black;">HASIL PERHITUNGAN' +
							'</div>' +
							'<div class="block-content" style="color: black;">' +
							'<p>BMI anda adalah...</p>' +
							'<h2>' + obj[0].BMI + ' </h2>' +
							'<hr color="black"></hr>' +
							'<p>BMR anda adalah...</p>' +
							'<h2>' + obj[0].BMR + ' Kal</h2>' +
							'<p>BMR adalah jumlah ' +
							'<b>MINIMAL</b>' + ' setiap hari yang dibutuhkan oleh tubuh agar organ-organ dapat berfungsi.</p>' +
							'<hr color="black"></hr>' +
							'<p>Berat lemak anda adalah...</p>' +
							'<h2>' + obj[0].total_fat + 'Kg </h2>' +
							'<p>Ini adalah berat lemak yang ada pada tubuh anda saat ini.</p>' +
							'<hr color="black"></hr>' +
							'<p>Kebutuhan kalori anda adalah...</p>' +
							'<h2>' + obj[0].kalori_harian + ' Kalori</h2>' +
							'<p>Jumlah tersebut adalah jumlah kebutuhan kalori harian yang anda harus cukupi.</p>' +
							'<p>Contoh Kalori dalam Makanan:</p>' +
							'<p>Nasi putih 100 grams (175 kalori) </p>' +
							'<p>Nasi goreng 100 grams ( 267 kalori) </p>' +
							'<p>Mie goreng 200 grams ( 321 kalori) </p>' +
							'<hr color="black"></hr>' +
							'<p>Kebutuhan Karbohidrat harian anda adalah...</p>' +
							'<h2>' + obj[0].karbohidrat_harian + ' grams</h2>' +
							'<hr color="black"></hr>' +
							'<p>Kebutuhan Protein harian anda adalah...</p>' +
							'<h2>' + obj[0].protein_harian + ' grams</h2>' +
							'<hr color="black"></hr>' +
							'<p>Kebutuhan Lemak harian anda adalah...</p>' +
							'<h2>' + obj[0].lemak_harian + ' grams</h2>' +
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
		path: '/menuGeneralPlan/',
		url: 'menuGeneralPlan.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/select_condition.php',
					{
						email: localStorage.getItem('email')
					}, function (data) {
						var obj = JSON.parse(data);
						var gender = obj[0].jenis_kelamin;
						if (gender == 'P') {
							$$('#pindahMenuGeneralPlan').css('background-image', 'url(img/cuttingFemale.jpeg');
							$$('#pindahMenuGeneralPlan2').css('background-image', 'url(img/bulkingFemale.jpeg');
							$$('#pindahMenuGeneralPlan3').css('background-image', 'url(img/conditioningFemale.jpeg');
						}
					});

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
			pageInit: function (page) {
				$$('#cardCustomPlans').on('click', function () {
					app.request.post('http://' + ip + '/phpfile/cekCustomPlan.php', {
						email: localStorage.getItem('email')
					}, function (data) {
						var obj = JSON.parse(data);
						if (obj == "ada") {
							app.router.navigate('/customplan/');
						}
						else {
							app.dialog.alert("Anda masih belum mengisikan kondisi anda saat ini, harap isi terlebih dahulu", "Peringatan");
							app.router.navigate('/setcondition/');
						}


					});

				});
			}

		}

	},

	{
		path: '/general_plan_paket_latihan_cutting/',
		url: 'general_plan_paket_latihan_cutting.html',
		on: {
			pageInit: function (page) {
				var id_plan = localStorage.getItem('id_plan');
				app.request.post('http://' + ip + '/phpfile/tampilPorsiLatihanGeneralPlan.php',
					{
						id_plan: id_plan
					},
					function (data) {
						if (data != 0) {
							$$('.canvasPorsiLatihan').html('');
							var obj = JSON.parse(data);
							var counter = Object.keys(obj).length;
							$$('.canvasPorsiLatihan').append(
								// '<div class="block-title" style="text-align: center;">' +
								// '<b>WEEK ' + obj[0].minggu + '</b>' +
								'</div> <div class="block-title">' +
								'<b>' + obj[0].hari + '</b>' +
								'</div>');
							for (var i = 0; i < counter; i++) {
								$$('.canvasPorsiLatihan').append(
									'<div class="block-title block-strong" style="font-size: 11px;">' +
									'<p style="font-size:14px;">' + obj[i].nama_exercise + '</p>' +
									'<h5>' + obj[i].sets + ' sets ' + obj[i].repetisi + ' reps </h5>' +
									'<a href="#" class="link">Lihat contoh gerakan</a>' +
									'</div>'
								);
							}

						}
					});

				$$('#btnFeedback').on('click', function () {
					app.router.navigate('/feedback/');
				});
			}
		}
	},

	{
		path: '/general_plan_paket_latihan_bulking/',
		url: 'general_plan_paket_latihan_bulking.html',
		on: {
			pageInit: function (page) {
				var id_plan = localStorage.getItem('id_plan');
				app.request.post('http://' + ip + '/phpfile/tampilPorsiLatihanGeneralPlan.php',
					{
						id_plan: id_plan
					},
					function (data) {
						if (data != 0) {
							$$('.canvasPorsiLatihan').html('');
							var obj = JSON.parse(data);
							var counter = Object.keys(obj).length;
							$$('.canvasPorsiLatihan').append(
								'</div> <div class="block-title">' +
								'<b>' + obj[0].hari + '</b>' +
								'</div>');
							for (var i = 0; i < counter; i++) {
								$$('.canvasPorsiLatihan').append(
									'<div class="block-title block-strong" style="font-size: 11px;">' +
									'<p style="font-size:14px;">' + obj[i].nama_exercise + '</p>' +
									'<h5>' + obj[i].sets + ' sets ' + obj[i].repetisi + ' reps </h5>' +
									'<a href="#" class="link">Lihat contoh gerakan</a>' +
									'</div>'
								);
							}
						}

					});
			}
		}
	},

	{
		path: '/general_plan_paket_latihan_conditioning/',
		url: 'general_plan_paket_latihan_conditioning.html',
		on: {
			pageInit: function (page) {
				var id_plan = localStorage.getItem('id_plan');
				app.request.post('http://' + ip + '/phpfile/tampilPorsiLatihanGeneralPlan.php',
					{
						id_plan: id_plan
					},
					function (data) {
						if (data != 0) {
							$$('.canvasPorsiLatihan').html('');
							var obj = JSON.parse(data);
							var counter = Object.keys(obj).length;
							$$('.canvasPorsiLatihan').append(
								'</div> <div class="block-title">' +
								'<b>' + obj[0].hari + '</b>' +
								'</div>');
							for (var i = 0; i < counter; i++) {
								$$('.canvasPorsiLatihan').append(
									'<div class="block-title block-strong" style="font-size: 11px;">' +
									'<p style="font-size:14px;">' + obj[i].nama_exercise + '</p>' +
									'<h5>' + obj[i].sets + ' sets ' + obj[i].repetisi + ' reps </h5>' +
									'<a href="#" class="link">Lihat contoh gerakan</a>' +
									'</div>'
								);
							}
						}
						// else {
						// 	app.dialog.alert("maaf Hari ini tidak ada latihan");
						// }
					});
			}
		}
	},

	{
		path: '/cuttingGeneralPlan/',
		url: 'cuttingGeneralPlan.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/cuttingGeneralPlan.php',
					function (data) {
						$$('.cuttingplanscard').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.cuttingplanscard').append(
								'<div class="card demo-card-header-pic" id="cardplanshome">' +
								'<a id="' + obj[i].id_plan + '" href="#" style="height:100px; background-size: 100% 100%;background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_tampilan + ');" class="card-content card-content-padding cuttingGeneralPlan">' +
								'<div class="block fullbodytrainingtitle" style="height: 20px; width: 260px; border: 1px solid; color: white; border-color: black; background-color: black;">' + obj[i].nama_plan + '</div>' +
								'</a>' +
								'<div class="card-footer" style="text-align: left;">' +
								'<h7>' + obj[i].level_plan + '</h7><h7>|</h7><h7>' + obj[i].jenis_program +
								'</div>' +
								'</div>'
							);
						}
					});

				$$(document).on('click', '.cuttingGeneralPlan', function () {
					localStorage.setItem('id_plan', $$(this).attr('id'));
					app.router.navigate('/general_plan_paket_latihan_cutting/');
				});


			}
		}

	},

	{
		path: '/bulkingGeneralPlan/',
		url: 'bulkingGeneralPlan.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/bulkingGeneralPlan.php',
					function (data) {
						$$('.bulkingplanscard').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.bulkingplanscard').append(
								'<div class="card demo-card-header-pic" id="cardplanshome">' +
								'<a id="' + obj[i].id_plan + '" href="#" style="height:100px; background-size: 100% 100%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_tampilan + ');" class="card-content card-content-padding bulkingGeneralPlan">' +
								'<div class="block fullbodytrainingtitle" style="height: 20px; width: 180px; border: 1px solid; color: white; border-color: black; background-color: black;">' + obj[i].nama_plan + '</div>' +
								'</a>' +
								'<div class="card-footer" style="text-align: left;">' +
								'<h7>' + obj[i].level_plan + '</h7><h7>|</h7><h7>' + obj[i].jenis_program +
								'</div>' +
								'</div>'
							);
						}
					});
				$$(document).on('click', '.bulkingGeneralPlan', function () {
					localStorage.setItem('id_plan', $$(this).attr('id'));
					app.router.navigate('/general_plan_paket_latihan_bulking/');
				});
			}
		}

	},

	{
		path: '/conditioningGeneralPlan/',
		url: 'conditioningGeneralPlan.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/conditioningGeneralPlan.php',
					function (data) {
						$$('.conditioningplanscard').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.conditioningplanscard').append(
								'<div class="card demo-card-header-pic" id="cardplanshome">' +
								'<a id="' + obj[i].id_plan + '" href="#" style="height:100px; background-size: 100% 100%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_tampilan + ');" class="card-content card-content-padding conditioningGeneralPlan">' +
								'<div class="block fullbodytrainingtitle" style="height: 20px; width: 180px; border: 1px solid; color: white; border-color: black; background-color: black;">' + obj[i].nama_plan + '</div>' +
								'</a>' +
								'<div class="card-footer" style="text-align: left;">' +
								'<h7>' + obj[i].level_plan + '</h7><h7>|</h7><h7>' + obj[i].jenis_program +
								'</div>' +
								'</div>'
							);
						}
					});
				$$(document).on('click', '.conditioningGeneralPlan', function () {
					localStorage.setItem('id_plan', $$(this).attr('id'));
					app.router.navigate('/general_plan_paket_latihan_conditioning/');
				});
			}
		}

	},

	{
		path: '/generalplan/',
		url: 'generalplan.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/generalplan.php',
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
				app.request.post('http://' + ip + '/phpfile/select_condition.php',
					{
						email: localStorage.getItem('email')
					}, function (data) {
						var obj = JSON.parse(data);
						var gender = obj[0].jenis_kelamin;
						if (gender == 'P') {
							$$('#cutting').css('background-image', 'url(img/customPlanFemaleCutting.jpg');
							$$('#bulking').css('background-image', 'url(img/customPlanFemaleBulking.jpg');
							$$('#conditioning').css('background-image', 'url(img/customPlanFemaleConditioning.jpg');
						}
					});

				$$('.cardsMenuCustomPlan').on('click', function () {
					localStorage.setItem('id_program', $$(this).attr('id'));
					app.request.post('http://' + ip + '/phpfile/prosesCustomPlan.php', {
						email: localStorage.getItem('email'),
						program: $$(this).attr('id')
					}, function (data) {
						app.router.navigate('/tampilCustomPlan/');
					});
				});

			}

		}
	},

	{
		path: '/tampilCustomPlan/',
		url: 'tampilCustomPlan.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectPorsiCustomPlan.php', {
					email: localStorage.getItem('email'),
					program: localStorage.getItem('id_program')
				},
					function (data) {
						if (data != 0) {
							$$('.canvasPorsiLatihan').html('');
							var obj = JSON.parse(data);
							var counter = Object.keys(obj).length;
							var hari = null;
							var today = null;
							for (var i = 0; i < counter; i++) {
								switch (obj[i].hari_ke) {
									case '1':
										hari = 'SENIN';
										break;

									case '2':
										hari = 'SELASA';
										break;

									case '3':
										hari = 'RABU';
										break;

									case '4':
										hari = 'KAMIS';
										break;

									case '5':
										hari = 'JUMAT';
										break;

									case '6':
										hari = 'SABTU';
										break;

									case '7':
										hari = 'MINGGU';
										break;
								}

								if (hari != today) {
									$$('.canvasPorsiLatihan').append(
										'<div class="block-title block-strong" style="font-size: 13px; border-bottom:solid 2px; border-top:solid 2px; font-weight:bold;">' +
										hari +
										'</div >'
									);
									today = hari;
								}

								$$('.canvasPorsiLatihan').append(
									'<div class="block-title" style="font-size: 11px;">' +
									'<h2 style="font-size:16px;">' + obj[i].nama_exercise + '</h2>' +
									'<h5 style="font-size:14px;">' + obj[i].sets + ' sets ' + obj[i].repetisi + 'reps </h5>' +
									'<a href="#" class="link">Lihat contoh gerakan</a>' +
									'</div >'
								);
							}
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

		path: '/infoBMI/',
		url: 'infoBMI.html',
	},

	{

		path: '/myprofile/',
		url: 'myprofile.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/select_condition.php', {
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
							'<div class="item-after">' + obj[0].tinggi_badan + ' Cm</div>' +
							'</div>' +
							'</div>' +
							'</li>' +
							'<li>' +
							'<div class="item-content">' +

							'<div class="item-inner">' +
							'<div class="item-title">Weight</div>' +
							'<div class="item-after">' + obj[0].berat_badan + ' Kg</div>' +
							'</div>' +
							'</div>' +
							'</li>' +
							'<li>' +
							'<div class="item-content">' +

							'<div class="item-inner">' +
							'<div class="item-title">Age</div>' +
							'<div class="item-after">' + obj[0].umur + ' Tahun</div>' +
							'</div>' +
							'</div>' +
							'<div class="item-content">' +

							'<div class="item-inner">' +
							'<div class="item-title">Gender</div>' +
							'<div class="item-after">' + obj[0].jenis_kelamin + '</div>' +
							'</div>' +
							'</div>' +
							'</li>' +
							'<li>' +
							'<div class="item-content">' +

							'<div class="item-inner">' +
							'<div class="item-title">Body type</div>' +
							'<div class="item-after">' + obj[0].tipe_badan + '</div>' +
							'</div>' +
							'</div>' +
							'</li>' +
							'<li>' +
							'<div class="item-content">' +

							'<div class="item-inner">' +
							'<div class="item-title">BMI</div>' +
							'<div class="item-after">' + obj[0].BMI + ' </div>' +
							'<a href="/infoBMI/" class="icon-block">' +
							'<i class="icon material-icons md-only">help</i>' +
							'</a>' +
							'</div>' +
							'</div>' +
							'</li>' +
							'<li>' +
							'<div class="item-content">' +

							'<div class="item-inner">' +
							'<div class="item-title">BMR</div>' +
							'<div class="item-after">' + obj[0].BMR + ' Kalori</div>' +
							'</div>' +
							'</div>' +
							'</li>' +
							'<li>' +
							'<div class="item-content">' +

							'<div class="item-inner">' +
							'<div class="item-title">Total Fat</div>' +
							'<div class="item-after">' + obj[0].total_fat + ' Kg</div>' +
							'</div>' +
							'</div>' +
							'</li>' +
							'<li>' +
							'<div class="item-content">' +

							'<div class="item-inner">' +
							'<div class="item-title">Kalori Harian</div>' +
							'<div class="item-after">' + obj[0].kalori_harian + ' Kalori</div>' +
							'</div>' +
							'</div>' +
							'</li>' +
							'<li>' +
							'<div class="item-content">' +

							'<div class="item-inner">' +
							'<div class="item-title">Karbohidrat Harian</div>' +
							'<div class="item-after">' + obj[0].karbohidrat_harian + ' Grams</div>' +
							'</div>' +
							'</div>' +
							'</li>' +
							'<li>' +
							'<div class="item-content">' +

							'<div class="item-inner">' +
							'<div class="item-title">Protein Harian</div>' +
							'<div class="item-after">' + obj[0].protein_harian + ' Grams</div>' +
							'</div>' +
							'</div>' +
							'</li>' +
							'<li>' +
							'<div class="item-content">' +

							'<div class="item-inner">' +
							'<div class="item-title">Lemak Harian</div>' +
							'<div class="item-after">' + obj[0].lemak_harian + ' Grams</div>' +
							'</div>' +
							'</div>' +
							'</li>' +
							'</ul>' +
							'</div>' +
							'</div>'


						);
					});
				$$('#infoBMI').on('click', function () {
					app.router.navigate('/infoBMI/');
				});

				$$('#btnsetcondition').on('click', function () {
					app.router.navigate('/setcondition/');
				});

				$$('.logout').on('click', function () {

					localStorage.removeItem('email');
					app.router.navigate('/index/');

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
					var simpan_bodytype = $$('#bodytype').val();
					var simpan_activity = $$('#levelaktifitas').val();

					app.request.post('http://' + ip + '/phpfile/inputcondition.php',
						{
							email: simpan_email,
							weight: simpan_weight,
							height: simpan_height,
							age: simpan_age,
							bodytype: simpan_bodytype,
							aktifitas: simpan_activity
						},
						function (data) {
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
				app.request.post('http://' + ip + '/phpfile/exercise_trapezius.php',
					function (data) {
						$$('.list').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.list').append(
								'<ul>' +
								'<li>' +
								'<a id="' + obj[i].id_exercise + '" data-href="' + obj[i].url + '"  href="#" class="item-link item-content" style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px; margin-top:8px; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
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
				$$(document).on('click', 'a', function () {
					localStorage.setItem('id_exercise', $$(this).attr('id'));
					app.router.navigate($$(this).attr('data-href'));
				});
			}
		}
	},

	{
		path: '/cardio-home/',
		url: 'cardio-home.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/exercise_cardio.php',
					function (data) {
						$$('.list').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.list').append(
								'<ul>' +
								'<li>' +
								'<a id="' + obj[i].id_exercise + '" data-href="' + obj[i].url + '" href="#" class="item-link item-content" style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px; margin-top:8px; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
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
				$$(document).on('click', 'a', function () {
					localStorage.setItem('id_exercise', $$(this).attr('id'));
					app.router.navigate($$(this).attr('data-href'));
				});
			}
		}
	},

	{
		path: '/abs-home/',
		url: 'abs-home.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/exercise_abs.php',
					function (data) {
						$$('.list').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.list').append(
								'<ul>' +
								'<li>' +
								'<a id="' + obj[i].id_exercise + '" data-href="' + obj[i].url + '" href="#" class="item-link item-content" style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px; margin-top:8px; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
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
				$$(document).on('click', 'a', function () {
					localStorage.setItem('id_exercise', $$(this).attr('id'));
					app.router.navigate($$(this).attr('data-href'));
				});
			}
		}
	},

	{
		path: '/lowerleg-home/',
		url: 'lowerleg-home.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/exercise_lowerleg.php',
					function (data) {
						$$('.list').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.list').append(
								'<ul>' +
								'<li>' +
								'<a id="' + obj[i].id_exercise + '" data-href="' + obj[i].url + '" href="#" class="item-link item-content" style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px; margin-top:8px; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
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
				$$(document).on('click', 'a', function () {
					localStorage.setItem('id_exercise', $$(this).attr('id'));
					app.router.navigate($$(this).attr('data-href'));
				});
			}
		}
	},

	{
		path: '/glutes-home/',
		url: 'glutes-home.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/exercise_glutes.php',
					function (data) {
						$$('.list').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.list').append(
								'<ul>' +
								'<li>' +
								'<a id="' + obj[i].id_exercise + '" data-href="' + obj[i].url + '" href="#" class="item-link item-content" style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px; margin-top:8px; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
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
				$$(document).on('click', 'a', function () {
					localStorage.setItem('id_exercise', $$(this).attr('id'));
					app.router.navigate($$(this).attr('data-href'));
				});
			}
		}
	},

	{
		path: '/upperleg-home/',
		url: 'upperleg-home.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/exercise_upperleg.php',
					function (data) {
						$$('.list').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.list').append(
								'<ul>' +
								'<li>' +
								'<a id="' + obj[i].id_exercise + '" data-href="' + obj[i].url + '" href="#" class="item-link item-content" style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px; margin-top:8px; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
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
				$$(document).on('click', 'a', function () {
					localStorage.setItem('id_exercise', $$(this).attr('id'));
					app.router.navigate($$(this).attr('data-href'));
				});
			}
		}
	},

	{
		path: '/back-home/',
		url: 'back-home.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/exercise_back.php',
					function (data) {
						$$('.list').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.list').append(
								'<ul>' +
								'<li>' +
								'<a id="' + obj[i].id_exercise + '" data-href="' + obj[i].url + '" href="#" class="item-link item-content" style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px;  margin-top:8px; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
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
				$$(document).on('click', 'a', function () {
					localStorage.setItem('id_exercise', $$(this).attr('id'));
					app.router.navigate($$(this).attr('data-href'));
				});
			}
		}
	},

	{
		path: '/shoulders-home/',
		url: 'shoulders-home.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/exercise_shoulder.php',
					function (data) {
						$$('.list').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.list').append(
								'<ul>' +
								'<li>' +
								'<a id="' + obj[i].id_exercise + '" data-href="' + obj[i].url + '" href="#" class="item-link item-content">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px; margin-top:8px; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
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
				$$(document).on('click', 'a', function () {
					localStorage.setItem('id_exercise', $$(this).attr('id'));
					app.router.navigate($$(this).attr('data-href'));
				});
			}
		}
	},

	{
		path: '/chest-home/',
		url: 'chest-home.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/exercise_chest.php',
					function (data) {
						$$('.list').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.list').append(
								'<ul>' +
								'<li>' +
								'<a id="' + obj[i].id_exercise + '" data-href="' + obj[i].url + '" href="#" class="item-link item-content" style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px;  margin-top:8px; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
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
				$$(document).on('click', 'a', function () {
					localStorage.setItem('id_exercise', $$(this).attr('id'));
					app.router.navigate($$(this).attr('data-href'));
				});
			}
		}
	},

	{
		path: '/forearm-home/',
		url: 'forearm-home.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/exercise_forearm.php',
					function (data) {
						$$('.list').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.list').append(
								'<ul>' +
								'<li>' +
								'<a id="' + obj[i].id_exercise + '" data-href="' + obj[i].url + '"  href="#" class="item-link item-content" style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px; margin-top:8px; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
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
				$$(document).on('click', 'a', function () {
					localStorage.setItem('id_exercise', $$(this).attr('id'));
					app.router.navigate($$(this).attr('data-href'));
				});
			}
		}
	},

	{
		path: '/triceps-home/',
		url: 'triceps-home.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/exercise_triceps.php',
					function (data) {
						$$('.list').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.list').append(
								'<ul>' +
								'<li>' +
								'<a id="' + obj[i].id_exercise + '" data-href="' + obj[i].url + '" href="#" class="item-link item-content"  style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px; margin-top:8px; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
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
				$$(document).on('click', 'a', function () {
					localStorage.setItem('id_exercise', $$(this).attr('id'));
					app.router.navigate($$(this).attr('data-href'));
				});
			}
		}
	},

	{
		path: '/biceps-home/',
		url: 'biceps-home.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/exercise_biceps.php',
					function (data) {
						$$('.list').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.list').append(
								'<ul>' +
								'<li>' +
								'<a id="' + obj[i].id_exercise + '" data-href="' + obj[i].url + '" href="#" class="item-link item-content" style="height: 60px;">' +
								'<div class="item-media" style="height: 45px; width:40px; border:1px solid #0a0f0f; border-radius: 7px; margin-top:8px; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_exercise + ');"></div>' +
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

				$$(document).on('click', 'a', function () {
					localStorage.setItem('id_exercise', $$(this).attr('id'));
					app.router.navigate($$(this).attr('data-href'));
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
		on: {
			pageInit: function (e, page) {

				// 		if(localStorage.getItem('email')!=null){
				// 			app.dialog.alert('bisa');
				app.router.navigate('/home/');
				// 		}


			}
		}
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


				$$('.cardshortcut1').on('click', function () {

					app.router.navigate('/cuttingGeneralPlan/');
				});

				$$('.cardshortcut2').on('click', function () {

					app.router.navigate('/BulkingGeneralPlan/');
				});

				$$('.cardshortcut3').on('click', function () {

					app.router.navigate('/setcondition/');
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

					if (a == "") {
						app.dialog.alert("Kolom email harus diisi");
						return false;
					}
					if (b == "") {
						app.dialog.alert("Kolom password harus diisi");
						return false;
					}

					app.request.post('http://' + ip + '/phpfile/login.php', {
						email: a,
						password: b
					}, function (data) {
						if (data == 1) {
							localStorage.setItem('email', a);
							sessionStorage.setItem('email', a);

							notificationFull.open();
							app.router.navigate('/home/');
						} else {
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
					var g = document.forms["formSubmit"]["gender"].value;
					if (g == "") {
						app.dialog.alert("gender kolom harus diisi");
						return false;
					}

					$$('#btnBack').on('click', function () {
						app.router.navigate('/index/');
					});

					app.panel.close();
					//page.router.navigate('/product/');
					var x = new FormData($$(".form-ajax-submit")[0]);
					app.request.post('http://' + ip + '/phpfile/signup.php', x, function (data) {
						app.dialog.alert('Anda telah terdafar');
						app.router.navigate('/index/');
					});
				});
			}
		}

	},

	{

		path: '/dumbbellAlternateHammerCurl/',
		url: 'dumbbellAlternateHammerCurl.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});

				$$('.backToBicepsHome').on('click', function () {
					app.router.navigate('/biceps-home/');
				});
			}
		}
	},

	{

		path: '/dumbbellAlternateBicepCurl/',
		url: 'dumbbellAlternateBicepCurl.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});

				$$('.backToBicepsHome').on('click', function () {
					app.router.navigate('/biceps-home/');
				});
			}
		}
	},

	{

		path: '/dumbbellBicepsCurl/',
		url: 'dumbbellBicepsCurl.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBicepsHome').on('click', function () {
					app.router.navigate('/biceps-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellInclineCurl/',
		url: 'dumbbellInclineCurl.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBicepsHome').on('click', function () {
					app.router.navigate('/biceps-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellConcentrationCurl/',
		url: 'dumbbellConcentrationCurl.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBicepsHome').on('click', function () {
					app.router.navigate('/biceps-home/');
				});
			}
		}

	},

	{

		path: '/barbellCurl/',
		url: 'barbellCurl.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBicepsHome').on('click', function () {
					app.router.navigate('/biceps-home/');
				});
			}
		}

	},

	{

		path: '/EzBarCurl/',
		url: 'EzBarCurl.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBicepsHome').on('click', function () {
					app.router.navigate('/biceps-home/');
				});
			}
		}

	},

	{

		path: '/barbellWideCurl/',
		url: 'barbellWideCurl.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBicepsHome').on('click', function () {
					app.router.navigate('/biceps-home/');
				});
			}
		}

	},

	{

		path: '/barbellCloseGripCurl/',
		url: 'barbellCloseGripCurl.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBicepsHome').on('click', function () {
					app.router.navigate('/biceps-home/');
				});
			}
		}

	},

	{

		path: '/cableCurl/',
		url: 'cableCurl.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBicepsHome').on('click', function () {
					app.router.navigate('/biceps-home/');
				});
			}
		}

	},


	{

		path: '/dumbbellSeatedCurl/',
		url: 'dumbbellSeatedCurl.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBicepsHome').on('click', function () {
					app.router.navigate('/biceps-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellSpiderCurl/',
		url: 'dumbbellSpiderCurl.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBicepsHome').on('click', function () {
					app.router.navigate('/biceps-home/');
				});
			}
		}

	},

	{

		path: '/tricepsPushdownVBar/',
		url: 'tricepsPushdownVBar.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToTricepsHome').on('click', function () {
					app.router.navigate('/triceps-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellStandingOneArmTricepsExtension/',
		url: 'dumbbellStandingOneArmTricepsExtension.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToTricepsHome').on('click', function () {
					app.router.navigate('/triceps-home/');
				});
			}
		}

	},

	{

		path: '/barbellStandingTricepsExtension/',
		url: 'barbellStandingTricepsExtension.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToTricepsHome').on('click', function () {
					app.router.navigate('/triceps-home/');
				});
			}
		}

	},

	{

		path: '/cableRopeTricepsPushdown/',
		url: 'cableRopeTricepsPushdown.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToTricepsHome').on('click', function () {
					app.router.navigate('/triceps-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellTricepKickback/',
		url: 'dumbbellTricepKickback.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToTricepsHome').on('click', function () {
					app.router.navigate('/triceps-home/');
				});
			}
		}

	},

	{

		path: '/singleBenchDip/',
		url: 'singleBenchDip.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToTricepsHome').on('click', function () {
					app.router.navigate('/triceps-home/');
				});
			}
		}

	},

	{

		path: '/cableRopeUnderheadTricepsExtension/',
		url: 'cableRopeUnderheadTricepsExtension.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToTricepsHome').on('click', function () {
					app.router.navigate('/triceps-home/');
				});
			}
		}

	},

	{

		path: '/closeTricepsPushup/',
		url: 'closeTricepsPushup.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToTricepsHome').on('click', function () {
					app.router.navigate('/triceps-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellLyingSupineTwoArmTricepsExtension/',
		url: 'dumbbellLyingSupineTwoArmTricepsExtension.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToTricepsHome').on('click', function () {
					app.router.navigate('/triceps-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellLateralRaise/',
		url: 'dumbbellLateralRaise.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToShouldersHome').on('click', function () {
					app.router.navigate('/shoulders-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellShoulderPress/',
		url: 'dumbbellShoulderPress.html',
		on: {
			pageInit: function (page) {

				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToShouldersHome').on('click', function () {
					app.router.navigate('/shoulders-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellFrontRaise/',
		url: 'dumbbellFrontRaise.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToShouldersHome').on('click', function () {
					app.router.navigate('/shoulders-home/');
				});
			}
		}

	},

	{

		path: '/DumbbellArnoldPress/',
		url: 'DumbbellArnoldPress.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToShouldersHome').on('click', function () {
					app.router.navigate('/shoulders-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellStandingPress/',
		url: 'dumbbellStandingPress.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToShouldersHome').on('click', function () {
					app.router.navigate('/shoulders-home/');
				});
			}
		}

	},

	{

		path: '/barbbellShoulderPress/',
		url: 'barbbellShoulderPress.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToShouldersHome').on('click', function () {
					app.router.navigate('/shoulders-home/');
				});
			}
		}

	},

	{

		path: '/barbbellUpRightRow/',
		url: 'barbbellUpRightRow.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToShouldersHome').on('click', function () {
					app.router.navigate('/shoulders-home/');
				});
			}
		}

	},

	{

		path: '/barbbellStandingMilitaryPress/',
		url: 'barbbellStandingMilitaryPress.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToShouldersHome').on('click', function () {
					app.router.navigate('/shoulders-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellBentOverDeltRaise/',
		url: 'dumbbellBentOverDeltRaise.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToShouldersHome').on('click', function () {
					app.router.navigate('/shoulders-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellUpRightRow/',
		url: 'dumbbellUpRightRow.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToShouldersHome').on('click', function () {
					app.router.navigate('/shoulders-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellReverseFlyes/',
		url: 'dumbbellReverseFlyes.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToShouldersHome').on('click', function () {
					app.router.navigate('/shoulders-home/');
				});
			}
		}

	},

	{

		path: '/barbbellFrontRaise/',
		url: 'barbbellFrontRaise.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToShouldersHome').on('click', function () {
					app.router.navigate('/shoulders-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellSeatedSideLateralRaise/',
		url: 'dumbbellSeatedSideLateralRaise.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToShouldersHome').on('click', function () {
					app.router.navigate('/shoulders-home/');
				});
			}
		}

	},

	{

		path: '/SmithMachineOverheadShoulderPress/',
		url: 'SmithMachineOverheadShoulderPress.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToShouldersHome').on('click', function () {
					app.router.navigate('/shoulders-home/');
				});
			}
		}

	},

	{

		path: '/cableFrontRaise/',
		url: 'cableFrontRaise.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToShouldersHome').on('click', function () {
					app.router.navigate('/shoulders-home/');
				});
			}
		}

	},

	{

		path: '/barbbellPushPress/',
		url: 'barbbellPushPress.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToShouldersHome').on('click', function () {
					app.router.navigate('/shoulders-home/');
				});
			}
		}

	},

	{

		path: '/weightPlateFrontRaise/',
		url: 'weightPlateFrontRaise.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToShouldersHome').on('click', function () {
					app.router.navigate('/shoulders-home/');
				});
			}
		}

	},

	{

		path: '/barbellReverseCurl/',
		url: 'barbellReverseCurl.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToForearmHome').on('click', function () {
					app.router.navigate('/forearm-home/');
				});
			}
		}

	},

	{

		path: '/barbellSeatedPalmsUpWristCurl/',
		url: 'barbellSeatedPalmsUpWristCurl.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToForearmHome').on('click', function () {
					app.router.navigate('/forearm-home/');
				});
			}
		}

	},

	{

		path: '/barbellBenchPress/',
		url: 'barbellBenchPress.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToChestHome').on('click', function () {
					app.router.navigate('/chest-home/');
				});
			}
		}

	},

	{

		path: '/barbellInclineBenchPress/',
		url: 'barbellInclineBenchPress.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToChestHome').on('click', function () {
					app.router.navigate('/chest-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellBenchPress/',
		url: 'dumbbellBenchPress.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToChestHome').on('click', function () {
					app.router.navigate('/chest-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellInclineBenchPress/',
		url: 'dumbbellInclineBenchPress.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToChestHome').on('click', function () {
					app.router.navigate('/chest-home/');
				});
			}
		}

	},

	{

		path: '/dumbbelIFly/',
		url: 'dumbbelIFly.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToChestHome').on('click', function () {
					app.router.navigate('/chest-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellInclineFly/',
		url: 'dumbbellInclineFly.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToChestHome').on('click', function () {
					app.router.navigate('/chest-home/');
				});
			}
		}

	},

	{

		path: '/barbellDeclineBenchPress/',
		url: 'barbellDeclineBenchPress.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToChestHome').on('click', function () {
					app.router.navigate('/chest-home/');
				});
			}
		}

	},

	{

		path: '/benchPressMachine/',
		url: 'benchPressMachine.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToChestHome').on('click', function () {
					app.router.navigate('/chest-home/');
				});
			}
		}

	},

	{

		path: '/machineInclineChestPress/',
		url: 'machineInclineChestPress.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToChestHome').on('click', function () {
					app.router.navigate('/chest-home/');
				});
			}
		}

	},

	{

		path: '/smithMachineBenchPress/',
		url: 'smithMachineBenchPress.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToChestHome').on('click', function () {
					app.router.navigate('/chest-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellStraightArmPullover/',
		url: 'dumbbellStraightArmPullover.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToChestHome').on('click', function () {
					app.router.navigate('/chest-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellHammerGripInclineBenchPress/',
		url: 'dumbbellHammerGripInclineBenchPress.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToChestHome').on('click', function () {
					app.router.navigate('/chest-home/');
				});
			}
		}

	},

	{

		path: '/platePress/',
		url: 'platePress.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToChestHome').on('click', function () {
					app.router.navigate('/chest-home/');
				});
			}
		}

	},

	{

		path: '/pushUp/',
		url: 'pushUp.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToChestHome').on('click', function () {
					app.router.navigate('/chest-home/');
				});
			}
		}

	},

	{

		path: '/benchPushups/',
		url: 'benchPushups.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToChestHome').on('click', function () {
					app.router.navigate('/chest-home/');
				});
			}
		}

	},

	{

		path: '/wideGripLatPulldown/',
		url: 'wideGripLatPulldown.html',
		on: {
			pageInit: function (page) {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBackHome').on('click', function () {
					app.router.navigate('/back-home/');
				});
			}
		}

	},

	{

		path: '/PullUps/',
		url: 'PullUps.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBackHome').on('click', function () {
					app.router.navigate('/back-home/');
				});
			}
		}

	},

	{

		path: '/cableSeatedRow/',
		url: 'cableSeatedRow.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBackHome').on('click', function () {
					app.router.navigate('/back-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellOneArmRow/',
		url: 'dumbbellOneArmRow.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBackHome').on('click', function () {
					app.router.navigate('/back-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellBentOverRow/',
		url: 'dumbbellBentOverRow.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBackHome').on('click', function () {
					app.router.navigate('/back-home/');
				});
			}
		}

	},

	{

		path: '/barbellBentOverRow/',
		url: 'barbellBentOverRow.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBackHome').on('click', function () {
					app.router.navigate('/back-home/');
				});
			}
		}

	},

	{

		path: '/ChinUp/',
		url: 'ChinUp.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBackHome').on('click', function () {
					app.router.navigate('/back-home/');
				});
			}
		}

	},

	{

		path: '/barbellDeadlift/',
		url: 'barbellDeadlift.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBackHome').on('click', function () {
					app.router.navigate('/back-home/');
				});
			}
		}

	},

	{

		path: '/backExtensions/',
		url: 'backExtensions.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBackHome').on('click', function () {
					app.router.navigate('/back-home/');
				});
			}
		}

	},

	{

		path: '/TBarRow/',
		url: 'TBarRow.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBackHome').on('click', function () {
					app.router.navigate('/back-home/');
				});
			}
		}

	},

	{

		path: '/barbellRomanianDeadlift/',
		url: 'barbellRomanianDeadlift.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBackHome').on('click', function () {
					app.router.navigate('/back-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellDeadlift/',
		url: 'dumbbellDeadlift.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBackHome').on('click', function () {
					app.router.navigate('/back-home/');
				});
			}
		}

	},

	{

		path: '/machineLatPullDown/',
		url: 'machineLatPullDown.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToBackHome').on('click', function () {
					app.router.navigate('/back-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellSquat/',
		url: 'dumbbellSquat.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToUpperLegHome').on('click', function () {
					app.router.navigate('/upperleg-home/');
				});
			}
		}

	},

	{

		path: '/barbellSquat/',
		url: 'barbellSquat.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToUpperLegHome').on('click', function () {
					app.router.navigate('/upperleg-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellLunges/',
		url: 'dumbbellLunges.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToUpperLegHome').on('click', function () {
					app.router.navigate('/upperleg-home/');
				});
			}
		}

	},

	{

		path: '/barbellLunge/',
		url: 'barbellLunge.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToUpperLegHome').on('click', function () {
					app.router.navigate('/upperleg-home/');
				});
			}
		}

	},

	{

		path: '/prisonerSquat/',
		url: 'prisonerSquat.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToUpperLegHome').on('click', function () {
					app.router.navigate('/upperleg-home/');
				});
			}
		}

	},

	{

		path: '/bodyweightLunge/',
		url: 'bodyweightLunge.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToUpperLegHome').on('click', function () {
					app.router.navigate('/upperleg-home/');
				});
			}
		}

	},

	{

		path: '/barbellFrontSquat/',
		url: 'barbellFrontSquat.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToUpperLegHome').on('click', function () {
					app.router.navigate('/upperleg-home/');
				});
			}
		}

	},

	{

		path: '/legExtensions/',
		url: 'legExtensions.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToUpperLegHome').on('click', function () {
					app.router.navigate('/upperleg-home/');
				});
			}
		}

	},

	{

		path: '/legPressMachine/',
		url: 'legPressMachine.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToUpperLegHome').on('click', function () {
					app.router.navigate('/upperleg-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellStepUps/',
		url: 'dumbbellStepUps.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToUpperLegHome').on('click', function () {
					app.router.navigate('/upperleg-home/');
				});
			}
		}

	},

	{

		path: '/dumbbellPileSquat/',
		url: 'dumbbellPileSquat.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToUpperLegHome').on('click', function () {
					app.router.navigate('/upperleg-home/');
				});
			}
		}

	},

	{

		path: '/Bridge/',
		url: 'Bridge.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToGlutesHome').on('click', function () {
					app.router.navigate('/glutes-home/');
				});
			}
		}

	},

	{

		path: '/GluteKickback/',
		url: 'GluteKickback.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToGlutesHome').on('click', function () {
					app.router.navigate('/glutes-home/');
				});
			}
		}

	},

	{

		path: '/FlutterKick/',
		url: 'FlutterKick.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToGlutesHome').on('click', function () {
					app.router.navigate('/glutes-home/');
				});
			}
		}

	},

	{

		path: '/OneLegKickback/',
		url: 'OneLegKickback.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToGlutesHome').on('click', function () {
					app.router.navigate('/glutes-home/');
				});
			}
		}

	},

	{

		path: '/OneKneetoChest/',
		url: 'OneKneetoChest.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToGlutesHome').on('click', function () {
					app.router.navigate('/glutes-home/');
				});
			}
		}

	},


	{

		path: '/KneeAcrossTheBody/',
		url: 'KneeAcrossTheBody.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToGlutesHome').on('click', function () {
					app.router.navigate('/glutes-home/');
				});
			}
		}

	},

	{

		path: '/BodyweightStandingCalfRaise/',
		url: 'BodyweightStandingCalfRaise.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToLowerlegHome').on('click', function () {
					app.router.navigate('/lowerleg-home/');
				});
			}
		}

	},

	{

		path: '/Plank/',
		url: 'Plank.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToAbsHome').on('click', function () {
					app.router.navigate('/abs-home/');
				});
			}
		}

	},

	{

		path: '/Situp/',
		url: 'Situp.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToAbsHome').on('click', function () {
					app.router.navigate('/abs-home/');
				});
			}
		}

	},

	{

		path: '/LegRaise/',
		url: 'LegRaise.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToAbsHome').on('click', function () {
					app.router.navigate('/abs-home/');
				});
			}
		}

	},

	{

		path: '/AirBike/',
		url: 'AirBike.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToAbsHome').on('click', function () {
					app.router.navigate('/abs-home/');
				});
			}
		}

	},

	{

		path: '/Crunches/',
		url: 'Crunches.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToAbsHome').on('click', function () {
					app.router.navigate('/abs-home/');
				});
			}
		}

	},

	{

		path: '/DumbbellSideBend/',
		url: 'DumbbellSideBend.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToAbsHome').on('click', function () {
					app.router.navigate('/abs-home/');
				});
			}
		}

	},

	{

		path: '/AlternateHeelTouchers/',
		url: 'AlternateHeelTouchers.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToAbsHome').on('click', function () {
					app.router.navigate('/abs-home/');
				});
			}
		}

	},

	{

		path: '/BarbellAbRolloutonKnees/',
		url: 'BarbellAbRolloutonKnees.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToAbsHome').on('click', function () {
					app.router.navigate('/abs-home/');
				});
			}
		}

	},

	{

		path: '/WeightplateTwist/',
		url: 'WeightplateTwist.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToAbsHome').on('click', function () {
					app.router.navigate('/abs-home/');
				});
			}
		}

	},

	{

		path: '/TreadmillRunning/',
		url: 'TreadmillRunning.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToCardioHome').on('click', function () {
					app.router.navigate('/cardio-home/');
				});
			}
		}

	},

	{

		path: '/WalkingTreadmill/',
		url: 'WalkingTreadmill.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToCardioHome').on('click', function () {
					app.router.navigate('/cardio-home/');
				});
			}
		}

	},

	{

		path: '/StationaryBike/',
		url: 'StationaryBike.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToCardioHome').on('click', function () {
					app.router.navigate('/cardio-home/');
				});
			}
		}

	},

	{

		path: '/DumbbellShrug/',
		url: 'DumbbellShrug.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToTrapeziusHome').on('click', function () {
					app.router.navigate('/trapezius-home/');
				});
			}
		}

	},

	{

		path: '/BarbellShoulderHighpull/',
		url: 'BarbellShoulderHighpull.html',
		on: {
			pageInit: function () {
				app.request.post('http://' + ip + '/phpfile/selectTampilanLatihan.php', {
					simpan_id: localStorage.getItem('id_exercise')
				},
					function (data) {
						$$('.canvasExercise').html('');
						var obj = JSON.parse(data);
						var counter = Object.keys(obj).length;
						for (var i = 0; i < counter; i++) {
							$$('.canvasExercise').append(
								'<div class="container block cardsExercise" style="background-repeat: no-repeat; background-position: center; background-size: 50% 50%; background-image: url(http://' + ip + '/phpfile/img/' + obj[i].gambar_gif_latihan + ');">' +
								'<a href="#">Link Youtube</a>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Fokus muscle</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].focus_muscle + '</p>' +
								'</div>' +
								'<div class="block-title">' +
								'<b>Deskripsi</b>' +
								'</div>' +
								'<div class="block block-strong" style="font-size: 13px;">' +
								'<p>' + obj[i].deskripsi_exercise + '</p>' +
								'</div>'
							);
						}
					});
				$$('.backToTrapeziusHome').on('click', function () {
					app.router.navigate('/trapezius-home/');
				});
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
	closeTimeout: 2000, //1300
	on: {
		opened: function () {
			var a = localStorage.getItem('email');
		}
	},

});

$$('.my-sheet').on('sheet:open', function (e, sheet) {
	console.log('my-sheet open');
});
// $$('.my-sheet').on('sheet:opened', function (e, sheet) {
// 	console.log('my-sheet opened');
// });


var mainView = app.views.create('.view-main');

var loginScreen = app.loginScreen.create({ /* parameters */ });


