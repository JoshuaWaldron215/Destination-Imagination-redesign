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

    // Fix tab content visibility
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => {
        // Remove all 'show active' classes initially
        pane.classList.remove('show', 'active');
    });
    
    // Set only the first tab as active
    const firstTab = document.querySelector('#team-overview');
    if (firstTab) {
        firstTab.classList.add('show', 'active');
    }

    // Simplify mobile navigation - remove redundant elements
    if (window.innerWidth <= 768) {
        // Remove floating action button if it exists
        const existingFab = document.querySelector('.fab');
        if (existingFab) {
            existingFab.remove();
        }

        // Create mobile navigation with labels
        const navBar = document.createElement('div');
        navBar.className = 'mobile-nav-bar';
        navBar.innerHTML = `
            <div class="mobile-nav-content">
                <div class="d-flex justify-content-around align-items-center mb-2">
                    <button class="btn btn-link d-flex flex-column align-items-center" data-bs-toggle="tab" data-bs-target="#team-overview">
                        <i class="fas fa-info-circle mb-1"></i>
                        <small>Overview</small>
                    </button>
                    <button class="btn btn-link d-flex flex-column align-items-center" data-bs-toggle="tab" data-bs-target="#attendees-checkin">
                        <i class="fas fa-users mb-1"></i>
                        <small>Attendees</small>
                    </button>
                    <button class="btn btn-link d-flex flex-column align-items-center" data-bs-toggle="tab" data-bs-target="#payment-forms">
                        <i class="fas fa-file-invoice-dollar mb-1"></i>
                        <small>Forms</small>
                    </button>
                    <button class="btn btn-link d-flex flex-column align-items-center" data-bs-toggle="tab" data-bs-target="#housing-food">
                        <i class="fas fa-hotel mb-1"></i>
                        <small>Housing</small>
                    </button>
                </div>
                <div class="social-links text-center pt-2 border-top">
                    <a href="#" onclick="event.preventDefault();" class="text-muted me-3" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                    <a href="#" onclick="event.preventDefault();" class="text-muted me-3" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                    <a href="#" onclick="event.preventDefault();" class="text-muted me-3" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                    <a href="#" onclick="event.preventDefault();" class="text-muted" aria-label="Pinterest"><i class="fab fa-pinterest"></i></a>
                </div>
            </div>
        `;
        document.body.appendChild(navBar);
    }

    // Remove showQuickActions function call
    const fab = document.querySelector('.fab');
    if (fab) {
        fab.removeEventListener('click', showQuickActions);
        fab.remove();
    }
});

// Toast notification
function showToast(message) {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '11';
    
    const toastHTML = `
        <div class="toast show" role="alert">
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    toastContainer.innerHTML = toastHTML;
    document.body.appendChild(toastContainer);
    
    setTimeout(() => {
        toastContainer.remove();
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
