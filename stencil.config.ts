import { Config } from "@stencil/core"

// https://stenciljs.com/docs/config

export const config: Config = {
	namespace: "p2p-cde",
	sourceMap: true,
	tsconfig: "tsconfig.json",
	globalStyle: "src/global/app.css",
	globalScript: "src/global/app.ts",
	taskQueue: "async",
	devServer: {
		openBrowser: false,
	},
	outputTargets: [
		{
			type: "dist-custom-elements-bundle",
		},
		{
			type: "dist",
			esmLoaderPath: "../loader",
		},
		{
			type: "www",
			serviceWorker: null, // disable service workers
			buildDir: "",
		},
	],
}
