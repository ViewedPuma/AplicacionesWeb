console.log(1);

setTimeout(() => {
    console.log(2);
}, 2000);

console.log(3);


function callback(){
    console.log(5);
}

function contador(call){
    console.log(4);
    call();
    console.log(6);

}

contador(callback);

//una promesa es asi:

const prom = new Promise((resolve, reject) => {
    const status = false;
    if(status){
        resolve('Cava vuelve con mi coca');
    } else {
        reject('Cava se clava mi feria');
    }
});


const result = fetch('https://api.escuelajs.co/api/v1/products')
    .then(result => result.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
console.log(prom);