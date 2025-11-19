const form = document.getElementById('form');
form.addEventListener('submit',(event) =>{
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);
    console.log(formData.get('file'));


    fetch("https://api.escuelajs.co/api/v1/files/upload",{
        method: "POST",
        body: formData,
    }).then(response=> response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))

    
})

