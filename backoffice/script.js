
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirige al login (index.html)
            window.location.replace('index.html');
        }