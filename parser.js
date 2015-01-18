function parser(obj) {

	for (var key in obj) {
		this[key] = obj[key];
	}

};

module.exports = parser;