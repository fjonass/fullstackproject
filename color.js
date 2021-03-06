//const colorScheme = localStorage.getItem("color-scheme") || colorScheme;

//document.getElementById("light-mode").checked = colorScheme === "light-mode";
//document.getElementById("dark-mode").checked = colorScheme === "dark-mode";

Array.from(document.querySelectorAll("input[name='color-scheme']"))
	.forEach(el => el.addEventListener("click", event => {
		localStorage.setItem("color-scheme", event.target.id);
	}));