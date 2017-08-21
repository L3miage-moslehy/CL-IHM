var express = require('express');

express().use(express.static(__dirname)).listen(8080);

console.log("Server listening on port 8080");
