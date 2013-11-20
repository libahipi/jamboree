var $nav = $('#nav li'),
    $pages = $('#wrap .page');

$nav.find('a[href="#rules"]').click(function(e) {
    e.preventDefault();
    $pages.hide();
    $pages.filter('#rules').show();
    $nav.removeClass('active');
    $(e.target).closest('li').addClass('active');
});

$nav.find('a[href="#jamboree"]').click(function(e) {
    e.preventDefault();
    $pages.hide();
    $pages.filter('#jamboree').show();
    $nav.removeClass('active');
    $(e.target).closest('li').addClass('active');
});

// miks ma üldse üritan sellist asja teha...
(function updateTime() {
    console.log('lolo');
    var jamboreeDate = new Date(2015,6,28),
        now = new Date(),
        daysinmonths = [30, 31, 30, 31, 28, 31, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 28, 31, 31, 30], //backwards from june '15
        diff = parseInt(jamboreeDate.getTime()/1000, 10) - parseInt(now.getTime()/1000, 10),
        days = parseInt(diff/(3600*24), 10),
        daysofthismonthleft = (new Date(now.getFullYear(), now.getMonth()+1, 0)).getDate() - now.getDate();
        monthdays = days - 27 - daysofthismonthleft;
        months = 0, counter = 0, years = 0, hours = 0, mins = 0;

    if (monthdays > 30) {
        for (var i = 0; i < daysinmonths.length; i++) {
            if (counter + daysinmonths[i] <= monthdays) {
                counter = counter + daysinmonths[i];
                months++;
            }
        }
    }

    if (27 + daysofthismonthleft > 30) {
        months = months + 1;
    }

    if (months > 11) {
        years = 1;
        months = months - 12;
    }

    var leftoverdays = days - counter - 30;

    var secs = diff - days*24*3600,
        hours = parseInt(secs/3600),
        mins = parseInt((diff - days*24*3600 - hours*3600)/60);

    // write it to DOM
    $('.remaining-days').html(function() {
        var str;
        if (years) { str = years+' aasta, '; }
        if (months) { str = str + months + (months === 1 ? ' kuu, ' : ' kuud, '); }
        if (leftoverdays) { str = str + leftoverdays + (leftoverdays === 1 ? ' päev' : ' päeva'); }
        return str;
    });
    $('.remaining-mins').html(function() {
        return (hours + (hours === 1 ? ' tund, ' : ' tundi, ') + mins + (mins === 1 ? ' minut' : ' minutit'));
    });

    setTimeout(updateTime, 60000);
})();
