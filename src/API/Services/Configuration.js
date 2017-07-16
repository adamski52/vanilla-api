let fs,
    storePath = "_secure/stores/configurations.json";

function isWellFormed(body) {
    return body && body.name && body.hostname && body.port && body.username;
}

function save(contents, config, callback) {
    fs.writeFile(storePath, contents, (err) => {
        if(err) {
            callback(err);
            return;
        }

        callback(undefined, config, true);
    });
}

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
               contents = "[]";
           }

           let configurations = {
               configurations: JSON.parse(contents)
           };

           callback(undefined, configurations);
        });
    }

    getByName(name, callback) {
        this.getAll((err, allConfigs) => {
            if(err) {
                callback(err);
                return;
            }

            // would normally polyfill .filter()
            let matches = allConfigs.configurations.filter((c) => {
                return c.name === name;
            });

            let configurations = {
                configurations: matches
            };

            callback(undefined, configurations);
        });
    }

    update(body, callback) {
        if(!isWellFormed(body)) {
            callback({
                message: "Invalid configuration."
            });
            return;
        }

        this.getAll((err, configurations) => {
            if(err) {
                callback(err);
                return;
            }

            for(let i = 0, il = configurations.configurations.length; i < il; i++) {
               if(configurations.configurations[i].name === body.name) {
                   configurations.configurations[i] = body;
                   return;
               }
            }

            save(JSON.stringify(contents.configurations), body, callback);
        });
    }

    create(body, callback) {
        if(!isWellFormed(body)) {
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

        this.getAll((err, contents) => {
            let matchFound = false;

            // would normally polyfill .find()
            for(let i = 0, il = contents.configurations.length; i < il; i++) {

                // i'm saying that the name is the primary/unique key since the object has no other ID
                if(contents.configurations[i].name === config.name) {
                    matchFound = true;
                    break;
                }
            }

            if(matchFound) {
                callback(undefined, config, false);
                return;
            }

            contents.configurations.push(config);
            save(JSON.stringify(contents.configurations), config, callback);
        });
    }
}

module.exports = Configuration;