const character = {
    name: "Shenron",
    class: "Draconian Warrior",
    level: 5,
    health: 100,
    image: 'dragon.png',
    attacked() {
        if (this.health > 20) {
            this.level -= 1;
            this.health -= 20;
        } else {
            alert('Character Died');
        }
        showStats(this);
    },
    levelUp() {
        this.level += 1;
        this.health += 20;
        showStats(this);
    }
};

function setCharacter(character) {
    const image = document.querySelector(".image");
    const name = document.querySelector(".name");
    const characterClass = document.querySelector("#class");
    const level = document.querySelector("#level");
    const health = document.querySelector("#health");

    image.src = character.image;
    image.alt = "Character Image";
    name.textContent = character.name;
    characterClass.textContent = character.class;
    level.textContent = character.level;
    health.textContent = character.health;
}

function showStats(character) {
    document.querySelector("#level").textContent = character.level;
    document.querySelector("#health").textContent = character.health;
}

setCharacter(character);

document.querySelector("#attacked").addEventListener("click", () => character.attacked());
document.querySelector("#levelup").addEventListener("click", () => character.levelUp());