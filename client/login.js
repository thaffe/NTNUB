Template.login.events({
    'click .facebook': function () {
        loginWith('Facebook', ['email']);
    },

    'click .google': function () {
        loginWith('Google', ['email']);
    }

});

Template.login.errorMsg = function () {
    return Session.set('loginError');
}

Template.signedInAs.name = function () {
    return Meteor.user().profile.name;
}
Template.signedInAs.image = function () {
    return "http://graph.facebook.com/" + "thaffe" + "/picture/?type=square"
}

function loginWith(service, permissions) {
    Meteor['loginWith' + service]({
        requestPermissions: permissions
    }, function (err) {
        if (err)
            Session.set('loginError', err.reason || 'Unknown error');
        else
            Session.set('loginError', null);

    });
}