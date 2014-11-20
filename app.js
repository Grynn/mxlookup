#!/usr/bin/env node

/* jshint node:true */

"use strict";

var dns   = require("dns");
var util  = require("util");
var argv  = process.argv.slice(2);
            
if (argv.length === 0) {
   usage(); 
}

argv.forEach(function(domain) {
  dns.resolveMx(domain, function(err, addresses) {
    var o = {};
    
    if (err) {
      o[domain] = err;
      console.error(o);
      return;
    }
    
    addresses.sort(function(a,b) { return a.priority - b.priority; });
    
    o[domain] = addresses;
    console.dir(o);
  });
});

function usage() {
  var app = process.argv[1];
  console.error(util.format("Usage: %s <domain.com> [domain.com] [domain.com]", app));
}
