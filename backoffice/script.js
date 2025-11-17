//Para registro, los datos que se envian es Nombre, gmail, itsonId y password

const API_BASE = "https://portfolio-api-three-black.vercel.app/api/v1";

async function register(user){
    const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || "Error en el registro");
    }
    return data;
}



document.addEventListener("DOMContentLoaded", () => {
    const Registro = document.querySelector("form");
    const botonRegistro = Registro.querySelector(".submit-btn");
    const mensajes = document.createElement("div");
    mensajes.id = "form-messages";
    Registro.appendChild(mensajes);

    Registro.addEventListener("submit", async (e) =>{
        e.preventDefault();
        mensajes.textContent = "";
        botonRegistro.disabled = true;
        botonRegistro.textContent = "Registrando...";
        const user = {
            name: Registro.querySelector("#Name").value.trim(),
            email: Registro.querySelector("#email").value.trim(),
            itsonId: Registro.querySelector("#itsonId").value.trim(),
            password: Registro.querySelector("#password").value.trim()
        };

        if(!user.name || !user.email || !user.itsonId || !user.password){
            mensajes.textContent = "Complete todos los campos.";
            botonRegistro.disabled = false;
            botonRegistro.textContent = "Registrarse";
            return;
        }

        try{
            const resultado = await register(user);
            mensajes.style.color = "green";
            mensajes.textContent = "Registro exitoso";
            setTimeout(() => window.location.href = "./index.html", 1000);
                
        } catch (error){
            mensajes.style.color = "red";
            mensajes.textContent = error.message;
        } finally {
            botonRegistro.disabled = false;
            botonRegistro.textContent = "Registrarse";
        }

    })
});

