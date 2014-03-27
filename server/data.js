Meteor.startup(function () {
    // code to run on server at startup
    if (!Shortcuts.find().count()) {

        var data = [
            {"icon": "itslearning", "label": "It's Learning", "link": "https://sats.itea.ntnu.no/sso-wrapper/web/wrapper?target=itslearning"},
            {"icon": "googledoc", "label": "Google Docs", "link": "https://drive.google.com/"},
            {"icon": "fa fa-calendar", "label": "1024 Kalender", "link": "http://ntnu.1024.no/"}
        ];

        for (var i = 0; i < data.length; i++) {
            Shortcuts.insert(data[i]);
        }
    }

    if(!Courses.find().count()){
        var myjson = {};
//        var text = Meteor.http.get("http://www.ime.ntnu.no/api/course/-");
//        console.log(text);
        //var text = Assets.getText('courses.json');
//        console.log(text);
        data = JSON.parse(Meteor.http.get("http://www.ime.ntnu.no/api/course/-").content);
        console.log(myjson.cache);
        for (var i = 0; i <data.course.length; i++) {
            var course = data.course[i];
            Courses.insert({code:course.code, name:course.name});
        }

    };
});
