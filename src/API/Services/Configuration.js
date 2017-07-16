let fs,
    storePath = "_secure/stores/configurations.json";

class Configuration {
    constructor(_fs = require("fs")) {
        fs = _fs;
    }

    getAll(callback) {
        fs.readFile(storePath, "utf8", (err, contents) => {
           if(err) {
               callback(err);
               return;
           }

           if(!contents) {
               contents = [];
           }

           contents = {
               configurations: JSON.parse(contents)
           }

           callback(err, contents);
        });
    }

    create(body, callback) {
        if(!(body.name && body.hostname && body.port && body.username)) {
            callback({
                message: "Invalid configuration."
            });
            return;
        }

        let config = {
            name: body.name,
            hostname: body.hostname,
            port: body.port,
            username: body.username
        };

        let configStr = JSON.stringify(config);

        this.getAll((err, contents) => {
            let matchFound = false;
            for(let i = 0, il = contents.configurations.length; i < il; i++) {
                if(JSON.stringify(contents.configurations[i]) === configStr) {
                    matchFound = true;
                    break;
                }
            }

            if(matchFound) {
                callback(undefined, config, false);
                return;
            }

            contents.configurations.push(config);
            fs.writeFile(storePath, JSON.stringify(contents.configurations), (err) => {
               if(err) {
                   callback(err);
                   return;
               }

               callback(undefined, config, true);
            });
        });
    }
}

module.exports = Configuration;