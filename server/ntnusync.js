///**
// * Created by thaffe on 3/21/14.
// */
//var request = Npm.require('request');
//
//function startSync(){
//    request(getParams())
//}
//
//function doLogin(error,res,body){
//    $ = cheerio.load(body);
//    var form = $("#inputframe form");
//    vals = getForm(form);
//    vals["feidename"] = "thafveli";
//    vals["password"] = "thaffe-1";
//    var url = this.href.split("?")[0] + form.attr("action");
//
//    request.post(getParams(url,vals), skipNoScript);
//}
//
//function skipNoScript(error,res,body){
//    $ = cheerio.load(body);
//    var form = $("form");
//    var url = form.attr("action");
//    var vals = getForm(form);
//    console.log(body);
//}
//
//function loggedIn(error,res,body){
//
//}
//
//function getParams(url,form){
//    var s = {url:url,jar:true};
//    if(form) form.form = form;
//    return form;
//}
//
//function getForm(form) {
//    var vals = {};
//    form.find("input").each(function (i, elem) {
//        vals[$(this).attr("name")] = $(this).val();
//    });
//
//    return vals;
//}
//
//
//request({jar: true, uri: "https://innsida.ntnu.no/widget/user/" + "thafveli" + "/student/-/mystudiesportlet_war_mystudiesportlet_instance_hggc"},
//
//    function (error, res, body) {
//
//        request.post({
//            jar: true,
//            uri: url,
//            form: vals
//        }, function (err, res, body) {
//            $ = cheerio.load(body);
//            var form = $("form");
//            var url = form.attr("action");
//            var vals = getForm(form);
//            console.log(body);
//
//            request.post({
//                jar: true,
//                url: url,
//                form: vals
//            }, function (err, res, body) {
////                console.log(body);
//                $ = cheerio.load(body);
//                console.log($("li").html());
//            });
//        });
//    });