import * as convict from "convict";

export const config = convict({
	"env": {
		"doc": "The application environment.",
		"format": ["production", "development", "test"],
		"default": "development",
		"env": "NODE_ENV",
		"arg": "env"
	},
	"wumbo": {
		"doc": "wumbo",
		"format": "Boolean",
		"default": true,
		"env": "WUMBO todoroki",
		"arg": "wumbo"
	}
});

// Perform validation
config.validate({
	"allowed": "strict"
});
