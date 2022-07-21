async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="provider-name"]').value.trim();
    const address = document.querySelector('input[name="address"]').value.trim();
    const services_url = document.querySelector('input[name="services-url"]').value.trim();
    const service_type = document.querySelector('input[name="service_type"]').value.trim();
    const cost = document.querySelector('input[name="cost"]').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            address,
            services_url,
            service_type,
            cost

        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-services-form').addEventListener('submit', editFormHandler);
