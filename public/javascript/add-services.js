async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="provider-name"]').value;
    const provider_url = document.querySelector('input[name="services-url"]').value;
    const service_type = document.querySelector('input[name="service_type"]').value;
    const address = document.querySelector('input[name="address"]').value;
    const cost = document.querySelector('input[name="cost"]').value;

    const response = await fetch(`/api/services`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            provider_url,
            service_type,
            address,
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
