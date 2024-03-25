import { Component, h } from "@stencil/core"
import { App } from "smoothly"

@Component({
	tag: "template-portal",
	styleUrl: "style.css",
	shadow: true,
})
export class AppRoot {
	render() {
		return (
			<App label="Smoothly App Starter">
				<smoothly-trigger slot="header" type="link" name="logout">
					<smoothly-icon toolTip={"Log out"} name="log-out" size="medium"></smoothly-icon>
				</smoothly-trigger>
				<smoothly-room label="Home" path="/">
					<app-home />
				</smoothly-room>
				<smoothly-room label="About" path="about">
					<p>Template for smoothly app!</p>
				</smoothly-room>
			</App>
		)
	}
}
