async function newFormHandler(event) {
    event.preventDefault();

    const helpName = document.querySelector('input[name="help_name"]').value;
    const helpEmail = document.querySelector('input[name="help_email"]').value;
    const helpMessage = document.querySelector('input[name="help_message"]').value;

    const response = await fetch(`/help/send`, {
        method: 'POST',
        body: JSON.stringify({
            helpName,
            helpEmail,
            helpMessage
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/help');
        alert("Email has been sent!")
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.help-form').addEventListener('submit', newFormHandler);
