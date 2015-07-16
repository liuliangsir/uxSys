var config = {
    NODE_ENV:'dev',
    port:9999,
    passport: 'http://yhd.adanghome.com/passport',
    domain:'http://127.0.0.1:9999',
    backHash:'/admin'
};



if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = config;
} else {
    if ( typeof define === "function") {
        define( "wxms_config", [], function () { return config; } );
    }
}