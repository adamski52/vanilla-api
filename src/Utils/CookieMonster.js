module.exports = {
    nom: function(req) {
        let rawCookies = req.headers.cookie.split(";"),
            keyValuePair,
            cookies = {};

        rawCookies.forEach((cookie) => {
            keyValuePair = cookie.split("=");
            cookies[keyValuePair[0].trim()] = keyValuePair[1].trim();
        });

        return cookies;
    }
};