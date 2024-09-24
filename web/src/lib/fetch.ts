export async function GET(url: string, options?: any) {
	return window
		.fetch(url, {
			method: "GET",
			credentials: "include",
			mode: "cors",
			...options,
		})
		.then(async (response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error(await response.text());
			}
		});
}

export async function POST(url: string, options?: any) {
	return window
		.fetch(url, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			credentials: "include",
			mode: "cors",
			...options,
		})
		.then(async (response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error(await response.text());
			}
		});
}
