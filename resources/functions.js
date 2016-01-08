var energyCong = 0, energyFrig = 0;
var objfrigo, objconge;
var prevTempFrigo, prevTempConge, prevTermo;
var tempfrigo = 4, tempconge = -18;
var puertafrig = false, puertacong = false, frigoon = false, congeon = false, ecoon = false;
function toggleFrigo(){
	if (frigoon) {
		frigoon = false;
		$("#frigo-btn .b-large").css("color", "#444444");
		$("#frigo-btn .infotext").html("OFF");
		toast("Apagando frigorifico", 2000);
	} else {
		frigoon = true;
		$("#frigo-btn .b-large").css("color", "green");
		$("#frigo-btn .infotext").html("ON");
		toast("Encendiendo frigorifico", 2000);
	}
}
function toggleCong(){
	if (congeon) {
		congeon = false;
		$("#conge-btn .b-large").css("color", "#444444");
		$("#conge-btn .infotext").html("OFF");
		toast("Apagando congelador", 2000);
	} else {
		congeon = true;
		$("#conge-btn .b-large").css("color", "green");
		$("#conge-btn .infotext").html("ON");
		toast("Encendiendo congelador", 2000);
	}
}
function toggleEco(){
	if (ecoon) {
		ecoon = false;
		$("#eco-btn .b-large").css("color", "#444444");
		$("#eco-btn .infotext").html("ECO OFF");
		changeDefaultTempFrigo(prevTempFrigo);
		changeDefaultTempConge(prevTempConge);
		toast("Desactivado modo ECO", 2000);
	} else {
		ecoon = true;
		$("#eco-btn .b-large").css("color", "green");
		$("#eco-btn .infotext").html("ECO ON");
		changeDefaultTempFrigo(8);
		changeDefaultTempConge(-16);
		toast("Activado modo ECO", 2000);
	}
}
function toogleIco(ico){
	var tipo = $("#ico_"+ico).html();
	switch (ico){
		case 'wifi':
			if (tipo == "wifi")	$("#ico_"+ico).html("signal_wifi_off");
			else $("#ico_"+ico).html("wifi");
		break;
		case 'volume':
			if (tipo == "volume_up") $("#ico_"+ico).html("volume_off");
			else $("#ico_"+ico).html("volume_up");
		break;
	}
}
function changeDefaultTempFrigo(temp){
	prevTempFrigo=tempfrigo;
	tempfrigo=temp;
}
function changeDefaultTempConge(temp){
	prevTempConge=tempconge;
	tempconge=temp;
}
function changeFrigDoorStatus(status){
	if (status){
		objfrigo = toast("Puerta del frigorifico abierta", 0);
		electro.motorFrigorifico(false);
		puertafrig = true;
	} else {
		if (objfrigo) toast("Puerta del frigorifico cerrada", 2000, objfrigo);
		puertafrig = false;
	}
}
function changeCongDoorStatus(status){
	if (status){
		objconge = toast("Puerta del congelador abierta", 0);
		electro.motorCongelador(false);
		puertacong = true;
	} else {
		if (objconge) toast("Puerta del congelador cerrada", 2000, objconge);
		puertacong = false;
	}
}
function changeTotalEnergy(){
	if (energyCong+energyFrig < 1000) $("#energy").html(energyCong+energyFrig);
	else {
		$("#energysimbol").html("kW");
		$("#energy").html(Math.round((energyCong+energyFrig)/1000));
	}
}
function changeFrigEnergy(temp){
	energyFrig = temp;
	changeTotalEnergy();
}
function changeCongEnergy(temp){
	energyCong = temp;
	changeTotalEnergy();
}
function changeExtTemp(temp){
	$("#ext_temp").html(temp);
}
function changeFrigTemp(temp){
	$("#frig_temp").html(Math.round(temp));
	if (temp > tempfrigo && !puertafrig && frigoon) electro.motorFrigorifico(true);
	else if (temp < tempfrigo) electro.motorFrigorifico(false);
}
function changeCongTemp(temp){
	$("#cong_temp").html(Math.round(temp));
	if (temp > tempconge && !puertacong && congeon) electro.motorCongelador(true);
	else if (temp < tempconge)  electro.motorCongelador(false);
}
function frigo_bubble(){
	bubble("frigotermo");
	$("#congetermo-range").hide();
	$("#frigotermo-range").show();
}
function conge_bubble(){
	bubble("congetermo");
	$("#frigotermo-range").hide();
	$("#congetermo-range").show();
}
function digiDateTime(date){
	digiDate(date);
	digiClock(date);
}
function digiDate(f){
	var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
	var diasSemana = new Array("Domingo","Lunes","Martes","Mi&eacute;rcoles","Jueves","Viernes","S&aacute;bado");
	$("#date").html(diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());
}
function digiClock(crTime) {
	var crHrs = crTime.getHours();
	var crMns = crTime.getMinutes();
	var crScs = crTime.getSeconds();
	crMns = (crMns < 10 ? "0" : "") + crMns;
	crScs = (crScs < 10 ? "0" : "") + crScs;
	/*var timeOfDay = (crHrs < 12) ? "AM" : "PM";
	crHrs = (crHrs > 12) ? crHrs - 12 : crHrs;
	crHrs = (crHrs == 0) ? 12 : crHrs;*/
	var crTimeString = crHrs + ":" + crMns + ":" + crScs;
	$("#time").html(crTimeString);
	if (crHrs == 0 && crMns == 0 && crScs == 0){
		digiDate();
	}
}
function toast(msg, time, obj){
	if (typeof obj == "undefined") {
		obj = $('<div class="toast">'+msg+'</div>');
		$("#toast-container").prepend(obj);
	} else obj.html(msg);
	obj.show("fast");
	if (time > 0) setTimeout(function() {obj.hide("fast"); obj.remove();}, time);
	else return obj;
}
function bubble(id){
	var correccion = 0;
	if ($(window).width() > $(window).height()) $("#bubble").css("bottom", "15.5vh");
	else {
		$("#bubble").css("bottom", "13vh");
		correccion = -30;
	}
	var posleft = $("#"+id+"-btn").offset().left-$("#"+id+"-btn").width()/2+correccion;
	$("#bubble").css("left", posleft);
	if ($("#bubble").css("display") == "none") $("#bubble").show();
	else if (id == prevTermo) {
		$("#bubble").hide();
		id = "";
	}
	prevTermo = id;
}
function range(id, start, min, max){
	var slider = document.getElementById(id+'-range');
	noUiSlider.create(slider, {
		start: [ start ],
		step: 1, // Slider moves in increments of '10'
		direction: 'rtl', // Put '0' at the bottom of the slider
		orientation: 'vertical', // Orient the slider vertically
		range: { // Slider can select '0' to '100'
			'min': min,
			'max': max
		},
		pips: { // Show a scale with the slider
			mode: 'steps',
			density: 2
		}
	});
}