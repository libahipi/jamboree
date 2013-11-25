var App = App || {};

App = {
    init: function() {
        window.onload = function routing() {
            var hash = window.location.hash;
            if (['#jamboree', '#blog', '#osale', '#rules', '#teams', '#toeta'].indexOf(hash) !== -1) {
                navigate(hash)
            } else {
                navigate('#404', hash);
            }
        };

        function navigate(to, hash) {
            var $nav = $('#nav li'),
                $pages = $('#wrap .page'),
                $anchor = $nav.find('a[href="'+to+'"]'),
                $li = $anchor.closest('li');
            $pages.hide(); $nav.removeClass('active');
            $pages.filter(to).show();
            $li.addClass('active');
            window.location.hash = to;
            window.scrollTo(0,0);
        };

        $('#nav li').on('click', 'a', function(e) {
            e.preventDefault();
            navigate($(e.target).attr('href'));
        });

        (function updateTime() {
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

            setTimeout(App.updateTime, 60000);
        })();
    }
};

App.init();