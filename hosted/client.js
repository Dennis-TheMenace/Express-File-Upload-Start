const { uploadFile } = require("../src/controllers/files");

const uploadFile = async (e) =>
{
    e.preventDefault();

    const response = await fetch('/upload',
    {
        method: 'POST',
        body: new FormData(e.target),
    });

    const text = await response.text();
    document.getElementById('messages').innerHTML = text;

    return false;
};

const init = () =>
{
    const uploadForm = document.getElementById('uploadForm');
    uploadForm.addEventListener('submit', uploadFile);
};

window.onload = init;