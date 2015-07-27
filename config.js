var config = {
    NODE_ENV:'release',
    port:8787,
    passport: 'http://yhd.adanghome.com/passport',
    domain:'http://192.168.8.166:8787',
    backHash:'/admin'
};

//var config = {
//    NODE_ENV:'dev',
//    port:8787,
//    passport: 'http://yhd.adanghome.com/passport',
//    domain:'http://127.0.0.1:8787',
//    backHash:'/admin'
//};

if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = config;
} else {
    if ( typeof define === "function") {
        define( "wxms_config", [], function () { return config; } );
    }
}
