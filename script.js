// Move memberData to the top level and make it a global variable
window.memberData = {
    managers: [
        {
            name: 'Michael McQuaid',
            email: 'mmcquaid@wearenedi.com',
            status: 'signed',
            details: {
                pronouns: 'He/him',
                firstYearDI: 'No',
                firstGF: 'No',
                DIAlum: 'Yes',
                certification: 'Yes',
                teamNumber: '1',
                role: 'Team Manager'
            }
        }
    ],
    participants: [
        {
            name: 'Cache Hickman',
            email: 'cautumnturner@gmail.com',
            status: 'signed',
            details: {
                pronouns: 'He/him',
                age: '17 yrs',
                firstYearDI: 'No',
                firstGF: 'Yes',
                role: 'Participant'
            }
        },
        {
            name: 'Haven Edwards',
            email: 'Donniealane@gmail.com',
            status: 'signed',
            details: {
                pronouns: 'She/her',
                age: '15 yrs',
                firstYearDI: 'No',
                firstGF: 'Yes',
                role: 'Participant'
            }
        },
        {
            name: 'Nancy Carol McQuaid',
            email: 'mmcquaid74@gmail.com',
            status: 'signed',
            details: {
                pronouns: 'She/her',
                age: '15 yrs',
                firstYearDI: 'No',
                firstGF: 'Yes',
                role: 'Participant'
            }
        },
        {
            name: 'Kendall Ingram',
            email: 'amyingram.m@outlook.com',
            status: 'signed',
            details: {
                pronouns: 'She/her',
                age: '15 yrs',
                firstYearDI: 'No',
                firstGF: 'Yes',
                role: 'Participant'
            }
        },
        {
            name: 'Emmaline Phipps',
            email: 'ephipps607@burke.k12.nc.us',
            status: 'signed',
            details: {
                pronouns: 'She/her',
                age: '17 yrs',
                firstYearDI: 'No',
                firstGF: 'Yes',
                role: 'Participant'
            }
        },
        {
            name: 'Sophie Moseley',
            email: 'ljmoseley@charter.net',
            status: 'signed',
            details: {
                pronouns: 'They/them',
                age: '16 yrs',
                firstYearDI: 'No',
                firstGF: 'Yes',
                role: 'Participant'
            }
        }
    ],
    spectators: [
        {
            name: 'Elizabeth McQuaid',
            email: '',
            status: 'signed',
            details: {
                pronouns: 'I prefer not to answer',
                age: 'over 18',
                role: 'Spectator'
            }
        },
        {
            name: 'Amy Ingram',
            email: '',
            status: 'signed',
            details: {
                pronouns: 'I prefer not to answer',
                age: 'over 18',
                role: 'Spectator'
            }
        },
        {
            name: 'Paris Turner',
            email: '',
            status: 'signed',
            details: {
                pronouns: 'I prefer not to answer',
                age: 'over 18',
                role: 'Spectator'
            }
        },
        {
            name: 'Donnie Edwards',
            email: '',
            status: 'signed',
            details: {
                pronouns: 'I prefer not to answer',
                age: 'over 18',
                role: 'Spectator'
            }
        },
        {
            name: 'Carl Edwards',
            email: '',
            status: 'signed',
            details: {
                pronouns: 'I prefer not to answer',
                age: 'over 18',
                role: 'Spectator'
            }
        },
        {
            name: 'Autumn Turner',
            email: '',
            status: 'signed',
            details: {
                pronouns: 'I prefer not to answer',
                age: 'over 18',
                role: 'Spectator'
            }
        },
        {
            name: 'Pallavi Garg',
            email: '',
            status: 'signed',
            details: {
                pronouns: 'I prefer not to answer',
                age: 'over 18',
                role: 'Spectator'
            }
        },
        {
            name: 'Virendra Garg',
            email: '',
            status: 'signed',
            details: {
                pronouns: 'I prefer not to answer',
                age: 'over 18',
                role: 'Spectator'
            }
        }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('Script initialized');

    // Initialize data
    const memberData = {
        all: [],
        managers: [
            {
                name: 'Michael McQuaid',
                email: 'mmcquaid@wearenedi.com',
                status: 'signed',
                lastUpdated: '2024-03-20',
                details: {
                    pronouns: 'He/him',
                    firstYearDI: 'No',
                    firstGF: 'No',
                    DIAlum: 'Yes',
                    certification: 'Yes',
                    teamNumber: '1',
                    role: 'Team Manager'
                }
            }
        ],
        participants: [
            {
                name: 'Cache Hickman',
                email: 'cautumnturner@gmail.com',
                status: 'signed',
                lastUpdated: '2024-03-19',
                details: {
                    pronouns: 'He/him',
                    age: '17 yrs',
                    firstYearDI: 'No',
                    firstGF: 'Yes',
                    role: 'Participant'
                }
            },
            {
                name: 'Haven Edwards',
                email: 'Donniealane@gmail.com',
                status: 'signed'
            },
            {
                name: 'Nancy Carol McQuaid',
                email: 'mmcquaid74@gmail.com',
                status: 'signed'
            },
            {
                name: 'Kendall Ingram',
                email: 'amyingram.m@outlook.com',
                status: 'signed'
            },
            {
                name: 'Emmaline Phipps',
                email: 'ephipps607@burke.k12.nc.us',
                status: 'signed'
            },
            {
                name: 'Sophie Moseley',
                email: 'ljmoseley@charter.net',
                status: 'signed'
            }
        ],
        spectators: [
            {
                name: 'Elizabeth McQuaid',
                email: '',
                status: 'signed',
                lastUpdated: '2024-03-18',
                details: {
                    pronouns: 'I prefer not to answer',
                    age: 'over 18',
                    role: 'Spectator'
                }
            },
            {
                name: 'Amy Ingram',
                email: '',
                status: 'signed'
            },
            {
                name: 'Paris Turner',
                email: '',
                status: 'signed'
            },
            {
                name: 'Donnie Edwards',
                email: '',
                status: 'signed'
            },
            {
                name: 'Carl Edwards',
                email: '',
                status: 'signed'
            },
            {
                name: 'Autumn Turner',
                email: '',
                status: 'signed'
            },
            {
                name: 'Pallavi Garg',
                email: '',
                status: 'signed'
            },
            {
                name: 'Virendra Garg',
                email: '',
                status: 'signed'
            }
        ]
    };

    // Populate 'all' category
    memberData.all = [
        ...memberData.managers,
        ...memberData.participants,
        ...memberData.spectators
    ];

    // Initialize category click handlers
    initializeCategoryHandlers();

    function initializeCategoryHandlers() {
        const categoryItems = document.querySelectorAll('.category-item');
        console.log('Found category items:', categoryItems.length);

        categoryItems.forEach(item => {
            item.addEventListener('click', handleCategoryClick);
        });
    }

    function handleCategoryClick(e) {
        // Don't trigger if clicking buttons
        if (e.target.closest('.add-btn') || e.target.closest('.remove-category-btn')) {
            return;
        }

        const category = this.dataset.category;
        const categoryName = this.querySelector('.category-name').textContent;
        console.log('Category clicked:', category);
        showCategoryContent(category, categoryName);
    }

    function showCategoryContent(category, categoryName) {
        const categoryList = document.querySelector('.category-list');
        const categoryContent = document.getElementById('category-content');

        if (!categoryContent) {
            console.error('Category content container not found');
            return;
        }

        // Hide list, show content
        categoryList.style.display = 'none';
        categoryContent.style.display = 'block';

        // Update content
        categoryContent.innerHTML = createCategoryContent(categoryName, category);

        // Add back button handler
        const backButton = categoryContent.querySelector('.back-button');
        backButton.addEventListener('click', () => {
            categoryList.style.display = 'block';
            categoryContent.style.display = 'none';
        });

        // Populate member list
        const memberList = categoryContent.querySelector('.member-list');
        const members = memberData[category] || [];
        members.forEach(member => {
            memberList.innerHTML += createMemberRow(member);
        });
    }

    function createCategoryContent(categoryName, category) {
        return `
            <div class="content-header">
                <div class="header-left">
                    <button class="btn btn-link back-button">
                        <i class="fas fa-arrow-left"></i>
                        <span>Back</span>
                    </button>
                    <h5 class="category-title">${categoryName}</h5>
                </div>
                <div class="header-actions">
                    <button class="btn btn-primary action-btn" title="Add Member">
                        <i class="fas fa-plus"></i>
                        <span class="sr-only">Add</span>
                    </button>
                    <button class="btn btn-outline-danger action-btn" title="Remove ">
                        <i class="fas fa-times"></i>
                        <span class="sr-only">Remove </span>
                    </button>
                </div>
            </div>
            <div class="member-list-container">
                <div class="member-table-header">
                    <div class="header-name">Name</div>
                    <div class="header-email">Email Address</div>
                    <div class="header-status">Status</div>
                    <div class="header-actions">Actions</div>
                </div>
                <div class="member-list">
                </div>
            </div>
        `;
    }

    function createMemberRow(member) {
        const memberId = member.name.replace(/\s+/g, '-').toLowerCase();
        return `
            <div class="member-row">
                <div class="member-info">
                    <div class="member-checkbox">
                        <input type="checkbox" ${member.status === 'signed' ? 'checked' : ''} id="member-${memberId}">
                    </div>
                    <div class="member-name-container">
                        <span class="member-name-text" onclick="showMemberDetails('${member.name}')">${member.name}</span>
                    </div>
                </div>
                <div class="member-email">
                    <div class="input-group">
                        <input type="email" 
                               class="form-control form-control-sm" 
                               id="email-${memberId}"
                               name="email-${memberId}"
                               value="${member.email}" 
                               placeholder="Enter email">
                    </div>
                </div>
                <div class="form-status ${member.status}">
                    <i class="fas ${member.status === 'signed' ? 'fa-check-circle' : 'fa-clock'}"></i>
                    ${member.status === 'signed' ? 'Signed' : 'Pending'}
                </div>
                <div class="member-actions">
                    <button class="btn btn-primary action-btn" title="Send Email">
                        <i class="fas fa-envelope"></i>
                    </button>
                    <button class="btn btn-outline-secondary action-btn" title="Copy Link">
                        <i class="fas fa-link"></i>
                    </button>
                </div>
            </div>
        `;
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
    }

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

    // Add this to your existing JavaScript
    function initializeSearch() {
        const searchInput = document.createElement('div');
        searchInput.className = 'list-controls';
        searchInput.innerHTML = `
            <div class="search-input input-group">
                <input type="text" 
                       class="form-control" 
                       placeholder="Search members..."
                       aria-label="Search members">
                <button class="btn btn-outline-secondary" type="button">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        `;
        
        const memberListContainer = document.querySelector('.member-list-container');
        memberListContainer.parentNode.insertBefore(searchInput, memberListContainer);
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

// Add these new functions
function showMemberDetails(memberName) {
    const member = findMemberByName(memberName);
    if (!member) return;

    const modal = createModal(member);
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => modal.classList.add('show'), 10);
}

function findMemberByName(name) {
    return [...memberData.managers, ...memberData.participants, ...memberData.spectators]
        .find(m => m.name === name);
}

function createModal(member) {
    const modal = document.createElement('div');
    modal.className = 'member-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h5>${member.name}</h5>
                <div class="modal-actions">
                    <button type="button" class="btn btn-primary btn-sm edit-btn" onclick="toggleEdit(this)">
                        <i class="fas fa-pencil-alt"></i> Edit
                    </button>
                    <button type="button" class="btn-close" onclick="closeModal(this)"></button>
                </div>
            </div>
            <div class="modal-body">
                <form class="member-details" onsubmit="saveChanges(event, '${member.name}')">
                    <div class="detail-row">
                        <span class="detail-label">Role:</span>
                        <span class="detail-value">${member.details.role}</span>
                        <select class="form-select detail-input" style="display: none;" disabled>
                            <option value="Team Manager" ${member.details.role === 'Team Manager' ? 'selected' : ''}>Team Manager</option>
                            <option value="Participant" ${member.details.role === 'Participant' ? 'selected' : ''}>Participant</option>
                            <option value="Spectator" ${member.details.role === 'Spectator' ? 'selected' : ''}>Spectator</option>
                        </select>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Pronouns:</span>
                        <span class="detail-value">${member.details.pronouns}</span>
                        <select class="form-select detail-input" style="display: none;" disabled>
                            <option value="He/him" ${member.details.pronouns === 'He/him' ? 'selected' : ''}>He/him</option>
                            <option value="She/her" ${member.details.pronouns === 'She/her' ? 'selected' : ''}>She/her</option>
                            <option value="They/them" ${member.details.pronouns === 'They/them' ? 'selected' : ''}>They/them</option>
                            <option value="I prefer not to answer" ${member.details.pronouns === 'I prefer not to answer' ? 'selected' : ''}>I prefer not to answer</option>
                        </select>
                    </div>
                    ${member.details.age ? `
                        <div class="detail-row">
                            <span class="detail-label">Age:</span>
                            <span class="detail-value">${member.details.age}</span>
                            <select class="form-select detail-input" style="display: none;" disabled>
                                ${Array.from({length: 10}, (_, i) => i + 12).map(age => 
                                    `<option value="${age} yrs" ${member.details.age === age + ' yrs' ? 'selected' : ''}>${age} yrs</option>`
                                ).join('')}
                                <option value="over 18" ${member.details.age === 'over 18' ? 'selected' : ''}>over 18</option>
                            </select>
                        </div>
                    ` : ''}
                    ${member.details.firstYearDI !== undefined ? `
                        <div class="detail-row">
                            <span class="detail-label">First Year of DI:</span>
                            <span class="detail-value">${member.details.firstYearDI}</span>
                            <select class="form-select detail-input" style="display: none;" disabled>
                                <option value="Yes" ${member.details.firstYearDI === 'Yes' ? 'selected' : ''}>Yes</option>
                                <option value="No" ${member.details.firstYearDI === 'No' ? 'selected' : ''}>No</option>
                            </select>
                        </div>
                    ` : ''}
                    ${member.details.firstGF !== undefined ? `
                        <div class="detail-row">
                            <span class="detail-label">First Global Finals:</span>
                            <span class="detail-value">${member.details.firstGF}</span>
                            <select class="form-select detail-input" style="display: none;" disabled>
                                <option value="Yes" ${member.details.firstGF === 'Yes' ? 'selected' : ''}>Yes</option>
                                <option value="No" ${member.details.firstGF === 'No' ? 'selected' : ''}>No</option>
                            </select>
                        </div>
                    ` : ''}
                    <div class="modal-footer" style="display: none;">
                        <button type="button" class="btn btn-secondary" onclick="cancelEdit(this)">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    return modal;
}

function toggleEdit(button) {
    const modal = button.closest('.member-modal');
    const form = modal.querySelector('.member-details');
    const values = form.querySelectorAll('.detail-value');
    const inputs = form.querySelectorAll('.detail-input');
    const footer = form.querySelector('.modal-footer');
    
    values.forEach(v => v.style.display = 'none');
    inputs.forEach(input => {
        input.style.display = 'block';
        input.disabled = false;
    });
    footer.style.display = 'flex';
    button.style.display = 'none';
}

function cancelEdit(button) {
    const modal = button.closest('.member-modal');
    const form = modal.querySelector('.member-details');
    const values = form.querySelectorAll('.detail-value');
    const inputs = form.querySelectorAll('.detail-input');
    const footer = form.querySelector('.modal-footer');
    const editBtn = modal.querySelector('.edit-btn');
    
    values.forEach(v => v.style.display = 'block');
    inputs.forEach(input => {
        input.style.display = 'none';
        input.disabled = true;
    });
    footer.style.display = 'none';
    editBtn.style.display = 'block';
}

function saveChanges(event, memberName) {
    event.preventDefault();
    const form = event.target;
    const modal = form.closest('.member-modal');
    const inputs = form.querySelectorAll('.detail-input');
    const member = findMemberByName(memberName);
    
    inputs.forEach(input => {
        const row = input.closest('.detail-row');
        const label = row.querySelector('.detail-label').textContent.slice(0, -1).toLowerCase();
        const value = input.value;
        
        // Update the member data
        if (label === 'role') {
            member.details.role = value;
        } else if (label === 'pronouns') {
            member.details.pronouns = value;
        } else if (label === 'age') {
            member.details.age = value;
        } else if (label === 'first year of di') {
            member.details.firstYearDI = value;
        } else if (label === 'first global finals') {
            member.details.firstGF = value;
        }
        
        // Update the displayed value
        const valueSpan = row.querySelector('.detail-value');
        valueSpan.textContent = value;
    });
    
    // Return to view mode
    cancelEdit(form.querySelector('.btn-secondary'));
}

function closeModal(button) {
    const modal = button.closest('.member-modal');
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
}
