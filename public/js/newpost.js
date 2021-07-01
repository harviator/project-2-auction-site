const newFormHandler = async (event) => {
    event.preventDefault();

    const merchandise_id = document.querySelector('#add-item').value.trim();
    const quality = document.querySelector('#add-quality').value.trim();
    const starting_bid = document.querySelector('#add-starting-bid').value.trim();

    if (merchandise_id && quality && starting_bid) {
        const response = await fetch(`/api/postings`, {
            method: 'POST',
            body: JSON.stringify({ merchandise_id, quality, starting_bid}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            console.log(response)
            alert("SOMETHING WENT WRONG")
        }
    }
}

document.querySelector('.add-post-form').addEventListener('submit', newFormHandler);