const PROXY_CONFIG = {
	"/api/*": {
		"target": "http://localhost:8085",
		"secure": false,
		"changeOrigin": true,
		"pathRewrite": {
			"^/api": ""
		},
		"logLevel": "debug"
	}
};

module.exports = PROXY_CONFIG;
