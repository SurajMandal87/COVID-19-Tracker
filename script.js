$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) { //check if page is scrolled greater than 100px
            $('.scroll-top').fadeIn(); //if this happens, fadein the button
        } else {
            $('.scroll-top').fadeOut();
        }
    });

    $('.scroll-top').click(function () {
        $("html, body").animate({
            scrollTop: 0 //when user clicks on button, scroll to top of the page to 0px
        }, 100);
        return false;
    });

});
$('.navbar-nav-scroll.menu li a').click(function(){
    // applying again smooth scroll on menu items click
    $('html').css("scrollBehavior", "smooth");
});

// toggle menu/navbar script
$('.menu-btn').click(function(){
    $('.navbar-nav-scroll.menu').toggleClass("active");
    $('.menu-btn i').toggleClass("active");
});

main()

$('#othercountrydatabox').hide();
$('#othercountrybtn').show();

function main() {

    $('#othercountrydatabox').hide()
    var url = "https://api.covid19api.com/summary";
    var globaldata = '';
    var countrydata = ''; // for india data, we have initialised it with empty so that we can append data in it.

    $.get(url, function (data) { // this is callback function, when we get url then call this function and store it in data name object.
        //A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some task

        globaldata = `<td> ${data.Global.TotalConfirmed}</td>
        <td> ${data.Global.TotalConfirmed - data.Global.TotalRecovered - data.Global.TotalDeaths}</td>
        <td> ${data.Global.TotalRecovered}</td>
        <td> ${data.Global.TotalDeaths}</td>
        <td> ${data.Global.NewConfirmed}</td>
        <td> ${data.Global.NewRecovered}</td>
        <td> ${data.Global.NewDeaths}</td>
       `
        $("#data").html(globaldata) ;     // now when we get global data, then write it in html file by id of global data i.e data

        countrydata = `<td> ${data.Countries[77].TotalConfirmed}</td>  
        <td> ${data.Countries[77].TotalConfirmed - data.Countries[77].TotalRecovered - data.Countries[77].TotalDeaths}</td>
        <td> ${data.Countries[77].TotalRecovered}</td>
        <td> ${data.Countries[77].TotalDeaths}</td>
        <td> ${data.Countries[77].NewConfirmed}</td>
        <td> ${data.Countries[77].NewRecovered}</td>
        <td> ${data.Countries[77].NewDeaths}</td>
       `
        $("#countrydata").html(countrydata) ;   // india's data is at 77 index so we directly access that index to get india's covid data
        console.log(data.Countries);
        console.log(data.Global);
    })
}

function othercountrydata() {
    $('#othercountrybtn').hide();
    $('#othercountrydatabox').show();
    var url = "https://api.covid19api.com/summary";

    $.get(url, function (data) {
        for (let index = 0; index < 194; index++) {   // in api there r total 194 countries , so we run loop 194 times.... to check whether it is 194 countries or not, inspect the site and then go to console and then click on Array(194)
            var table = document.getElementById("newtable");
            var row = table.insertRow(index + 1)   // if we do only index, then it will over write the thead which is written in index.html means top row of table that contains name of country and ol will not visible if we do only index
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);       // agar hum isme loop nhi chalate aur simple jaise india and global data jaisa krte to sidha last table i.e zimbabwe ka data fetch hoke aata
            cell1.innerHTML = data.Countries[index].Country;
            cell2.innerHTML = data.Countries[index].TotalConfirmed;
            cell3.innerHTML = data.Countries[index].TotalConfirmed - data.Countries[index].TotalDeaths - data.Countries[index].TotalRecovered;
            cell5.innerHTML = data.Countries[index].TotalDeaths;
            cell4.innerHTML = data.Countries[index].TotalRecovered;
        }
    })
}

function RefreshData() { //when user clicks on refreshdata button,  data of countrydata and global data will empty and main function will call so that firse table me data dikhjaae to empty kia tha
    clearData();
    main();
    $('#othercountrybtn').show();
}

function clearData() {
    $("#data").empty;
    $("#countrydata").empty;
}
Footer
© 2022 GitHub, Inc.