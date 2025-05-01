// Sarah Dombroski

const newParagraph = document.createElement("p");
newParagraph.innerText = "Added with JavaScript!";
document.body.appendChild(newParagraph);

const newPicture = document.createElement("img")
newPicture.setAttribute("src", "https://picsum.photos/200")
newPicture.setAttribute("alt", "Picture")
document.body.appendChild(newPicture);

const newDiv = document.createElement("div");
newDiv.innerHTML = "<ul><li>One</li><li>Two</li><li>Three</li><ul>"
document.body.appendChild(newDiv);

const newSection = document.createElement("section");
newSection.innerHTML = "<h2>Dom Basics</h2><p>This was added through Javascript</p>";
document.body.appendChild(newSection);