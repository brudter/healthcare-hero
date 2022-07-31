async function editFormHandler(event) {
    event.preventDefault();

    const service_name = document.querySelector('input[name="service_name"]').value.trim();
    const service_category = document.querySelector('input[name="service_category"]').value.trim();
    const cost = document.querySelector('input[name="cost"]').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/services/${id}`, {
        method: 'PUT',
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
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-services-form').addEventListener('submit', editFormHandler);
