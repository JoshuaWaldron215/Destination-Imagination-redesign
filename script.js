document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing theme toggle...');
    

    function showPlaceholderPage(pageName) {
        alert(pageName + " page is under construction.");
    }

    document.querySelectorAll(".btn-edit").forEach(button => {
        button.addEventListener("click", function () {
            const row = this.closest("tr");
            document.getElementById("editName").value = row.cells[1].innerText;
            document.getElementById("editEmail").value = row.cells[2] ? row.cells[2].innerText : "";
            new bootstrap.Modal(document.getElementById("editModal")).show();
        });
    });
    
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize Bootstrap tabs
    var triggerTabList = [].slice.call(document.querySelectorAll('#registrationTabs button'));
    triggerTabList.forEach(function (triggerEl) {
        var tabTrigger = new bootstrap.Tab(triggerEl);
        triggerEl.addEventListener('click', function (event) {
            event.preventDefault();
            tabTrigger.show();
        });
    });

    // Scroll active tab into view on mobile
    function scrollActiveTabIntoView() {
        const activeTab = document.querySelector('.nav-tabs .active');
        if (activeTab) {
            activeTab.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    // Call on page load and tab change
    scrollActiveTabIntoView();
    triggerTabList.forEach(tab => {
        tab.addEventListener('shown.bs.tab', scrollActiveTabIntoView);
    });

    // Handle horizontal scroll with touch/mouse drag
    const tabList = document.querySelector('.nav-tabs');
    let isDown = false;
    let startX;
    let scrollLeft;

    tabList.addEventListener('mousedown', (e) => {
        isDown = true;
        tabList.classList.add('active');
        startX = e.pageX - tabList.offsetLeft;
        scrollLeft = tabList.scrollLeft;
    });

    tabList.addEventListener('mouseleave', () => {
        isDown = false;
        tabList.classList.remove('active');
    });

    tabList.addEventListener('mouseup', () => {
        isDown = false;
        tabList.classList.remove('active');
    });

    tabList.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - tabList.offsetLeft;
        const walk = (x - startX) * 2;
        tabList.scrollLeft = scrollLeft - walk;
    });

    // Add form validation
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Copy to clipboard functionality
    document.querySelectorAll(".btn-secondary").forEach(button => {
        button.addEventListener("click", function () {
            const emailField = this.closest("tr").querySelector("input[type='email']");
            if (emailField && emailField.value) {
                navigator.clipboard.writeText(emailField.value).then(() => {
                    showToast("Email copied to clipboard!");
                }).catch(err => {
                    console.error("Failed to copy email: ", err);
                });
            }
        });
    });

    // Add theme toggle button to the DOM
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);
    
    console.log('Theme toggle button created');

    // Initialize theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDark.matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-bs-theme', currentTheme);
    updateThemeIcon(currentTheme);

    // Add theme toggle click handler
    themeToggle.addEventListener('click', () => {
        console.log('Theme toggle clicked');
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // Add touch-friendly table handling
    document.querySelectorAll('.table-responsive').forEach(table => {
        if (window.innerWidth <= 768) {
            const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
            table.querySelectorAll('tbody tr').forEach(row => {
                row.querySelectorAll('td').forEach((cell, index) => {
                    cell.setAttribute('data-label', headers[index]);
                });
            });
            table.classList.add('table-responsive-stack');
        }
    });

    // Add loading state to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('btn-loading')) return;
            
            const hasLoadingAttr = this.hasAttribute('data-loading');
            if (hasLoadingAttr) {
                this.classList.add('btn-loading');
                setTimeout(() => {
                    this.classList.remove('btn-loading');
                }, 2000); // Remove after 2 seconds
            }
        });
    });

    // Initialize mobile table stacking
    const tables = document.querySelectorAll('.table');
    tables.forEach(table => {
        if (window.innerWidth <= 768) {
            const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
            table.querySelectorAll('tbody tr').forEach(row => {
                row.querySelectorAll('td').forEach((cell, index) => {
                    cell.setAttribute('data-label', headers[index]);
                });
            });
            table.classList.add('table-mobile-stack');
        }
    });

    // Mobile Accordion Functionality
    const accordionHeaders = document.querySelectorAll('.mobile-accordion .card-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const card = header.closest('.card');
            const wasActive = card.classList.contains('active');
            
            // Close all cards
            document.querySelectorAll('.mobile-accordion .card').forEach(c => {
                c.classList.remove('active');
            });

            // Open clicked card if it wasn't active
            if (!wasActive) {
                card.classList.add('active');
                // Smooth scroll to card
                card.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Add bottom navigation bar for mobile
    if (window.innerWidth <= 768) {
        const navBar = document.createElement('div');
        navBar.className = 'mobile-nav-bar';
        navBar.innerHTML = `
            <div class="d-flex justify-content-around">
                <button class="btn btn-link" onclick="scrollToSection('team-overview')">
                    <i class="fas fa-home"></i>
                </button>
                <button class="btn btn-link" onclick="scrollToSection('attendees-checkin')">
                    <i class="fas fa-users"></i>
                </button>
                <button class="btn btn-link" onclick="scrollToSection('payment-forms')">
                    <i class="fas fa-file-alt"></i>
                </button>
                <button class="btn btn-link" onclick="scrollToSection('housing-food')">
                    <i class="fas fa-bed"></i>
                </button>
            </div>
        `;
        document.body.appendChild(navBar);
    }

    // Add floating action button for quick actions
    const fab = document.createElement('button');
    fab.className = 'fab';
    fab.innerHTML = '<i class="fas fa-plus"></i>';
    fab.addEventListener('click', showQuickActions);
    document.body.appendChild(fab);

});

// Toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} show`;
    toast.innerHTML = `
        <div class="toast-body">
            ${message}
        </div>
    `;

    const container = document.querySelector('.toast-container') || (() => {
        const c = document.createElement('div');
        c.className = 'toast-container';
        document.body.appendChild(c);
        return c;
    })();

    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', 
            theme === 'dark' ? '#212529' : '#ffffff');
    }
}

// Helper Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function showQuickActions() {
    // Create and show a bottom sheet with quick actions
    const actions = [
        { icon: 'plus-circle', text: 'Add Participant', action: () => {} },
        { icon: 'envelope', text: 'Send Forms', action: () => {} },
        { icon: 'question-circle', text: 'Get Help', action: () => {} }
    ];

    const sheet = document.createElement('div');
    sheet.className = 'bottom-sheet';
    sheet.innerHTML = `
        <div class="bottom-sheet-content">
            <h5>Quick Actions</h5>
            <div class="list-group">
                ${actions.map(action => `
                    <button class="list-group-item list-group-item-action">
                        <i class="fas fa-${action.icon} me-2"></i>
                        ${action.text}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    document.body.appendChild(sheet);
    setTimeout(() => sheet.classList.add('show'), 10);

    sheet.addEventListener('click', (e) => {
        if (e.target === sheet) {
            sheet.classList.remove('show');
            setTimeout(() => sheet.remove(), 300);
        }
    });
}
