Shortcuts = new Meteor.Collection("shortcuts");
Courses = new Meteor.Collection("courses");
GetCourses = function(){
    var u = Meteor.user();
    return u && u.profile && u.profile.courses && u.profile.courses.length ? Courses.find({_id:{$in:Meteor.user().profile.courses}}).fetch() : 0;
}
var shortcutHandler = Meteor.subscribe('shortcuts');


var courseHandler;
Deps.autorun(function () {
    var user = Meteor.user();
    if (user) {
        if (user.profile.courses) {
            courseHandler = Meteor.subscribe('myCourses');
        } else {
            courseHandler = Meteor.subscribe('allCourses');
        }
    }
});


Template.shortcuts.shortcuts = function () {
    return Shortcuts.find();
}

Template.shortcuts.loading = function () {
    return !shortcutHandler.ready();
}

Template.shortcuts.events({
    'click .edit': function () {
        ModalBox.show('shortcutsEdit');
    }
});

Template.shortcutsEdit.shortcuts = function () {
    return Shortcuts.find();
}


Meteor.startup(function () {
});

Template.courses.editCourses = function () {
    var user = Meteor.user();
    return !user || !user.profile.courses || Session.get("editCourses");
}

Template.courses.events({
    'click .saveCourses': function () {
        var courses = $("#course-input").val().split(",");
        console.log(courses);
        Meteor.call("updateCourses", courses);
        Meteor.call("update");
        Session.set("editCourses", false);
//        Meteor.users.update({_id:Meteor.user()._id},{$set:{courses:courses}});
    },
    'click .editCourses': function () {
        Session.set("editCourses", true);
    }

});

Template.courses.courses = function () {
    return GetCourses();
}

var courseTmpl = function (context) {
    return "<a role='menuitem'><strong>" + context.code + "</strong><br><small>" + (context.name.length > 20 ? context.name.substr(0, 20) : context.name) + "</small></a>";
}

Template.courses.rendered = function () {
    var $input = $("#course-input");
    console.log($input.length)
    if(!$input.length) return;

    $input.tagsinput({
        itemValue: '_id',
        itemText: 'code',
        typeahead: {
            displayKey: 'code',
            templates: {
                suggestion: courseTmpl
            },
            //template:Handlebars.compile('<p><strong>{{code}}</strong> – {{name}}</p>'),
            source: function (query, cb) {
                var reg = new RegExp(query, "i");
                var s = Courses.find({
                    $or: [
                        { code: reg },
                        { name: reg }
                    ]
                }, {limit: 6}).fetch();
                cb(s);
            }
        }
    });

    var courses = GetCourses();

    if(!courses) return;

    for (var i = 0; i < courses.length; i++) {
        $input.tagsinput('add',courses[i]);
    }
}

