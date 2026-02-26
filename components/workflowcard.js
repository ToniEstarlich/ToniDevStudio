const WORKFLOW = [
  { color: '#007BFF', emoji: '🔵', title: 'Information', description: 'Databases, JSON, and APIs (SQL / JSON / REST APIs). This is where the raw data lives, coming from backend or external sources.' },
  { color: '#28A745', emoji: '🟢', title: 'Backend Logic', description: 'Processing data, business rules, and transforming information using Python, C#, Django, or Flask.' },
  { color: '#FFC107', emoji: '🟡', title: 'Object & Component Logic', description: 'Building objects, data structures, and React components in JavaScript that connect data to UI.' },
  { color: '#FD7E14', emoji: '🟠', title: 'Frontend UI Render', description: 'Rendering the user interface with HTML, CSS, and React JSX. This is what users see and interact with.' },
  { color: '#DC3545', emoji: '🔴', title: 'Testing & QA', description: 'Ensuring everything works correctly with Jest, Pytest, and other testing tools.' }
];

class WorkflowCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const cardIndex = parseInt(this.getAttribute('index')) || 0;
    const step = WORKFLOW[cardIndex];

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background-color: ${step.color};
          color: ${step.color === '#FFC107' ? 'black' : 'white'};
          padding: 20px;
          border-radius: 12px;
          margin: 10px 0;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }
        .description {
          display: none;
          margin-top: 10px;
        }
      </style>
      <div class="card">
        <h4>${step.emoji} ${step.title}</h4>
        <p class="description">${step.description}</p>
      </div>
    `;

    const cardEl = this.shadowRoot.querySelector('.card');
    const descEl = this.shadowRoot.querySelector('.description');

    cardEl.addEventListener('click', () => {
      descEl.style.display = descEl.style.display === 'block' ? 'none' : 'block';
    });
  }
}

customElements.define('workflow-card', WorkflowCard);
