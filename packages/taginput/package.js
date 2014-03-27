Package.describe({
    summary: "jQuery plugin providing a Twitter Bootstrap user interface for managing tags, repackaged for Meteor"
});

Package.on_use(function (api) {
	// dependecies required by package
    api.use('jquery', 'client'); 
//    api.use('bootstrap-3', 'client');
    
    // adding the required file for package
    api.add_files('lib/typeahead.bundle.js','client');
    api.add_files('lib/typeahead.jquery.js','client');
    api.add_files('lib/bootstrap-tagsinput.js', 'client');
    api.add_files('lib/bootstrap-tagsinput.css', 'client');
//    api.add_files('lib/bloodhound.min.js','client');
//	api.add_files('lib/bootstrap-tagsinput-angular.js', 'client');
    
});
