Package.describe({
    summary: "bootstrap 3"
});

Package.on_use(function (api) {
    // dependecies required by package
    api.use('jquery', 'client');
//    api.use('bootstrap-3', 'client');

    // adding the required file for package
    api.add_files('js/bootstrap.min.js','client');
    api.add_files('js/moment.js','client');
    api.add_files('js/bootstrap-datetimepicker.js','client');

    api.add_files('css/bootstrap-datetimepicker.css', 'client');
    api.add_files('css/bootstrap.min.css','client');
//    api.add_files('lib/bloodhound.min.js','client');
//	api.add_files('lib/bootstrap-tagsinput-angular.js', 'client');

});
