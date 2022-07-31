async function newFormHandler(event) {
    event.preventDefault();

    const service_name = document.querySelector('input[name="service_name"]').value;
    const service_category = document.querySelector('input[name="service_category"]').value;
    const cost = document.querySelector('input[name="cost"]').value;

    const response = await fetch(`/api/services`, {
        method: 'POST',
        body: JSON.stringify({
            service_name,
            service_category,
            cost
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-service-form').addEventListener('submit', newFormHandler);
