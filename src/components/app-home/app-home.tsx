import { Component, h } from "@stencil/core"

@Component({
	tag: "app-home",
	styleUrl: "app-home.css",
	shadow: true,
})
export class AppHome {
	render() {
		return (
			<div class="app-home">
				<span>Hello world!</span>
				<smoothly-icon name="airplane" fill="clear" size="large"></smoothly-icon>
			</div>
		)
	}
}
