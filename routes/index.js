var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var db=mysql.createConnection(
	{
		host: 'localhost',
		user: 'username',
		password: 'password',
		database: 'database'
	});
db.connect();

/* GET home page. */
router.get('/', function(req, res)
{
	var zapytanie="SELECT idFilm, nazwaFilm, DATE_FORMAT(dataFilm, '%d.%m.%Y %H:%i' ) as dataFormatFilm FROM filmy ORDER BY dataFilm ASC";
	db.query(zapytanie, function(error, filmy){
		res.render('index', { filmy: filmy, title: 'Strona główna'});
	});
});

router.get('/rezerwacja/:id', function(req, res)
{
	var zapytanie="SELECT idFilm, nazwaFilm, DATE_FORMAT(dataFilm, '%d.%m.%Y %H:%i' ) as dataFormatFilm FROM filmy WHERE idFilm="+req.params.id;
	var zapytanie2="SELECT miejsceRezerwacja FROM rezerwacja WHERE filmRezerwacja="+req.params.id;
	db.query(zapytanie, function(error, filmy){
		db.query(zapytanie2, function(error, rezerwacja){
			res.render('rezerwacja', {filmy: filmy, rezerwacja:rezerwacja, title: 'Rezerwacje'});
		});
	});
});

router.get('/rezerwuj/:id/:x/:y', function(req, res)
{
	var zapytanie="SELECT idFilm, nazwaFilm, DATE_FORMAT(dataFilm, '%d.%m.%Y %H:%i' ) as dataFormatFilm FROM filmy WHERE idFilm="+req.params.id;
	var zapytanie2="SELECT miejsceRezerwacja FROM rezerwacja WHERE filmRezerwacja="+req.params.id;
	db.query(zapytanie, function(error, filmy){
		db.query(zapytanie2, function(error, rezerwacja){
			res.render('rezerwuj', {filmy: filmy, rezerwacja:rezerwacja, miejsceReq: req.params.y, rzadReq: req.params.x,  title: 'Rezerwacja miejsca'});
		});
	});
});

router.post('/rezerwacja-potwierdzenie', function(req, res, next) {
  var zapytanieInsert="INSERT INTO rezerwacja (miejsceRezerwacja, imieRezerwacja, nazwiskoRezerwacja, filmRezerwacja) VALUES ('"+req.body.wybor+"','"+req.body.imie+"','"+req.body.nazwisko+"','"+req.body.film+"');";
  var zapytanie="SELECT idFilm, nazwaFilm, DATE_FORMAT(dataFilm, '%d.%m.%Y %H:%i' ) as dataFormatFilm FROM filmy WHERE idFilm="+req.body.film;
  var zapytanie2="SELECT miejsceRezerwacja FROM rezerwacja WHERE filmRezerwacja="+req.body.film;
  var zapytanie3="SELECT * FROM rezerwacja WHERE filmRezerwacja="+req.body.film+" ORDER BY idRezerwacja DESC LIMIT 1";
  var imie=req.body.imie;
  db.query(zapytanieInsert, function(error, insert){
	db.query(zapytanie, function(error, filmy){
		db.query(zapytanie2, function(error, rezerwacja){
			db.query(zapytanie3, function(error, szczegoly){
				res.render('potwierdzenie', {filmy: filmy, rezerwacja:rezerwacja, szczegoly:szczegoly, title: 'Rezerwacje'});
				console.log(zapytanie3);
				});
			});
		});
	});
  });

router.get('/sprawdz-rezerwacje', function(req, res, next) {
		res.render('sprawdz', { title: 'Sprawdź rezerwacje' });

});

router.post('/sprawdz-rezerwacje', function(req, res, next) {
	var zapytanie="SELECT *, DATE_FORMAT(dataFilm, '%d.%m.%Y %H:%i' ) as dataseansFilm, DATE_FORMAT(dataRezerwacja, '%d.%m.%Y %H:%i' ) as dzienRezerwacja, SUBSTR(miejsceRezerwacja,1,1) as rzadRezerwacja, SUBSTR(miejsceRezerwacja,2,1) as miejsceRezerwacja  FROM rezerwacja, filmy WHERE filmRezerwacja=idFilm AND idRezerwacja="+req.body.id;
	db.query(zapytanie, function(error, sprawdz){
		res.render('sprawdzPost', { sprawdz:sprawdz, title: 'Sprawdź rezerwacje' });
	});
});

router.post('/anuluj-rezerwacje', function(req, res, next) {
	var zapytanie="DELETE FROM rezerwacja WHERE idRezerwacja="+req.body.usun+" LIMIT 1";
	db.query(zapytanie, function(error, usun){
		res.render('anuluj', {  title: 'Anulowanie' });
	});
});

router.post('/usun-rezerwacje', function(req, res, next) {
	var zapytanie="DELETE FROM rezerwacja WHERE idRezerwacja="+req.body.usun+" LIMIT 1";
	db.query(zapytanie, function(error, usun){
		res.redirect('/zarzadzaj-rezerwacje');
	});
});

router.get('/zarzadzaj-rezerwacje', function(req, res, next) {
	var zapytanieZarz="SELECT *, DATE_FORMAT(dataFilm, '%d.%m.%Y %H:%i' ) as dataseansFilm, DATE_FORMAT(dataRezerwacja, '%d.%m.%Y %H:%i' ) as dzienRezerwacja, SUBSTR(miejsceRezerwacja,1,1) as rzadRezerwacja, SUBSTR(miejsceRezerwacja,2,1) as miejsceRezerwacja  FROM rezerwacja, filmy WHERE filmRezerwacja=idFilm AND idRezerwacja ORDER BY nazwaFilm ASC, dataRezerwacja DESC";
	db.query(zapytanieZarz, function(error, zarzadzaj){
		res.render('zarzadzajrezerwacje', { zarzadzaj:zarzadzaj, title: 'Zarządzaj rezerwacjami' });
	});
});

router.get('/zarzadzaj-filmy', function(req, res, next) {
	var zapytanieZarzF="SELECT *, DATE_FORMAT(dataFilm, '%d.%m.%Y %H:%i' ) as dataFormatFilm FROM filmy ORDER BY nazwaFilm ASC";
	db.query(zapytanieZarzF, function(error, zarzadzajf){
		res.render('zarzadzajfilmy', { zarzadzajf:zarzadzajf, title: 'Zarządzaj filmami' });
	});
});

router.post('/dodaj-film', function(req, res, next) {
	var zapytanieusun="INSERT INTO filmy(dataFilm, nazwaFilm) VALUES('"+req.body.termin+" "+req.body.godzina+"','"+req.body.nazwafilm+"')";
	db.query(zapytanieusun, function(error, usun){
		res.redirect('/zarzadzaj-filmy');
	});
});

router.post('/usun-film', function(req, res, next) {
	var zapytanie="DELETE FROM filmy WHERE idFilm="+req.body.usun+" LIMIT 1";
	db.query(zapytanie, function(error, usun){
		res.redirect('/zarzadzaj-filmy');
	});
});

module.exports = router;
