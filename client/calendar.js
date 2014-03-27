/*!
 * NTNUB v0.1 (http://ntnub.com)
 * Copyright 2014 Nicolay Thafvelin.
 * Licensed under BSD (https://github.com/thaffe/NTNUB/blob/master/LICENSE)
 */
moment.lang('nb', {
    months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
    monthsShort: "jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),
    weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
    weekdaysShort: "sø._ma._ti._on._to._fr._lø.".split("_"),
    weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"),
    longDateFormat: {
        LT: "H.mm",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY [kl.] LT",
        LLLL: "dddd D. MMMM YYYY [kl.] LT"
    },
    calendar: {
        sameDay: '[i dag kl.] LT',
        nextDay: '[i morgen kl.] LT',
        nextWeek: 'dddd [kl.] LT',
        lastDay: '[i går kl.] LT',
        lastWeek: '[forrige] dddd [kl.] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: "om %s",
        past: "for %s siden",
        s: "noen sekunder",
        m: "ett minutt",
        mm: "%d minutter",
        h: "en time",
        hh: "%d timer",
        d: "en dag",
        dd: "%d dager",
        M: "en måned",
        MM: "%d måneder",
        y: "ett År",
        yy: "%d År"
    },
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
});

moment.lang('nb');


Handlebars.registerHelper("date", function(date){
   return moment.unix(date).format("ddd hh:mm DD.MM")
});

var dateDefault = {
    language: 'nb',
    icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-arrow-up",
        down: "fa fa-arrow-down"
    }
};

Template.agenda.loading = function () {
    return Session.get("loadingCourses");
}

Template.agenda.items = function(){
    var start = moment().unix();
    var end = moment().add("days",7).unix();
    return CourseCalendar.find({start:{$gt:start}, end:{$lt:end}},{sort:{start:1}});
}

Template.agenda.events({
    'click .addEvent': function () {
        ModalBox.show('agendaForm');
    }
});

Template.agendaForm.events({
    'submit form': function (e) {
        e.preventDefault();
    }
});

Template.agendaForm.links = function () {
    return GetCourses();
}


Template.locationPicker.rendered = function () {
    $input = $(this.find("#locationName"));
    $input.typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        displayKey: "title",
        source: function (q, cb) {
            Meteor.call('getMazeLocation', q, function (error, res) {
                cb(res);
            });
        },
        templates: {
            suggestion: function (context) {
                var building = context.disp_bld_name && context.disp_bld_name.length ? context.disp_bld_name[context.disp_bld_name.length - 1] : "";
                var type = context.disp_type_name && context.disp_type_name.length ? context.disp_type_name[0] : "";
                return "<a role='menuitem'><strong>" + context.title + "</strong>" +
                    "<br><small class='text-muted'>" + building + " - " + type + "</small></a>"
            }
        }
    }).bind('typeahead:selected', function (jq, sel) {
        console.log(sel.poi_id);
        $input.data("location", {type: "maze", _id: sel.poi_id})
    })
}

Template.agendaForm.rendered = function (e) {
    $("[title]").tooltip();
    var $start = $(this.find("#dateStartPicker")),
        $end = $(this.find("#dateEndPicker"));
    var m = moment();
    $start.datetimepicker(_.extend({minDate: m.clone(), defaultDate: m.clone()}, dateDefault));
    m.add('h', 1);
    $end.datetimepicker(_.extend({minDate: m, defaultDate: m}, dateDefault));

    $start.on("dp.change", function (e) {
        var dateP = $end.data("DateTimePicker");
        dateP.setMinDate(e.date);
        var d = e.date.clone();
        if (dateP.getDate() < d) {
            d.add('h', 1);
            dateP.setDate(d);
        }

    });

    $end.on("dp.change", function (e) {
        $start.data("DateTimePicker").setMaxDate(e.date)
    })
}

CourseCalendar = new Meteor.Collection(null);
Meteor.startup(function () {

    Deps.autorun(function () {
        var courses = GetCourses();
        CourseCalendar.remove();
        Session.set("loadingCourses", true);
        var count = 0;
        if(!courses) return;
        courses.forEach(function (course) {
            $.getJSON("http://www.ime.ntnu.no/api/schedule/" + course.code + "?callback=?", function (data) {

                count++;
                addActivities(data.activity);
                if (count == courses.length) {
                    Session.set("loadingCourses", false);
                }
            });
        })
    });

});

function addActivities(acts){
    if(!acts)return;
    var year = moment().get("y");
    for (var i = 0; i < acts.length; i++) {
        var a = acts[i];
        for (var j = 0; j < a.activitySchedules.length; j++) {
            var s = a.activitySchedules[j];
            for (var k = 0; k < s.weeksList.length; k++) {
                var week = s.weeksList[k];
                CourseCalendar.insert({
                    name: a.courseCode+" "+a.activityDescription,
                    start: getDate(year, week, s.dayNumber, s.start).unix(),
                    end : getDate(year,week, s.dayNumber, s.end).unix(),
                    place : s.rooms[0].location
                });
            }
        }


    }
}

function getDate(year, week, day, time){
    time = time.replace(/\s+/g, '');
    day = day == 6 ? 0 : day+1;
    var string = year+"-W"+(week < 10 ? "0":"")+week+"-"+day+"T"+time;
    return moment(string);
}
