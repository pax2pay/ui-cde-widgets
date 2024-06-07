const location = new URL(window.location.href)
export const url =
	location.host.startsWith("localhost") || location.host.startsWith("127.0.0.1") || location.host.startsWith("192.168.")
		? "https://cde.pax2pay.dev"
		: "https://cde.pax2pay.com"
