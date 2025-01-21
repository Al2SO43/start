//加载完成后执行
window.addEventListener('load', function () {
    //载入动画
    $('#loading-box').attr('class', 'loaded');
    $('#bg').css("cssText", "transform: scale(1);filter: blur(0px);transition: ease 1.5s;");
    $('#section').css("cssText", "opacity: 1;transition: ease 1.5s;");
    $('.cover').css("cssText", "opacity: 1;transition: ease 1.5s;");

    //用户欢迎
    iziToast.settings({
        timeout: 3000,
        backgroundColor: '#ffffff40',
        titleColor: '#efefef',
        messageColor: '#efefef',
        progressBar: false,
        close: false,
        closeOnEscape: true,
        position: 'topCenter',
        transitionIn: 'bounceInDown',
        transitionOut: 'flipOutX',
        displayMode: 'replace',
        layout: '1',
    });
    var toastTitleStyle = document.createElement("style");
        toastTitleStyle.appendChild(document.createTextNode(
        ".iziToast-title {" +
        "   transform: translateY(50%) !important;" +
        "   font-size: 1rem !important;" +
        "}"));
    document.head.appendChild(toastTitleStyle);
    setTimeout(function () {
        iziToast.show({
            timeout:2500,
            icon: false,
            title: hello,
            message: '欢迎来到『硫酸铝的起始站』!<br />网页模板作者:<a href="https://github.com/imsyy/Snavigation" target="_blank">Imsyy</a>!'
        });
    }, 800);

    //中文字体缓加载-此处写入字体源文件
    //先行加载简体中文子集，后续补全字集
    //由于压缩过后的中文字体仍旧过大，可转移至对象存储或 CDN 加载
    const font = new FontFace(
        "MiSans",
        "url(" + "./font/MiSans-Regular.woff2" + ")"
    );
    document.fonts.add(font);

}, false)

//进入问候
now = new Date(), hour = now.getHours()
if (hour < 6) {
    var hello = "凌晨好";
} else if (hour < 9) {
    var hello = "早上好";
} else if (hour < 12) {
    var hello = "上午好";
} else if (hour < 14) {
    var hello = "中午好";
} else if (hour < 17) {
    var hello = "下午好";
} else if (hour < 19) {
    var hello = "傍晚好";
} else if (hour < 22) {
    var hello = "晚上好";
} else {
    var hello = "夜深了";
}

//获取时间
var t = null;
t = setTimeout(time, 1000);

function time() {
    clearTimeout(t);
    dt = new Date();
    var mm = dt.getMonth() + 1;
    var d = dt.getDate();
    var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var day = dt.getDay();
    var h = dt.getHours();
    var m = dt.getMinutes();
    var s = dt.getSeconds();
    var y = dt.getFullYear();
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    $("#time_text").html(h + '<span id="point">:</span>' + m+'<span id="point">:</span>'+s);
    $("#day").html(y + "&nbsp;年&nbsp;" + mm + "&nbsp;月&nbsp;" + d + "&nbsp;日&nbsp;" + weekday[day]);
    t = setTimeout(time, 1000);
}

//获取天气
// 定义获取天气信息并更新页面的函数
function getAndSetWeather() {
    fetch('https://api.vvhan.com/api/weather')
        .then(response => response.json())
        .then(data => {
            // 处理城市
            let cityName = data.city.replace("市", "");
            // 处理温度
            let highTemp = parseInt(data.data.high); 
            let lowTemp = parseInt(data.data.low);   
            // 处理风力
            let windLevel = data.data.fengli;
            let windParts = windLevel.split('-');
            let avgWindLevel = (parseInt(windParts[0]) + parseInt(windParts[1])) / 2;
            // 更新页面上的天气信息
            $('#wea_text').text(data.data.type+'    '); // 更新天气状况
            $('#tem1').text(highTemp+'°C丨'); // 更新最高气温
            $('#tem2').text(lowTemp+'°C-'); // 更新最低气温
            $('#win_text').text(data.data.fengxiang); // 风向
            $('#win_level').text(avgWindLevel+'级'); // 风力
            $('#city').text(cityName+'丨')    //城市
        })
        .catch(console.error);
}
// 初始获取并设置天气信息
getAndSetWeather();

// 每半小时自动更新一次天气信息
setInterval(getAndSetWeather, 30 * 60 * 1000);


//Tab书签页
$(function () {
    $(".mark .tab .tab-item").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(".products .mainCont").eq($(this).index()).css("display", "flex").siblings().css("display", "none");
    })
})

//设置
$(function () {
    $(".set .tabs .tab-items").click(function () {
        $(this).addClass("actives").siblings().removeClass("actives");
        $(".productss .mainConts").eq($(this).index()).css("display", "flex").siblings().css("display", "none");
    })
})

//输入框为空时阻止跳转
$(window).keydown(function (e) {
    var key = window.event ? e.keyCode : e.which;
    if (key.toString() == "13") {
        if ($(".wd").val() == "") {
            return false;
        }
    }
});

//点击搜索按钮
$(".sou-button").click(function () {
    if ($("body").attr("class") === "onsearch") {
        if ($(".wd").val() != "") {
            $("#search-submit").click();
        }
    }
});

//鼠标中键点击事件
$(window).mousedown(function (event) {
    if (event.button == 1) {
        $("#time_text").click();
    }
});

//控制台输出
var styleTitle1 = `
font-size: 20px;
font-weight: 600;
color: rgb(244,167,89);
`
var styleTitle2 = `
font-size:12px;
color: rgb(244,167,89);
`
var styleContent = `
color: rgb(30,152,255);
`
var title1 = '『硫酸铝的个人网站』'
var title2 = ` Powered by Al2(SO4)3`
var content = `Hello World!`
console.log(`%c${title1} %c${title2}
%c${content}`, styleTitle1, styleTitle2, styleContent)

fetch('https://v1.hitokoto.cn?max_length=16')
    .then(response => response.json())
    .then(data => {
        $('#hitokoto_text').html(data.hitokoto)
        $('#from_text').html(data.from)
        $(".hitokoto").fadeIn();
    })
    .catch(console.error)