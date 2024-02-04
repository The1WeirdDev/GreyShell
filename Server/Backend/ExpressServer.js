const express = require("express");
const fs = require("fs");

const Logger = require("./../Utils/Logger.js");
class ExpressServer{
    static Start(port){
        ExpressServer.port = port;
        Logger.Log("Starting server on port " + port);
    }
}

module.exports = ExpressServer;