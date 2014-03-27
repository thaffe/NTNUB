frag = "Test"
ModalBox = {

    show : function(tmpl){
        if(Template[tmpl])
            var fragment = Meteor.render( function() {
                return Template[tmpl](); // this calls the template and returns the HTML.
            });

        $("#modal-content").html(fragment);
        $("#modal-box").show();
    },

    close : function(){
        $("#modal-box").hide();
        $("#modal-content").html("");
    }
};

$(function(){
    $( document ).on( "click", ".modal-close",ModalBox.close);
})



