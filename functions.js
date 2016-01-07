var energyCong = 0, energyFrig = 0;
var objfrigo, objconge;
var tempfrigo = 4, tempconge = -20;
var puertafrig = false, puertacong = false, frigoon = false, congeon = false;
function toggleFrigo(){
	if (frigoon) {
		frigoon = false;
		$("#frigo-btn").css("color", "#444444");
		toast("Apagando frigorifico", 2000);
	} else {
		frigoon = true;
		$("#frigo-btn").css("color", "green");
		toast("Encendiendo frigorifico", 2000);
	}
}
function toggleCong(){
	if (congeon) {
		congeon = false;
		$("#conge-btn").css("color", "#444444");
		toast("Apagando congelador", 2000);
	} else {
		congeon = true;
		$("#conge-btn").css("color", "green");
		toast("Encendiendo congelador", 2000);
	}
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
		$("body").prepend(obj);
	} else obj.html(msg);
	obj.show("fast");
	if (time > 0) setTimeout(function() {obj.hide("fast"); obj.remove();}, time);
	else return obj;
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