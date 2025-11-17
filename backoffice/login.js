const API_BASE = "https://portfolio-api-three-black.vercel.app/api/v1";

function saveToken(token){
    localStorage.setItem("authToken", token);
}

async function login({email, password}){
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password})
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || "Error en el login");
    }
    saveToken(data.token);
    return data;
}


document.addEventListener("DOMContentLoaded", () =>{
    const loguearse = document.querySelector("form");
    const botonLogin = loguearse.querySelector(".submit-btn");
    const mensajes = document.createElement("div");
    mensajes.id = "form-messages";
    loguearse.appendChild(mensajes);

    loguearse.addEventListener("submit", async (e) =>{
        e.preventDefault();
        mensajes.textContent = "";
        botonLogin.disabled = true;
        botonLogin.textContent = "Iniciando sesión...";
        const user = {
            email: loguearse.querySelector("#email").value.trim(),
            password: loguearse.querySelector("#password").value.trim()
        };
        if(!user.email || !user.password){
            mensajes.textContent = "Complete todos los campos.";
            botonLogin.disabled = false;
            botonLogin.textContent = "Iniciar sesión";
            return;
        }
        try {
            const data = await login(user);

            const token = data.token || data.data.token || data.accessToken;
            if(!token) throw new Error("Token no recibido desde la API");
            saveToken(token);

            mensajes.textContent = "Inicio de sesión exitoso";
            mensajes.style.color = "green";
            
            window.location.href = "./Home.html";
            
        } catch (error) {
            mensajes.textContent = error.message;
            mensajes.style.color = "red";
        } finally {
            botonLogin.disabled = false;
            botonLogin.textContent = "Iniciar sesión";
        }
    });
})