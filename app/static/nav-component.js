class SiteNav extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
      <nav class="thick-border" style="background:#18140c;display:flex;align-items:center;justify-content:space-between;padding:8px 24px;box-sizing:border-box;width:100%;position:relative;">
        <div style="display:flex;align-items:center;gap:18px;">
          <span style="font-family:MagicCards,serif;font-size:1.5em;color:#e0cfa9;">Katariah's Website</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;position:relative;">
          <a href="home.html" class="button" style="min-width:80px;">Home</a>
          <a href="resume.html" class="button" style="min-width:100px;">My Resume</a>
          <a href="contact.html" class="button" style="min-width:90px;">Contact</a>
          <div style="position:relative;">
            <button id="dropdownBtn" class="button" style="min-width:100px;font-size:1.05em;">More ▼</button>
            <div id="dropdownMenu" class="dropdown-menu" style="display:none;">
              <a href="guest-lecture.html" class="dropdown-link">Tech Talk</a>
              <a href="pets.html" class="dropdown-link">My Pets</a>
              <a href="fonts.html" class="dropdown-link">My Fonts</a>
              <a href="art.html" class="dropdown-link">Art & Fashion</a>
            </div>
          </div>
        </div>
      </nav>`;
		this._initDropdown();
	}
	_initDropdown() {
		const btn = this.querySelector("#dropdownBtn");
		const menu = this.querySelector("#dropdownMenu");
		if (!btn || !menu) return;
		btn.addEventListener("click", (e) => {
			e.stopPropagation();
			menu.style.display = menu.style.display === "block" ? "none" : "block";
		});
		document.addEventListener("click", () => {
			menu.style.display = "none";
		});
	}
}
customElements.define("site-nav", SiteNav);
