var city_input; 
var search_button; 
var results;
var image1;
var image2;
var hum;
var tem;
var T;
var illust;
var wind;
var comm;
var rare;
var body;

var api_key = "159e01e6d3a2e8ff9e5056122f8a631c";

window.onload = function() {
    // HTMLの要素を取得する
    city_input = document.getElementById("city-input");
    search_button = document.getElementById("search-button");
    results = document.getElementById("results");
    image1 = document.getElementById("weather-img");
    image2 = document.getElementById("mark-img");
    hum = document.getElementById("humidity");
    tem = document.getElementById("temp");
    T = document.getElementById("time");
    illust = document.getElementById("illust");
    wind = document.getElementById("wind");
    comm = document.getElementById("comment");
    rare = document.getElementById("rarity");
    body = document.getElementById("body")

    // 検索ボタンの動作
    search_button.onclick = function() {
        var city_name = city_input.value;
        get_weather(city_name);
    }
}
// setTimeout内を設定
function cold(){
    illust.src = "fuyu2.png";
    comm.textContent = "さぶい〜...コンビニで肉まん買って〜";
}
function cool(){
    illust.src = "aki2.png";
    comm.textContent = "涼しいと過ごしやすいね！";
}
function strong(){
    illust.src = "kaze2.png";
    comm.textContent = "ん？どうしたの？";
    rare.textContent = "★★★★★★"
}
function warm(){
    illust.src = "haru2.png";
    comm.textContent = "どこかに花でも咲いてないかな〜？";
}
function hot(){
    illust.src = "natsu2.png";
    comm.textContent = "あづい〜...アイス食べたい〜";
}
function rain1(){
    illust.src = "ame1-2.png";
    comm.textContent = "ロップルイヤーのレインコートだよ！";
}
function rain2(){
    illust.src = "ame2-2.png";
    comm.textContent = "雨の音は好きなんだ...";
}
function snow(){
    illust.src = "yuki2.png";
    comm.textContent = "この格好寒い...死ぬぅ...";
}
function obscure(){
    illust.src = "mihakken2.png";
    comm.textContent = "早く違う場所に行こうよ〜";
}



function touchSearch(){
    comm.textContent = "どこかなぁ〜"
}
function touchRarity(){
    comm.textContent = "わたしのレア度だよ・・・って、どういうこと!?"
}
function touchIllust(){
    comm.textContent = "わたしに触っても何もないよ！"
}
function touchWeather(){
    comm.textContent = "ここの天気だよ！"
}
function touchMark(){
    comm.textContent = "天気記号だよ！理科で習うよね。"
}
function touchTemp(){
    comm.textContent = "ここの気温だよ！"
}
function touchHumidity(){
    comm.textContent = "ここの湿度だよ！"
}
function touchWind(){
    comm.textContent = "風の情報だよ！"
}
function touchResults(){
    comm.textContent = "情報はOpenWeatherMapsから取得しているよ！"
}
function touchTitle(){
    comm.textContent = "わたしの名前はウェザーちゃんだよ！そしてわたしが着ているのがウェアーくん！ややこしい？"
}


function on_receive_weather(json_text) {
    // results.textContent = json_text;
    var data = JSON.parse(json_text);
    // T.textContent = data.dt;
    tem.textContent = "気温：" + data.main.temp + " ℃";
    hum.textContent = "湿度：" + data.main.humidity + " %";
    wind.textContent = "風速：" + data.wind.speed + " m/s" + "・" + " 方向：" + data.wind.deg + " °";
    results.textContent = city_input.value + "の情報です。" /** + data.clouds.all */;
    // 雨
    if(data.weather[0].id < 600){
        image1.src = "rain.png";
        image2.src = "rainmark.png";
        if(data.main.temp >=23){
            illust.src = "ame2-1.png";
            comm.textContent = "雨の日って憂鬱だよね。";
            body.style.backgroundColor = "LightSkyBlue";
            setTimeout ("rain2()",7000);
            rare.textContent = "★★★★";
            }
        else{
            illust.src = "ame1-1.png";
            comm.textContent = "これお気に入りの長靴〜";
            body.style.backgroundColor = "DeepSkyBlue";
            setTimeout ("rain1()",7000);
            rare.textContent = "★★★";
            }
    }
    // 雪
    else if ((data.weather[0].id >= 600) && (data.weather[0].id < 700)){
        image1.src = "snow.png";
        image2.src = "snowmark.png";
        illust.src = "yuki.png";
        comm.textContent = "雪んこだよ〜";
        body.style.backgroundColor = "Snow";
        setTimeout ("snow()",7000);
        rare.textContent = "★★★★★";
    }
    // 風
    else if (data.wind.speed >=33){
        if (data.clouds.all <= 80){
            image1.src = "sun.png";
            if (data.clouds.all < 10){
             image2.src = "sunmark0.png";
            }
            else {
             image2.src = "sunmark.png";
            }
        }
        else {
            image1.src = "clouds.png";
            image2.src = "cloudsmark.png";
        }
        illust.src = "kaze.png"
        comm.textContent = "ここは風が強いね！"
        body.style.backgroundColor = "Silver";
        rare.textContent = "★★"
        setTimeout ("strong()",7000);
    }
    // 晴れ
    else if (data.clouds.all <= 80){
         image1.src = "sun.png";
         //image1.style.display = "block";
         if (data.clouds.all < 10){
             image2.src = "sunmark0.png";
         }
        else {
             image2.src = "sunmark.png";
         }
        if(data.main.temp >=25){ // 暑
        illust.src = "natsu.png";
        comm.textContent = "ここは暑いから涼しい格好にしたよ！";
        body.style.backgroundColor = "Aqua";
        setTimeout ("hot()",7000);
        rare.textContent = "★★★";
        }
        else if(data.main.temp >= 16){ // 暖
        illust.src = "haru.png";
        comm.textContent = "ここはポカポカしてるね〜";
        body.style.backgroundColor = "Pink";
        setTimeout ("warm()",7000);
        rare.textContent = "★★★";
        }
        else if(data.main.temp >= 8){ // 涼
        illust.src = "aki.png";
        comm.textContent = "ここは割と涼しめかも。";
        body.style.backgroundColor = "Chocolate";
        setTimeout ("cool()",7000);
        rare.textContent = "★★★";
        }
        else{ // 寒
        illust.src = "fuyu.png";
        comm.textContent = "ふ〜、ここは寒いね...";
        body.style.backgroundColor = "White";
        setTimeout ("cold()",7000);
        rare.textContent = "★★★";
        }
    }
    // 曇り
    else if (data.clouds.all > 80){
            image1.src = "clouds.png";
            image2.src = "cloudsmark.png";
    if(data.main.temp >=25){ // 暑
        illust.src = "natsu.png";
        comm.textContent = "ここは暑いから涼しい格好にしたよ！";
        body.style.backgroundColor = "Aqua";
        setTimeout ("hot()",7000);
        rare.textContent = "★★★";
        }
        else if(data.main.temp >= 16){ // 暖
        illust.src = "haru.png";
        comm.textContent = "ここはポカポカしてるね〜";
        body.style.backgroundColor = "Pink";
        setTimeout ("warm()",7000);
        rare.textContent = "★★★";
        }
        else if(data.main.temp >= 8){ // 涼
        illust.src = "aki.png";
        comm.textContent = "ここは割と涼しめかも。";
        body.style.backgroundColor = "Chocolate";
        setTimeout ("cool()",7000);
        rare.textContent = "★★★";
        }
        else{ // 寒
        illust.src = "fuyu.png";
        comm.textContent = "ふ〜、ここは寒いね...";
        body.style.backgroundColor = "White";
        setTimeout ("cold()",7000);
        rare.textContent = "★★★";
        }
    }
    else{
         image1.src = "qmark.png";
         image2.src = "qmark.png";
         comm.textContent = "よくわからない天気みたい...";
         illust.src = "saisho2.png";
         rare.textContent = "???";
    }
}


function on_not_found(city) {
    tem.textContent = "気温：ー";
    hum.textContent = "湿度：ー";
    wind.textContent = "風速：ー ・ 方向：ー";
    results.textContent = city + "は見つかりませんでした。";
    image1.src = "qmark.png";
    image2.src = "qmark.png";
    illust.src = "mihakken.png"
    comm.textContent = "知らない場所に来ちゃったみたい..."
    body.style.backgroundColor = "MediumSeaGreen";
    setTimeout ("obscure()",5000);
    rare.textContent = "★";
}

function make_query_url(city_name) {
    return "http://api.openweathermap.org/data/2.5/weather?units=metric&q=" +
            city_name.trim() + 
            "&appid=" + api_key;
}

function get_weather(city_name) {
    var query = make_query_url(city_name);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            on_receive_weather(this.responseText);
        } else if (this.status == 404) {
            on_not_found(city_name);
        }
    };

    xhttp.open("GET", query, true);
    xhttp.send();
}