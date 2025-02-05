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

        // Create mobile navigation with labels and functional links
        const navBar = document.createElement('div');
        navBar.className = 'mobile-nav-bar';
        navBar.innerHTML = `
            <div class="mobile-nav-content">
                <div class="d-flex justify-content-around align-items-center mb-2">
                    <button class="btn btn-link d-flex flex-column align-items-center" onclick="switchTab('team-overview')">
                        <i class="fas fa-info-circle mb-1"></i>
                        <small>Overview</small>
                    </button>
                    <button class="btn btn-link d-flex flex-column align-items-center" onclick="switchTab('attendees-checkin')">
                        <i class="fas fa-users mb-1"></i>
                        <small>Attendees</small>
                    </button>
                    <button class="btn btn-link d-flex flex-column align-items-center" onclick="switchTab('payment-forms')">
                        <i class="fas fa-file-invoice-dollar mb-1"></i>
                        <small>Forms</small>
                    </button>
                    <button class="btn btn-link d-flex flex-column align-items-center" onclick="switchTab('housing-food')">
                        <i class="fas fa-hotel mb-1"></i>
                        <small>Housing</small>
                    </button>
                </div>
                <div class="social-links text-center pt-2 border-top">
                    <a href="https://www.linkedin.com/company/destination-imagination/" target="_blank" class="text-muted me-3" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                    <a href="https://www.youtube.com/user/DIGlobalFinals" target="_blank" class="text-muted me-3" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                    <a href="https://x.com/idodi" target="_blank" class="text-muted me-3" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                    <a href="https://www.pinterest.com/boxandball/" target="_blank" class="text-muted" aria-label="Pinterest"><i class="fab fa-pinterest"></i></a>
                </div>
            </div>
        `;
        document.body.appendChild(navBar);

        // Add this function to handle tab switching
        window.switchTab = function(tabId) {
            // Remove active class from all tabs and panes
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('show', 'active');
            });
            document.querySelectorAll('.nav-tabs .nav-link').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.mobile-nav-bar .btn-link').forEach(btn => {
                btn.classList.remove('active');
            });

            // Activate the selected tab and pane
            const selectedPane = document.getElementById(tabId);
            const selectedTab = document.querySelector(`[data-bs-target="#${tabId}"]`);
            const selectedMobileBtn = document.querySelector(`.mobile-nav-bar .btn-link[onclick*="${tabId}"]`);

            if (selectedPane) selectedPane.classList.add('show', 'active');
            if (selectedTab) selectedTab.classList.add('active');
            if (selectedMobileBtn) selectedMobileBtn.classList.add('active');
        };

        // Set initial active state
        const initialActiveTab = document.querySelector('.nav-tabs .active');
        if (initialActiveTab) {
            const targetId = initialActiveTab.getAttribute('data-bs-target').substring(1);
            switchTab(targetId);
        }
    }

    // Remove floating action button if it exists
    const fab = document.querySelector('.fab');
    if (fab) {
        fab.removeEventListener('click', showQuickActions);
        fab.remove();
    }

    // Remove showQuickActions function call
    const existingFab = document.querySelector('.fab');
    if (existingFab) {
        existingFab.remove();
    }

    // Initialize status counters
    const statusCounts = {
        all: { total: 15, checked: 7, forms: 12, badges: 5 },
        managers: { total: 1, checked: 1, forms: 1, badges: 1 },
        participants: { total: 6, checked: 4, forms: 5, badges: 2 },
        spectators: { total: 8, checked: 2, forms: 6, badges: 2 }
    };

    // Initialize Bootstrap modal
    const addMemberModal = new bootstrap.Modal(document.getElementById('addMemberModal'));
    
    // Add click handlers to category items
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.category;
            const categoryName = this.querySelector('.category-name').textContent;
            showCategoryContent(category, categoryName);
        });
    });

    function showCategoryContent(category, categoryName) {
        // Hide category list and show content
        document.querySelector('.category-list').style.display = 'none';
        const contentDiv = document.getElementById('category-content');
        contentDiv.style.display = 'block';

        // Update title
        document.querySelector('.category-title').textContent = categoryName;

        // Get and display members
        const members = getMembersByCategory(category);
        displayMembers(members, category);
    }

    function displayMembers(members, category) {
        const memberList = document.querySelector('.member-list');
        memberList.innerHTML = members.map(member => `
            <div class="member-card">
                <button class="remove-btn" onclick="removeMember('${member.id}')">
                    <i class="fas fa-times"></i>
                </button>
                <div class="member-info">
                    <h6>${member.name}</h6>
                    <span class="role-badge ${member.role.toLowerCase()}">${member.role}</span>
                </div>
                <div class="member-status">
                    ${getStatusBadges(member.status)}
                </div>
                <div class="member-actions">
                    <button class="btn btn-outline-primary btn-sm">
                        <i class="fas fa-envelope"></i>
                        <span class="btn-text">Send Forms</span>
                    </button>
                    <button class="btn btn-outline-secondary btn-sm">
                        <i class="fas fa-print"></i>
                        <span class="btn-text">Print Badge</span>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Helper function to generate status badges
    function getStatusBadges(status) {
        return `
            <span class="badge ${status.checkedIn ? 'bg-success' : 'bg-secondary'}">
                ${status.checkedIn ? 'Checked In' : 'Not Checked In'}
            </span>
            <span class="badge ${status.formsComplete ? 'bg-success' : 'bg-warning'}">
                ${status.formsComplete ? 'Forms Complete' : 'Forms Pending'}
            </span>
        `;
    }

    // Back button handler
    document.querySelector('.back-button').addEventListener('click', function() {
        document.querySelector('.category-list').style.display = 'block';
        document.getElementById('category-content').style.display = 'none';
    });

    // Add member button handler
    document.querySelector('.add-member-btn').addEventListener('click', function() {
        addMemberModal.show();
    });

    // Remove member function
    window.removeMember = function(memberId) {
        if (confirm('Are you sure you want to remove this member?')) {
            // Add removal logic here
            console.log('Removing member:', memberId);
        }
    };
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
