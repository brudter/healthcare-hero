async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="provider-name"]').value;
    const post_url = document.querySelector('input[name="post-url"]').value;
    const service_type = document.querySelector('input[name="service_type"]').value;
    const address = document.querySelector('input[name="address"]').value;
    const cost = document.querySelector('input[name="cost"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_url,
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

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
