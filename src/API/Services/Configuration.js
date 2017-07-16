let fs,
    storePath = "_secure/stores/configurations.json";

function isWellFormed(body) {
    return body && body.name && body.hostname && body.port && body.username;
}

function save(contents, callback) {
    fs.writeFile(storePath, contents, (err) => {
        if(err) {
            callback(err);
            return;
        }

        callback(undefined);
    });
}

class Configuration {
    constructor(_fs = require("fs")) {
        fs = _fs;
    }

    get(callback) {
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

    update(body, callback) {
        if(!isWellFormed(body)) {
            callback({
                message: "Invalid configuration."
            });
            return;
        }

        this.get((err, contents) => {
            if(err) {
                callback(err);
                return;
            }

            let found = false,
                config;
            for(let i = 0, il = contents.configurations.length; i < il; i++) {
               config = contents.configurations[i];

               if(config.name === body.name) {
                   found = true;
                   config.hostname = body.hostname;
                   config.username = body.username;
                   config.port = body.port;
                   break;
               }
            }

            if(!found) {
                callback({
                    message: "Item does not exist."
                });
                return;
            }

            save(JSON.stringify(contents.configurations), (err) => {
                if(err) {
                    callback(err);
                    return;
                }

                callback(undefined, config);
            });
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

        this.get((err, contents) => {
            let match = contents.configurations.find((c) => {
                return c.name === config.name;
            });

            if(match) {
                callback(undefined, config, false);
                return;
            }

            contents.configurations.push(config);
            save(JSON.stringify(contents.configurations), (err) => {
                if (err) {
                    callback(err);
                    return;
                }

                callback(undefined, config, true);
            });
        });
    }

    destroy(body, callback) {
        if(!(body && body.name)) {
            callback({
                message: "Invalid configuration."
            });
            return;
        }

        this.get((err, contents) => {
            let config;

            for(let i = contents.configurations.length - 1; i >= 0; i--) {
                config = contents.configurations[i];
                if(config.name === body.name) {
                    contents.configurations.splice(i, 1);
                }
            }

            save(JSON.stringify(contents.configurations), (err) => {
                if(err) {
                    callback(err);
                    return;
                }

                callback();
            });
        });
    }
}

module.exports = Configuration;