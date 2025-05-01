const themeSelector = document.querySelector("select");

function changeTheme() {
    // check to see what the current value of our select is
    const value = themeSelector.value;

    // change to dark or light mode depending on whichever they choose

    if (value === "dark"){
        document.body.classList.add("dark");
        document.querySelector("img").src = "byui-logo_white.png";
    }
    else {
        document.body.classList.remove("dark");
        document.querySelector("img").src = "byui-logo_blue.webp";
    }
}

// Use event listener to change the theme
themeSelector.addEventListener('change', changeTheme);