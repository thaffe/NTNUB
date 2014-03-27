Shortcuts = new Meteor.Collection("shortcuts");
Courses = new Meteor.Collection("courses");

Meteor.startup(function () {
});

Meteor.publish('shortcuts', function () {
    return Shortcuts.find();
});

Meteor.publish('allCourses', function(){
    return Courses.find();
});

Meteor.publish('myCourses',function(){
    return Courses.find();
    var user = Meteor.user();
    if(!user || !user.profile.courses) return null;
    return Courses.find();
    return Courses.find({_id:{$in:user.profile.courses}});
});


Meteor.methods({
    updateCourses:function(courses){
        Meteor.users.update({_id:Meteor.userId()}, {$set:{'profile.courses':courses}});
    },

    getMazeLocation:function(query){
        console.log("HELOOO");
        var res = Meteor.http.get("http://use.mazemap.com/ivectosolr/equery?q="+query+"&fq=campus_ids:1&fq=doctype:poi&");
        res = JSON.parse(res.content);
        return res.response.numFound > 0 ? res.response.docs : [];
    }
});