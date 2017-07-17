let fs,
    storePath = "_secure/stores/configurations.json",
    VALID_SORTS = ["name", "hostname", "port", "username"];

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

function doesItemExist(contents) {
    let config;
    for (let i = 0, il = contents.configurations.length; i < il; i++) {
        config = contents.configurations[i];

        if (config.name === body.name) {
            config.hostname = body.hostname;
            config.username = body.username;
            config.port = body.port;
            return config;
        }
    }

    return false;
}

function sort(contents, params) {
    if (!params.hasOwnProperty("sortby")) {
        return contents;
    }

    let sortby = params.sortby;
    if (VALID_SORTS.indexOf(sortby) < 0) {
        return contents;
    }


    contents = contents.sort((lhs, rhs) => {
        if (lhs[sortby] > rhs[sortby]) {
            return 1;
        }

        if (lhs[sortby] < rhs[sortby]) {
            return -1;
        }

        return 0;
    });

    return contents;
}

function paginate(contents, params) {
    if(!(params.hasOwnProperty("page") && params.hasOwnProperty("per"))) {
        return contents;
    }


    let page = parseInt(params.page, 10),
        per = parseInt(params.per, 10);

    page = page >= 0 ? page : 0;
    per = per > 0 ? per : 5;

    let startItem = Math.min(per * page, contents.length),
        endItem = Math.min(startItem + per, contents.length),
        items = [];

    for(let i = startItem; i < endItem; i++) {
        items.push(contents[i]);
    }

    return items;
}

class Configuration {
    constructor(_fs = require("fs")) {
        fs = _fs;
    }

    get(callback, params = {}) {
        fs.readFile(storePath, "utf8", (err, contents) => {
           if(err) {
               callback(err);
               return;
           }

           contents = contents ? JSON.parse(contents) : [];

           contents = sort(contents, params);
           contents = paginate(contents, params);

           let configurations = {
               configurations: contents
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

            let config = doesItemExist(contents);

            if(!config) {
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