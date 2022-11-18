document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("buscador-button").onclick = () => {
        let query = document.getElementById("buscador-value").value.trim();
        if (query.length > 0) {
            window.location.href = "categoria.html?q=" + query;
        }
    };

    document.getElementById("buscador-value").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.key === "Enter") {
            document.getElementById("buscador-button").click();
        }
    });
});
