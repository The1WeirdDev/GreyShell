const express = require("express");
const fs = require("fs");
const Mime = require("./../Utils/Mime.js");

const Logger = require("./../Utils/Logger.js");
const WebPages = require("./../Utils/WebPages.js");

class ExpressServer {
  static Start(port) {
    if (typeof port !== "number") {
      Logger.Err("Failed to Start Server. Invalid Port ", port);
      process.exit(-1);
    }

    ExpressServer.port = port;
    Logger.Log("Starting server on port " + port);

    ExpressServer.server = express();
    ExpressServer.server.listen(port, ExpressServer.OnListen);
    ExpressServer.server.get("*", ExpressServer.OnGet);
  }

  static OnListen(err, data) {
    if (err) Logger.Err("Error listening on port", ExpressServer.port);
    else Logger.Log("Started Server on port", ExpressServer.port);
  }

  static OnGet(req, res) {
    try {
      var url = req.url;
      if (url.endsWith("/")) url = url.slice(0, -1);

      if (url == "") {
        res.redirect("/home");
        return;
      }

      if (url.startsWith("/home")) {
        //Is a game
        url = url.slice("/home".length);

        if (url == "" || url == "/") {
          ExpressServer.SendUserTo(res, "Client/Home/Index.html");
          return;
        }

        ExpressServer.SendUserTo(res, "Client/Home/" + url);
        return;
      }

      if (url.startsWith("/games")) {
        //Is a game
        url = url.slice("/games".length);
        if (url.endsWith("/")) url = url.slice(0, -1);

        if (url == "") {
          ExpressServer.SendUserTo(res, "Client/Games/Games/Index.html");
          return;
        }

        if (url.startsWith("/")) url = url.slice(1);

        var parts = url.split("/");
        if (WebPages.IsGameName(parts[0])) {
          url = url.slice(parts[0].length + 1);

          if (url == "") {
            ExpressServer.SendUserTo(
              res,
              "Client/Games/" + parts[0] + "/Index.html",
            );
            return;
          }

          ExpressServer.SendUserTo(res, "Client/Games/" + parts[0] + "/" + url);
          return;
        }

        ExpressServer.SendUserTo(res, "Client/Games/" + url);
        return;
      }
      if (url.startsWith("/utils/")) {
        //Is a game
        url = url.slice("/utils/".length);

        ExpressServer.SendUserTo(res, "Client/Utils/" + url);
        return;
      }
      if (url.startsWith("/emulators")) {
        //Is a game
        url = url.slice("/emulators".length);
        if (url.endsWith("/")) url = url.slice(0, -1);

        if (url == "") {
          ExpressServer.SendUserTo(
            res,
            "Client/Emulators/Emulators/Index.html",
          );
          return;
        }

        if (url.startsWith("/")) url = url.slice(1);

        var parts = url.split("/");
        if (WebPages.IsEmulatorName(parts[0])) {
          url = url.slice(parts[0].length + 1);

          if (url == "") {
            ExpressServer.SendUserTo(
              res,
              "Client/Emulators/" + parts[0] + "/Index.html",
            );
            return;
          }

          ExpressServer.SendUserTo(
            res,
            "Client/Emulators/" + parts[0] + "/" + url,
          );
          return;
        }

        ExpressServer.SendUserTo(res, "Client/Emulators/" + url);
        return;
      }
      if (url.startsWith("/Client")) {
        ExpressServer.SendUserTo(res, url.slice(1));
        return;
      }
      ExpressServer.SendUserTo(res, "Client/Error/404.html");
    } catch (exception) {}
  }

  static SendUserTo(res, file_location) {
    fs.readFile(file_location, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write("<html><body><h1>404 not found</h1></body></html>");
      } else {
        res.writeHead(200, {
          "Content-Type": Mime.GetMimeFromURL(file_location),
        });
        res.write(data);
      }
      res.end();
    });
  }
}

module.exports = ExpressServer;
