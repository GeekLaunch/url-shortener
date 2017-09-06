const input = document.getElementById('url-input'),
    button = document.getElementById('shorten-button'),
    out = document.getElementById('out');

input.focus();

async function shorten (href) {
    const shortid = (await (await fetch('/api/new', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({href}),
    })).json()).shortid;

    return shortid;
}

button.addEventListener('click', async () => {
    const link = `${location.origin}/l/${await shorten(input.value)}`;
    out.innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
});
