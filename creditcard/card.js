function verifyCardNumber(number) {
    return number === '1234123412341234';
}

function getDate(month, year) {
    return new Date(year, month);
}

function displayError(message) {
    document.querySelector('.errorMessage').innerHTML = message;
}

function submitHandler(e) {
    e.preventDefault();

    let errorMessage = '';
    displayError('');

    const cardNumber = this.cardNumber.value;

    if (isNaN(cardNumber)) {
        errorMessage += `Your credit card number is not a number.\n`
    } else if (!verifyCardNumber(cardNumber)) {
        errorMessage += `Enter a valid credit card number.\n`
    }

    const month = document.getElementById('month').value;
    const year = "20" + document.getElementById('year').value;
    const date = getDate(month, year);
    console.log(date);
    const today = new Date();

    if (today > date) {
        errorMessage += `Enter a future date.\n`;
    }

    if (errorMessage !== '') {
        displayError(errorMessage);
        return false;
    }
    return true;
}

document.querySelector(".creditCard").addEventListener("submit", submitHandler);