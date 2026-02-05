import { WHATSAPP_NUMBER } from "../JS/config.js";
const phone = WHATSAPP_NUMBER;

class WhatsAppWidget extends HTMLElement {
  constructor() {
    super();
    // Attach a Shadow DOM to encapsulate styles and HTML
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Get phone number from attribute
    const phone = this.getAttribute("phone");
    // Default message if none is provided
    const defaultMessage =
      this.getAttribute("message") || "Hi, I'm interested in your portfolio!";

    // Set up HTML and CSS inside Shadow DOM
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          font-family: sans-serif;
        }

        .widget-container {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .widget-button {
          width: 60px;
          height: 60px;
          background: rgba(37, 211, 102, 0.9); /* WhatsApp green with transparency */
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .widget-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0,0,0,0.3);
        }

        .widget-button img {
          width: 32px;
          height: 32px;
        }

        .widget-input {
          margin-bottom: 8px;
          width: 250px;
          max-width: 80vw;
          padding: 8px 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 0.9rem;
          display: none; /* hidden initially */
        }
      </style>

      <div class="widget-container">
        <!-- Input field for typing the message -->
        <input class="widget-input" type="text" placeholder="Write your message..." />
        <!-- Floating WhatsApp logo button -->
        <div class="widget-button">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp Logo" />
        </div>
      </div>
    `;

    const widgetButton = this.shadowRoot.querySelector(".widget-button");
    const widgetInput = this.shadowRoot.querySelector(".widget-input");
    let inputVisible = false;

    // Toggle input visibility when the logo is clicked
    widgetButton.addEventListener("click", () => {
      if (!inputVisible) {
        widgetInput.style.display = "block";
        widgetInput.focus(); // focus on input
        inputVisible = true;
      } else {
        // If input has text, open WhatsApp Web with the message
        const text = encodeURIComponent(widgetInput.value || defaultMessage);
        window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
        // Reset input and hide it again
        widgetInput.value = "";
        widgetInput.style.display = "none";
        inputVisible = false;
      }
    });

    // Allow sending message by pressing Enter
    widgetInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const text = encodeURIComponent(widgetInput.value || defaultMessage);
        window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
        widgetInput.value = "";
        widgetInput.style.display = "none";
        inputVisible = false;
      }
    });
  }
}

// Define the custom element
customElements.define("whatsapp-widget", WhatsAppWidget);
