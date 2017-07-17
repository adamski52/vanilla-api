function shuffle(arr) {
    let i, j, temp, items = [].concat(arr);

    for (i = items.length; i > 0; i--) {
        j = Math.floor(Math.random() * i);
        temp = items[i - 1];
        items[i - 1] = items[j];
        items[j] = temp;
    }

    return items;
}

let mockNames = ["alligator", "bumblebee", "camel", "dog", "elephant", "frog", "gecko", "hamster", "iguana", "jaguar"],
    mockUsernames = ["azazel", "batman", "carnage", "daredevil", "enchantress", "flash", "green arrow", "hellboy", "iceman", "juggernaut"],
    mockHostnames = ["apple", "blueberry", "cherry", "dragon fruit", "egg", "fig", "grape", "honey", "ice cream", "jalapeno"],
    mockPorts = [0, 1111, 2222, 3333, 4444, 5555, 6666, 7777, 8888, 9999];

module.exports = {
    mockNames: mockNames,
    mockUsernames: mockUsernames,
    mockHostnames: mockHostnames,
    mockPorts, mockPorts,
    getMockItems() {
        let items = [],
            options = {
                name: shuffle(mockNames),
                username: shuffle(mockUsernames),
                hostname: shuffle(mockHostnames),
                port: shuffle(mockPorts)
            };

        for(let i = 0; i < 10; i++) {
            items.push({
                name: options.name[i],
                username: options.username[i],
                hostname: options.hostname[i],
                port: options.port[i]
            });
        }

        return items;
    },
    shuffle: shuffle,
    isSorted(items, itemKey, source) {
        for(let i = 0; i < items.length; i++) {
            if(items[i][itemKey] !== source[i]) {
                return false;
            }
        }

        return true;
    }
};
