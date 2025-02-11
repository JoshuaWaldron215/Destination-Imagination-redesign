// Move memberData to the top level and make it a global variable
window.memberData = {
    managers: [
        {
            id: '1',
            name: 'Michael McQuaid',
            status: 'signed',
            details: {
                teamNumber: '1',
                pronouns: 'He/him',
                firstYearDI: 'No',
                firstGF: 'No',
                DIAlum: 'Yes',
                certification: 'Yes',
                role: 'Team Manager'
            }
        }
    ],
    participants: [
        {
            id: '2',
            name: 'Cache Hickman',
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
            id: '3',
            name: 'Haven Edwards',
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
            id: '4',
            name: 'Nancy Carol McQuaid',
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
            id: '5',
            name: 'Kendall Ingram',
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
            id: '6',
            name: 'Emmaline Phipps',
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
            id: '7',
            name: 'Sophie Moseley',
            status: 'signed',
            details: {
                pronouns: 'They/them',
                age: '16 yrs',
                firstYearDI: 'No',
                firstGF: 'Yes',
                role: 'Participant'
            }
        },
        {
            id: '8',
            name: 'Gabriel Garrison',
            status: 'pending',
            details: {
                pronouns: '',
                age: '',
                firstYearDI: '',
                firstGF: '',
                role: 'Participant'
            }
        }
    ],
    spectators: [
        {
            id: '9',
            name: 'Elizabeth McQuaid',
            status: 'signed',
            details: {
                pronouns: 'I prefer not to answer',
                age: 'over 18',
                role: 'Spectator'
            }
        },
        {
            id: '10',
            name: 'Amy Ingram',
            status: 'signed',
            details: {
                pronouns: 'I prefer not to answer',
                age: 'over 18',
                role: 'Spectator'
            }
        },
        {
            id: '11',
            name: 'Paris Turner',
            status: 'signed',
            details: {
                pronouns: 'I prefer not to answer',
                age: 'over 18',
                role: 'Spectator'
            }
        },
        {
            id: '12',
            name: 'Donnie Edwards',
            status: 'signed',
            details: {
                pronouns: 'I prefer not to answer',
                age: 'over 18',
                role: 'Spectator'
            }
        },
        {
            id: '13',
            name: 'Carl Edwards',
            status: 'signed',
            details: {
                pronouns: 'I prefer not to answer',
                age: 'over 18',
                role: 'Spectator'
            }
        },
        {
            id: '14',
            name: 'Autumn Turner',
            status: 'signed',
            details: {
                pronouns: 'I prefer not to answer',
                age: 'over 18',
                role: 'Spectator'
            }
        },
        {
            id: '15',
            name: 'Pallavi Garg',
            status: 'signed',
            details: {
                pronouns: 'I prefer not to answer',
                age: 'over 18',
                role: 'Spectator'
            }
        },
        {
            id: '16',
            name: 'Virendra Garg',
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

    // Initialize Bootstrap components
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    if (tooltipTriggerList.length > 0) {
        [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }

    // Initialize the attendees view if we're on that tab
    const attendeesTab = document.querySelector('#attendees-forms');
    if (attendeesTab) {
        console.log("Initializing attendees view...");
        initializeAttendeesView();
    }

    initializeControls();

    // Ensure members have IDs
    ['managers', 'participants', 'spectators'].forEach(category => {
        window.memberData[category]?.forEach((member, index) => {
            if (!member.id) {
                member.id = `${category}-${index + 1}`;
            }
        });
    });
    
    // Load initial data
    loadMembers(getCurrentCategory());

    initializeThemeToggle();
});

function initializeAttendeesView() {
    // Initialize category handlers
    initializeCategoryHandlers();
    
    // Initialize search
    initializeSearch();
    
    // Initialize bulk actions
    initializeBulkActions();
    
    // Initialize keyboard navigation
    initializeKeyboardNavigation();
    
    // Load initial data for 'all' category
    loadMembers('all');
}

function initializeCategoryHandlers() {
    const categoryItems = document.querySelectorAll('.category-item');
    if (!categoryItems.length) {
        console.warn('No category items found');
        return;
    }

    categoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Category clicked:", this.dataset.category);

            // Remove active class from all categories
            categoryItems.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked category
            this.classList.add('active');
            
            // Load members for this category
            const category = this.dataset.category;
            loadMembers(category);
        });
    });
}

function loadMembers(category) {
    console.log("Loading members for category:", category);
    const members = getMembersByCategory(category);
    
    // Find the container based on screen size
    const container = window.innerWidth > 800 ? 
        document.querySelector('.table-body') : 
        document.querySelector('.member-card-view');
    
    if (!container) {
        console.error('Member content container not found');
        return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    // Render members
    if (window.innerWidth > 800) {
        container.innerHTML = renderTable(members);
    } else {
        members.forEach(member => {
            container.insertAdjacentHTML('beforeend', renderCard(member));
        });
    }
    
    // Initialize handlers for the new elements
    initializeMemberHandlers();
}

function getMembersByCategory(category) {
    // Ensure memberData exists
    if (!window.memberData) {
        console.error('Member data not found');
        return [];
    }

    try {
        if (category === 'all') {
            return [
                ...window.memberData.managers,
                ...window.memberData.participants,
                ...window.memberData.spectators
            ];
        }
        return window.memberData[category] || [];
    } catch (error) {
        console.error('Error getting members:', error);
        return [];
    }
}

function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    if (!searchInput) {
        console.warn('Search input not found');
        return;
    }

    searchInput.addEventListener('input', debounce(function(e) {
        const searchTerm = e.target.value.toLowerCase();
        filterMembers(searchTerm);
    }, 300));
}

function initializeBulkActions() {
    const selectAll = document.querySelector('.select-all');
    if (!selectAll) {
        console.warn('Select all checkbox not found');
        return;
    }

    selectAll.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.member-checkbox');
        checkboxes.forEach(checkbox => checkbox.checked = this.checked);
        updateSelectedCount();
    });

    // Initialize individual checkbox handlers
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('member-checkbox')) {
            updateSelectedCount();
        }
    });
}

function updateSelectedCount() {
    const selectedCount = document.querySelectorAll('.member-checkbox:checked').length;
    const bulkActionsBar = document.querySelector('.bulk-actions-bar');
    const countDisplay = document.querySelector('.selected-count');
    
    if (!bulkActionsBar || !countDisplay) {
        console.warn('Bulk actions elements not found');
        return;
    }
    
    if (selectedCount > 0) {
        bulkActionsBar.classList.add('visible');
        countDisplay.textContent = `${selectedCount} selected`;
    } else {
        bulkActionsBar.classList.remove('visible');
    }
}

// Add error handling to existing functions
function initializeMemberHandlers() {
    try {
        // Initialize inline editing for table view
        document.querySelectorAll('.editable-field').forEach(field => {
            field.addEventListener('click', handleEditableFieldClick);
        });
        
        // Initialize card view handlers
        document.querySelectorAll('.member-card input').forEach(input => {
            input.addEventListener('change', handleCardInputChange);
        });
        
        // Initialize save buttons
        document.querySelectorAll('.save-btn').forEach(btn => {
            btn.addEventListener('click', handleSaveClick);
        });
    } catch (error) {
        console.error('Error initializing member handlers:', error);
    }
}

function handleEditableFieldClick(e) {
    const currentValue = this.textContent;
    const fieldType = this.dataset.field;
    
    const input = document.createElement('input');
    input.type = fieldType === 'email' ? 'email' : 'text';
    input.value = currentValue;
    input.className = 'form-control form-control-sm';
    
    this.replaceWith(input);
    input.focus();
    
    input.addEventListener('blur', handleInputBlur);
}

function handleInputBlur() {
    const span = document.createElement('span');
    span.className = 'editable-field';
    span.dataset.field = this.dataset.field;
    span.textContent = this.value;
    this.replaceWith(span);
    
    // Trigger save
    const row = span.closest('.member-row');
    if (row) {
        autoSaveChanges(row);
    }
}

function handleCardInputChange(e) {
    const card = e.target.closest('.member-card');
    if (card) {
        autoSaveChanges(card);
    }
}

function handleSaveClick(e) {
    const container = e.target.closest('.member-row, .member-card');
    if (container) {
        autoSaveChanges(container);
    }
}

// Update filterMembers with error handling
function filterMembers(searchTerm) {
    try {
        const members = document.querySelectorAll('.member-row, .member-card');
        members.forEach(member => {
            const nameElement = member.querySelector('[data-field="name"]');
            const emailElement = member.querySelector('[data-field="email"]');
            
            const name = nameElement ? nameElement.textContent || nameElement.value : '';
            const email = emailElement ? emailElement.textContent || emailElement.value : '';
            
            const matches = name.toLowerCase().includes(searchTerm) || 
                           email.toLowerCase().includes(searchTerm);
            member.style.display = matches ? '' : 'none';
        });
    } catch (error) {
        console.error('Error filtering members:', error);
    }
}

// Main table rendering function
function renderTable(members) {
    return `
        <div class="table-container">
            <div class="table-scroll">
                <div class="table-wrapper">
                    ${renderTableHeader()}
                    ${members.map(member => renderMemberRow(member)).join('')}
                </div>
            </div>
            ${renderEmailInput()}
        </div>
    `;
}

function renderEmailInput() {
    return `
        <div class="email-input-section">
          
        </div>
    `;
}

// Header rendering function
function renderTableHeader() {
    return `
        <div class="table-header">
            <div class="header-cell">Name</div>
            <div class="header-cell">Email</div>
            <div class="header-cell">First Year DI?</div>
            <div class="header-cell">First GF?</div>
            <div class="header-cell">DI Alum?</div>
            <div class="header-cell">Status</div>
        </div>
    `;
}

// Member row rendering function
function renderMemberRow(member) {
    return `
        <div class="member-row">
            <div class="cell name-cell">
                <div class="name-wrapper">
                    <input type="checkbox" 
                           class="form-check-input member-check" 
                           ${member.selected ? 'checked' : ''}
                           onchange="updateSelection(this, '${member.id}')"
                           id="check-${member.id}">
                    <div class="editable" onclick="makeEditable(this)" data-field="name">
                        <span class="content">${member.name}</span>
                    </div>
                </div>
            </div>
            <div class="cell email-cell">
                <div class="email-input-wrapper">
                    <input type="email" 
                           class="email-input" 
                           value="${member.email || ''}" 
                           placeholder="Enter email"
                           onchange="updateEmail(this, '${member.id}')">
                    <div class="email-actions">
                        <button class="action-icon" onclick="sendEmail('${member.email}')" 
                                title="Send email">
                            <i class="fas fa-envelope"></i>
                        </button>
                        <button class="action-icon" onclick="copyEmail('${member.email}')"
                                title="Copy email">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="cell">
                <select class="form-select-sm" onchange="updateField(this, 'firstYearDI')">
                    <option value="yes" ${member.firstYearDI ? 'selected' : ''}>Yes</option>
                    <option value="no" ${!member.firstYearDI ? 'selected' : ''}>No</option>
                </select>
            </div>
            <div class="cell">
                <select class="form-select-sm" onchange="updateField(this, 'firstGF')">
                    <option value="yes" ${member.firstGF ? 'selected' : ''}>Yes</option>
                    <option value="no" ${!member.firstGF ? 'selected' : ''}>No</option>
                </select>
            </div>
            <div class="cell">
                <select class="form-select-sm" onchange="updateField(this, 'DIAlum')">
                    <option value="yes" ${member.DIAlum ? 'selected' : ''}>Yes</option>
                    <option value="no" ${!member.DIAlum ? 'selected' : ''}>No</option>
                </select>
            </div>
            <div class="cell">
                <span class="status-badge ${member.status === 'signed' ? 'signed' : 'pending'}">
                    ${member.status === 'signed' ? 'Signed' : 'Pending'}
                </span>
            </div>
        </div>
    `;
}

function updateEmail(input, memberId) {
    const email = input.value.trim();
    // Here you would typically save to your backend
    console.log(`Updating email for member ${memberId} to:`, email);
}

function autoSaveChanges(row) {
    const memberId = row.dataset.memberId;
    const fields = row.querySelectorAll('input, select');
    const updates = {};
    
    fields.forEach(field => {
        if (field.dataset.field) {
            updates[field.dataset.field] = field.value;
        }
    });
    
    // Here you would send the updates to your backend
    console.log('Saving updates for member', memberId, updates);
    
    // Show a success indicator
    const saveBtn = row.querySelector('.save-btn');
    saveBtn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
        saveBtn.style.display = 'none';
        saveBtn.innerHTML = '<i class="fas fa-save"></i>';
    }, 1500);
}

// Helper functions
function findMemberByName(name) {
    for (const category of ['managers', 'participants', 'spectators']) {
        const member = memberData[category].find(m => m.name === name);
        if (member) return member;
    }
    return null;
}

function sendEmail(email) {
    if (!email) return;
    window.location.href = `mailto:${email}`;
}

function copyEmail(email) {
    if (!email) return;
    navigator.clipboard.writeText(email).then(() => {
        showToast('Success', 'Email copied to clipboard');
    }).catch(() => {
        showToast('Error', 'Failed to copy email');
    });
}

// Placeholder page handler
function showPlaceholderPage(pageName) {
    console.log(`Navigating to ${pageName}`);
    // Implement actual navigation logic
}

// Category handling
function handleCategoryClick(category) {
    console.log(`Category clicked: ${category}`);
    // Implement category filtering logic
}

// Theme toggle
function handleThemeToggle() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    console.log('Theme toggle clicked');
}

// Initialize bulk actions
function initializeBulkActions() {
    const selectAllCheckbox = document.querySelector('.select-all-checkbox');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function(e) {
            const checkboxes = document.querySelectorAll('.member-row input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = e.target.checked;
                toggleRowSelection(checkbox);
            });
            updateBulkActionState();
        });
    }
}

function toggleRowSelection(checkbox) {
    const row = checkbox.closest('.member-row');
    if (row) {
        row.classList.toggle('selected', checkbox.checked);
        updateBulkActionState();
    }
}

function updateBulkActionState() {
    const selectedCount = document.querySelectorAll('.member-row.selected').length;
    const countElement = document.querySelector('.selected-count');
    if (countElement) {
        countElement.textContent = `(${selectedCount} selected)`;
    }
    
    const bulkActions = document.querySelectorAll('.bulk-actions button, .bulk-actions select');
    bulkActions.forEach(action => {
        action.disabled = selectedCount === 0;
    });
}

// Error handling wrapper
function handleError(fn) {
    return function(...args) {
        try {
            return fn.apply(this, args);
        } catch (error) {
            console.error('An error occurred:', error);
            // Implement error notification to user if needed
        }
    };
}

// Initialize filters and bulk actions
function initializeControls() {
    // Initialize search for both mobile and desktop
    const searchInputs = document.querySelectorAll('.mobile-search input, .search-box input');
    searchInputs.forEach(input => {
        input.addEventListener('input', debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterMembers(searchTerm);
            
            // Sync other search input
            searchInputs.forEach(otherInput => {
                if (otherInput !== e.target) {
                    otherInput.value = e.target.value;
                }
            });
        }, 300));
    });

    // Initialize filter buttons
    const filterButtons = document.querySelectorAll('.mobile-actions .btn-outline-primary, .toolbar-right .btn-outline-primary');
    filterButtons.forEach(button => {
        button.addEventListener('click', showFilterOptions);
    });

    // Initialize add member buttons
    const addButtons = document.querySelectorAll('.mobile-actions .btn-primary, .toolbar-right .btn-primary');
    addButtons.forEach(button => {
        button.addEventListener('click', showAddMemberForm);
    });
}

function showFilterOptions() {
    // Implement filter options modal/popup
    const filterOptions = `
        <div class="filter-options">
            <div class="mb-3">
                <label class="form-label">Role</label>
                <select class="form-select" multiple>
                    <option value="manager">Team Manager</option>
                    <option value="participant">Participant</option>
                    <option value="spectator">Spectator</option>
                </select>
            </div>
            <div class="mb-3">
                <label class="form-label">Status</label>
                <select class="form-select" multiple>
                    <option value="signed">Signed</option>
                    <option value="pending">Pending</option>
                    <option value="incomplete">Incomplete</option>
                </select>
            </div>
        </div>
    `;

    const modalBody = document.querySelector('#memberDetailsModal .modal-body');
    modalBody.innerHTML = filterOptions;
    
    const modal = new bootstrap.Modal(document.getElementById('memberDetailsModal'));
    modal.show();
}

function showAddMemberForm() {
    // Implement add member form modal
    const addMemberForm = `
        <form id="addMemberForm">
            <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Role</label>
                <select class="form-select" required>
                    <option value="">Select role...</option>
                    <option value="manager">Team Manager</option>
                    <option value="participant">Participant</option>
                    <option value="spectator">Spectator</option>
                </select>
            </div>
            <!-- Add other relevant fields -->
        </form>
    `;

    const modalBody = document.querySelector('#memberDetailsModal .modal-body');
    modalBody.innerHTML = addMemberForm;
    
    const modal = new bootstrap.Modal(document.getElementById('memberDetailsModal'));
    modal.show();
}

// Filter members based on search and filters
function filterMembers() {
    const searchTerm = document.querySelector('.search-box input').value.toLowerCase();
    const roleFilter = document.querySelector('#roleFilter').value;
    const statusFilter = document.querySelector('#statusFilter').value;

    const memberRows = document.querySelectorAll('.member-row');
    memberRows.forEach(row => {
        const name = row.querySelector('.member-name').textContent.toLowerCase();
        const role = row.getAttribute('data-role');
        const status = row.getAttribute('data-status');

        const matchesSearch = name.includes(searchTerm);
        const matchesRole = roleFilter === 'all' || role === roleFilter;
        const matchesStatus = statusFilter === 'all' || status === statusFilter;

        row.style.display = matchesSearch && matchesRole && matchesStatus ? '' : 'none';
    });
}

// Save all changes
function saveAllChanges() {
    const editedRows = document.querySelectorAll('.member-row.edited');
    if (editedRows.length === 0) return;

    const saveButton = document.querySelector('.save-changes');
    saveButton.disabled = true;
    saveButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

    // Simulate saving (replace with actual API call)
    setTimeout(() => {
        editedRows.forEach(row => row.classList.remove('edited'));
        saveButton.disabled = false;
        saveButton.innerHTML = '<i class="fas fa-save"></i> Save Changes';
        
        // Show success message
        showToast('Changes saved successfully!', 'success');
    }, 1000);
}

// Column sorting functionality
function initializeColumnSorting() {
    const headers = document.querySelectorAll('.member-table-header [data-sort]');
    headers.forEach(header => {
        header.addEventListener('click', () => handleColumnSort(header));
        // Add sort icons
        header.innerHTML += '<i class="fas fa-sort sort-icon"></i>';
    });
}

function handleColumnSort(header) {
    const column = header.dataset.sort;
    const currentDirection = header.dataset.direction || 'none';
    const newDirection = getNextSortDirection(currentDirection);
    
    // Reset all other headers
    document.querySelectorAll('.member-table-header [data-sort]').forEach(h => {
        if (h !== header) {
            h.dataset.direction = 'none';
            h.querySelector('.sort-icon').className = 'fas fa-sort sort-icon';
        }
    });
    
    // Update current header
    header.dataset.direction = newDirection;
    updateSortIcon(header, newDirection);
    
    // Sort the rows
    sortRows(column, newDirection);
}

function getNextSortDirection(current) {
    const order = ['none', 'asc', 'desc'];
    const currentIndex = order.indexOf(current);
    return order[(currentIndex + 1) % order.length];
}

function updateSortIcon(header, direction) {
    const icon = header.querySelector('.sort-icon');
    icon.className = 'fas sort-icon ' + 
        (direction === 'asc' ? 'fa-sort-up' : 
         direction === 'desc' ? 'fa-sort-down' : 
         'fa-sort');
}

function sortRows(column, direction) {
    const tbody = document.querySelector('.member-rows');
    const rows = Array.from(tbody.querySelectorAll('.member-row'));
    
    if (direction === 'none') {
        // Reset to original order using data-index
        rows.sort((a, b) => 
            parseInt(a.dataset.index) - parseInt(b.dataset.index)
        );
    } else {
        rows.sort((a, b) => {
            let aVal = a.querySelector(`.member-${column}`).textContent.trim();
            let bVal = b.querySelector(`.member-${column}`).textContent.trim();
            
            // Handle numeric values
            if (!isNaN(aVal) && !isNaN(bVal)) {
                aVal = parseFloat(aVal);
                bVal = parseFloat(bVal);
            }
            
            if (direction === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });
    }
    
    // Reorder the DOM
    rows.forEach(row => tbody.appendChild(row));
}

// Keyboard navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.target.matches('input, select')) {
            const currentRow = e.target.closest('.member-row');
            if (!currentRow) return;
            
            if (e.key === 'Enter' || e.key === 'Tab') {
                const nextRow = currentRow.nextElementSibling;
                if (nextRow) {
                    const nextInput = nextRow.querySelector(`[data-field="${e.target.dataset.field}"]`);
                    if (nextInput) {
                        nextInput.focus();
                        e.preventDefault();
                    }
                }
            }
        }
    });
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Update the table header in the HTML
function updateTableHeader() {
    const tableHeader = document.querySelector('.table-header');
    if (!tableHeader) return;

    tableHeader.innerHTML = `
        <div class="header-cell checkbox-cell">
            <input type="checkbox" class="select-all" aria-label="Select all">
        </div>
        <div class="header-cell name-cell">Name</div>
        <div class="header-cell email-cell">Email</div>
        <div class="header-cell pronouns-cell">Pronouns</div>
        <div class="header-cell firstyear-cell">First Year DI?</div>
        <div class="header-cell firstgf-cell">First GF?</div>
        <div class="header-cell status-cell">Status</div>
        <div class="header-cell actions-cell">Actions</div>
    `;
}

// Add event listeners for inline editing
function initializeInlineEditing() {
    document.querySelectorAll('.member-row input, .member-row select').forEach(field => {
        field.addEventListener('change', function() {
            const row = this.closest('.member-row');
            const saveBtn = row.querySelector('.save-btn');
            saveBtn.style.display = 'inline-block';
            
            // Auto-save changes
            autoSaveChanges(row);
        });
    });
}

function autoSaveChanges(row) {
    const memberId = row.dataset.memberId;
    const fields = row.querySelectorAll('input, select');
    const updates = {};
    
    fields.forEach(field => {
        if (field.dataset.field) {
            updates[field.dataset.field] = field.value;
        }
    });
    
    // Here you would send the updates to your backend
    console.log('Saving updates for member', memberId, updates);
    
    // Show a success indicator
    const saveBtn = row.querySelector('.save-btn');
    saveBtn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
        saveBtn.style.display = 'none';
        saveBtn.innerHTML = '<i class="fas fa-save"></i>';
    }, 1500);
}

// Add the modal HTML to your page
function addMobileModal() {
    const modalHTML = `
        <div class="modal fade" id="memberDetailsModal" tabindex="-1">
            <div class="modal-dialog modal-fullscreen-sm-down">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Member Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Form fields will be injected here -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="saveMemberDetails()">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Function to show member details in modal
function showMemberDetails(memberId) {
    const member = findMemberById(memberId);
    if (!member) return;

    // For mobile devices, show slide-up panel
    if (window.innerWidth <= 800) {
        showMobileEditPanel(member);
    } else {
        showDesktopModal(member);
    }
}

// Mobile edit functionality
function showMobileEditPanel(memberId) {
    console.log('Showing edit panel for member:', memberId);
    const member = findMemberById(memberId);
    
    if (!member) {
        console.error('Member not found:', memberId);
        return;
    }

    const memberData = {
        name: member.name,
        email: member.email || '',
        role: member.details?.role || member.role || 'Spectator',
        pronouns: member.details?.pronouns || member.pronouns || '',
        firstYearDI: member.details?.firstYearDI || member.firstYearDI || 'No',
        firstGF: member.details?.firstGF || member.firstGF || 'No',
        DIAlum: member.details?.DIAlum || member.DIAlum || 'No'
    };

    const editPanelHTML = `
        <div class="mobile-edit-panel" id="mobileEditPanel">
            <div class="panel-drag-handle"></div>
            <div class="panel-header">
                <h3>Edit ${memberData.name}</h3>
                <button type="button" class="btn-close" onclick="closeMobileEditPanel()"></button>
            </div>
            <div class="panel-content">
                <form id="mobileEditForm" onsubmit="handleMobileEditSubmit(event, '${memberId}')">
                    <div class="edit-section">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" name="name" 
                                value="${memberData.name}" required>
                        </div>

                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" class="form-control" name="email" 
                                value="${memberData.email}" 
                                placeholder="Enter email">
                        </div>

                        <div class="form-group">
                            <label>Pronouns</label>
                            <select class="form-select" name="pronouns">
                                <option value="">Select pronouns...</option>
                                <option value="He/him" ${memberData.pronouns === 'He/him' ? 'selected' : ''}>He/him</option>
                                <option value="She/her" ${memberData.pronouns === 'She/her' ? 'selected' : ''}>She/her</option>
                                <option value="They/them" ${memberData.pronouns === 'They/them' ? 'selected' : ''}>They/them</option>
                                <option value="Prefer not to say" ${memberData.pronouns === 'Prefer not to say' ? 'selected' : ''}>Prefer not to say</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Role</label>
                            <select class="form-select" name="role">
                                <option value="Participant" ${memberData.role === 'Participant' ? 'selected' : ''}>Participant</option>
                                <option value="Spectator" ${memberData.role === 'Spectator' ? 'selected' : ''}>Spectator</option>
                                ${memberData.role === 'Team Manager' ? `
                                    <option value="Team Manager" selected>Team Manager</option>
                                ` : ''}
                            </select>
                        </div>

                        <div class="form-group">
                            <label>First Year DI?</label>
                            <div class="btn-group w-100" role="group">
                                <input type="radio" class="btn-check" name="firstYearDI" id="firstYearYes" value="Yes" 
                                    ${memberData.firstYearDI === 'Yes' ? 'checked' : ''}>
                                <label class="btn btn-outline-primary" for="firstYearYes">Yes</label>

                                <input type="radio" class="btn-check" name="firstYearDI" id="firstYearNo" value="No"
                                    ${memberData.firstYearDI === 'No' ? 'checked' : ''}>
                                <label class="btn btn-outline-primary" for="firstYearNo">No</label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>First GF?</label>
                            <div class="btn-group w-100" role="group">
                                <input type="radio" class="btn-check" name="firstGF" id="firstGFYes" value="Yes"
                                    ${memberData.firstGF === 'Yes' ? 'checked' : ''}>
                                <label class="btn btn-outline-primary" for="firstGFYes">Yes</label>

                                <input type="radio" class="btn-check" name="firstGF" id="firstGFNo" value="No"
                                    ${memberData.firstGF === 'No' ? 'checked' : ''}>
                                <label class="btn btn-outline-primary" for="firstGFNo">No</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>DI Alum?</label>
                            <div class="btn-group w-100" role="group">
                                <input type="radio" class="btn-check" name="DIAlum" id="DIAlumYes" value="Yes"
                                    ${memberData.DIAlum === 'Yes' ? 'checked' : ''}>
                                <label class="btn btn-outline-primary" for="DIAlumYes">Yes</label>

                                <input type="radio" class="btn-check" name="DIAlum" id="DIAlumNo" value="No"
                                    ${memberData.DIAlum === 'No' ? 'checked' : ''}>
                                <label class="btn btn-outline-primary" for="DIAlumNo">No</label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="panel-footer">
                <button type="button" class="btn btn-outline-secondary" onclick="closeMobileEditPanel()">Cancel</button>
                <button type="submit" form="mobileEditForm" class="btn btn-primary">Save Changes</button>
            </div>
        </div>
        <div class="mobile-edit-overlay" onclick="closeMobileEditPanel()"></div>
    `;

    // Remove any existing panels
    const existingPanel = document.getElementById('mobileEditPanel');
    if (existingPanel) {
        existingPanel.remove();
    }
    const existingOverlay = document.querySelector('.mobile-edit-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }

    document.body.insertAdjacentHTML('beforeend', editPanelHTML);

    requestAnimationFrame(() => {
        const panel = document.getElementById('mobileEditPanel');
        if (panel) {
            panel.classList.add('active');
            const overlay = document.querySelector('.mobile-edit-overlay');
            if (overlay) {
                overlay.classList.add('active');
            }
        }
    });
}

// Update the mobile edit panel save handler
async function handleMobileEditSubmit(event, memberId) {
    event.preventDefault();
    
    const form = event.target;
    // Find the submit button correctly from the panel footer
    const submitButton = document.querySelector('#mobileEditPanel .panel-footer button[type="submit"]');
    
    if (!submitButton) {
        console.error('Submit button not found');
        return;
    }

    try {
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Saving...';

        const formData = new FormData(form);
        const updates = Object.fromEntries(formData.entries());

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Update member data
        const member = findMemberById(memberId);
        if (member) {
            // Update both top-level and details properties
            Object.assign(member, updates);
            if (member.details) {
                Object.assign(member.details, updates);
            }
            
            // Show success message
            showToast('Changes saved successfully!');
            
            // Close panel and refresh view
            setTimeout(() => {
                closeMobileEditPanel();
                
                // Update the card in the DOM without full reload
                const card = document.querySelector(`.member-card[data-member-id="${memberId}"]`);
                if (card) {
                    card.outerHTML = renderCard(member);
                } else {
                    // If card not found, refresh the whole list
                    loadMembers(getCurrentCategory());
                }
            }, 500);
        } else {
            throw new Error('Member not found');
        }
    } catch (error) {
        console.error('Error saving changes:', error);
        showToast('Error saving changes', 'error');
        
        // Reset button state
        submitButton.disabled = false;
        submitButton.innerHTML = 'Save Changes';
    }
}

// Update close button functionality
function closeMobileEditPanel() {
    const panel = document.querySelector('.mobile-edit-panel');
    const overlay = document.querySelector('.mobile-edit-overlay');
    
    if (!panel || !overlay) return;

    // Start closing animation
    panel.style.transform = 'translateY(100%)';
    overlay.style.opacity = '0';

    // Remove elements after animation
    setTimeout(() => {
        panel.remove();
        overlay.remove();
    }, 300);
}

// Helper function to get current category
function getCurrentCategory() {
    const activeCategory = document.querySelector('.category-item.active');
    return activeCategory ? activeCategory.dataset.category : 'all';
}

// Helper function to find member by ID
function findMemberById(memberId) {
    if (!memberId) return null;
    
    const searchId = memberId.toString();
    
    for (const category of ['managers', 'participants', 'spectators']) {
        const found = window.memberData[category]?.find(m => 
            (m.id?.toString() === searchId) || (m.name === searchId)
        );
        if (found) return found;
    }
    
    return null;
}

// Add this function to handle member options
function showMemberOptions(memberId) {
    const options = [
        { label: 'Send Email', icon: 'fa-envelope', action: () => sendEmail(memberId) },
        { label: 'View Forms', icon: 'fa-file-alt', action: () => viewForms(memberId) },
        { label: 'Remove Member', icon: 'fa-trash', action: () => removeMember(memberId), class: 'text-danger' }
    ];

    const optionsHTML = `
        <div class="list-group">
            ${options.map(option => `
                <button class="list-group-item list-group-item-action ${option.class || ''}" 
                        onclick="(${option.action.toString()})('${memberId}')">
                    <i class="fas ${option.icon} me-2"></i>
                    ${option.label}
                </button>
            `).join('')}
        </div>
    `;

    const modalBody = document.querySelector('#memberDetailsModal .modal-body');
    modalBody.innerHTML = optionsHTML;
    
    const modal = new bootstrap.Modal(document.getElementById('memberDetailsModal'));
    modal.show();
}

function renderCard(member) {
    const initials = member.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();

    return `
        <div class="member-card" data-member-id="${member.id || ''}">
            <div class="member-header">
                <div class="member-avatar">${initials}</div>
                <div class="member-primary">
                    <div class="member-name">${member.name}</div>
                    <div class="member-email">${member.email || 'No email provided'}</div>
                </div>
                <div class="status-badge ${member.status.toLowerCase()}">
                    <i class="fas ${member.status === 'signed' ? 'fa-check-circle' : 'fa-clock'}"></i>
                    ${member.status}
                </div>
            </div>

            <div class="quick-actions">
                <button class="quick-action-btn" onclick="handleEditClick('${member.id || ''}')">
                    <i class="fas fa-edit"></i>
                    <span>Edit</span>
                </button>
                <button class="quick-action-btn" onclick="sendEmail('${member.email}')">
                    <i class="fas fa-envelope"></i>
                    <span>Email</span>
                </button>
                <button class="quick-action-btn" onclick="copyToClipboard('${member.email}')">
                    <i class="fas fa-copy"></i>
                    <span>Copy</span>
                </button>
                <button class="quick-action-btn" onclick="showMemberOptions('${member.id}')">
                    <i class="fas fa-ellipsis-v"></i>
                    <span>More</span>
                </button>
            </div>

            <div class="member-details">
                <div class="detail-item">
                    <div class="detail-label">Pronouns</div>
                    <div class="detail-value">${member.pronouns || 'Not specified'}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">First Year DI?</div>
                    <div class="detail-value">${member.firstYearDI}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">First GF?</div>
                    <div class="detail-value">${member.firstGF}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">DI Alum?</div>
                    <div class="detail-value">${member.DIAlum}</div>
                </div>
            </div>
        </div>
    `;
}

// Function to handle mobile edit button click
function openMobileEdit(memberId) {
    console.log('Edit clicked for member:', memberId);
    if (!memberId) {
        console.error('No member ID provided');
        return;
    }
    showMobileEditPanel(memberId);
}

// Function to save mobile edits
async function saveMobileEdit(event, memberId) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Saving...';

    try {
        const formData = new FormData(form);
        const updates = Object.fromEntries(formData.entries());
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success';
        successMessage.textContent = 'Changes saved successfully!';
        form.querySelector('.edit-body').insertBefore(successMessage, form.querySelector('.form-group'));

        // Close form after delay
        setTimeout(() => {
            closeMobileEdit();
            // Refresh the member list
            loadMembers(getCurrentCategory());
        }, 1500);

    } catch (error) {
        console.error('Error saving changes:', error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'alert alert-danger';
        errorMessage.textContent = 'Error saving changes. Please try again.';
        form.querySelector('.edit-body').insertBefore(errorMessage, form.querySelector('.form-group'));
        
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = 'Save Changes';
    }
}

// Function to close mobile edit form
function closeMobileEdit() {
    const container = document.querySelector('.mobile-edit-container');
    if (container) {
        container.classList.remove('active');
        setTimeout(() => container.remove(), 300);
    }
}

// Add toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Remove the toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease-out forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add function to handle successful updates
function handleSuccessfulUpdate(memberId) {
    showToast('Changes saved successfully!');
    
    // Find and update the card in the DOM
    const card = document.querySelector(`.member-card[data-member-id="${memberId}"]`);
    if (card) {
        const member = findMemberById(memberId);
        if (member) {
            card.outerHTML = renderCard(member);
        }
    }
}

// Add new function to handle edit click
function handleEditClick(memberId) {
    console.log('Edit clicked for member:', memberId);
    if (!memberId) {
        console.error('No member ID provided');
        return;
    }
    showMobileEditPanel(memberId);
}

// Update the toolbar with new button
function renderToolbar() {
    return `
        <div class="table-toolbar">
            <div class="toolbar-left">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search members...">
                </div>
            </div>
            <div class="toolbar-right">
                <button class="btn btn-primary" onclick="showEditAddMemberModal()">
                    <i class="fas fa-plus"></i> Edit/Add Member
                </button>
            </div>
        </div>
    `;
}

// Add the edit/add member modal functionality
function showEditAddMemberModal(memberId = null) {
    const isEdit = memberId !== null;
    const member = isEdit ? findMemberById(memberId) : null;
    
    const modalContent = `
        <div class="modal fade" id="editAddMemberModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${isEdit ? 'Edit' : 'Add'} Member</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editAddMemberForm">
                            <div class="mb-3">
                                <label class="form-label">Name</label>
                                <input type="text" class="form-control" name="name" 
                                    value="${member?.name || ''}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" name="email" 
                                    value="${member?.email || ''}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">First Year DI?</label>
                                <div class="btn-group w-100">
                                    <input type="radio" class="btn-check" name="firstYearDI" 
                                        id="firstYearYes" value="Yes" ${member?.firstYearDI ? 'checked' : ''}>
                                    <label class="btn btn-outline-primary" for="firstYearYes">Yes</label>
                                    <input type="radio" class="btn-check" name="firstYearDI" 
                                        id="firstYearNo" value="No" ${member?.firstYearDI === false ? 'checked' : ''}>
                                    <label class="btn btn-outline-primary" for="firstYearNo">No</label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">First GF?</label>
                                <div class="btn-group w-100">
                                    <input type="radio" class="btn-check" name="firstGF" 
                                        id="firstGFYes" value="Yes" ${member?.firstGF ? 'checked' : ''}>
                                    <label class="btn btn-outline-primary" for="firstGFYes">Yes</label>
                                    <input type="radio" class="btn-check" name="firstGF" 
                                        id="firstGFNo" value="No" ${member?.firstGF === false ? 'checked' : ''}>
                                    <label class="btn btn-outline-primary" for="firstGFNo">No</label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">DI Alum?</label>
                                <div class="btn-group w-100">
                                    <input type="radio" class="btn-check" name="DIAlum" 
                                        id="diAlumYes" value="Yes" ${member?.DIAlum ? 'checked' : ''}>
                                    <label class="btn btn-outline-primary" for="diAlumYes">Yes</label>
                                    <input type="radio" class="btn-check" name="DIAlum" 
                                        id="diAlumNo" value="No" ${member?.DIAlum === false ? 'checked' : ''}>
                                    <label class="btn btn-outline-primary" for="diAlumNo">No</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="saveEditAddMember(${isEdit ? `'${memberId}'` : 'null'})">
                            ${isEdit ? 'Save Changes' : 'Add Member'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove any existing modal
    const existingModal = document.getElementById('editAddMemberModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add new modal to the page
    document.body.insertAdjacentHTML('beforeend', modalContent);

    // Initialize and show the modal
    const modal = new bootstrap.Modal(document.getElementById('editAddMemberModal'));
    modal.show();
}

// Function to save/add member
async function saveEditAddMember(memberId = null) {
    const form = document.getElementById('editAddMemberForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    const submitButton = document.querySelector('#editAddMemberModal .btn-primary');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Saving...';

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message and close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('editAddMemberModal'));
        modal.hide();
        
        // Refresh the member list
        loadMembers(getCurrentCategory());
        
        // Show success toast
        showToast('Success', memberId ? 'Member updated successfully' : 'Member added successfully');
    } catch (error) {
        console.error('Error saving member:', error);
        showToast('Error', 'Failed to save member', 'error');
    }
}

// Add delete confirmation and handling
function confirmDelete(memberId) {
    if (confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
        deleteMember(memberId);
    }
}

async function deleteMember(memberId) {
    try {
        const deleteBtn = document.querySelector('.btn-delete');
        deleteBtn.disabled = true;
        deleteBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Deleting...';

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Show success message
        showToast('Success', 'Member deleted successfully');
        
        // Close panel and refresh
        closeMobileEditPanel();
        loadMembers(getCurrentCategory());
    } catch (error) {
        console.error('Error deleting member:', error);
        showToast('Error', 'Failed to delete member');
        
        // Reset button state
        deleteBtn.disabled = false;
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Delete';
    }
}

// Function to handle member updates
async function updateMember(memberId, field, value) {
    try {
        // Show loading indicator
        const cell = event.target.closest('.editable-cell');
        const originalContent = cell.innerHTML;
        cell.style.opacity = '0.5';

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // Update member data
        const member = findMemberById(memberId);
        if (member) {
            member[field] = value;
            showToast('Success', 'Updated successfully');
        }

        // Reset cell appearance
        cell.style.opacity = '1';
    } catch (error) {
        console.error('Error updating member:', error);
        showToast('Error', 'Failed to update', 'error');
        
        // Revert the change
        const member = findMemberById(memberId);
        if (member) {
            event.target.value = member[field];
        }
    }
}

// Add theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-bs-theme', newTheme);
        themeToggle.innerHTML = `<i class="fas fa-${newTheme === 'dark' ? 'sun' : 'moon'}"></i>`;
        
        // Save preference
        localStorage.setItem('theme-preference', newTheme);
    });
    
    document.body.appendChild(themeToggle);
    
    // Set initial theme
    const savedTheme = localStorage.getItem('theme-preference') || 'light';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    themeToggle.innerHTML = `<i class="fas fa-${savedTheme === 'dark' ? 'sun' : 'moon'}"></i>`;
}

// Inline editing functions
function makeEditable(element) {
    const field = element.dataset.field;
    const currentValue = element.textContent.trim();
    
    if (field === 'name') {
        element.innerHTML = `
            <input type="text" 
                   class="form-control form-control-sm" 
                   value="${currentValue}"
                   onblur="saveInlineEdit(this)"
                   onkeydown="handleEditKeydown(event, this)">
        `;
        element.querySelector('input').focus();
    }
}

function saveEdit(input, content, field) {
    const newValue = input.value.trim();
    content.textContent = newValue;
    input.parentElement.replaceChild(content, input);
    
    // Here you would typically save to your backend
    console.log(`Updating ${field} to:`, newValue);
}

function updateField(select, field) {
    const value = select.value === 'yes';
    // Here you would typically save to your backend
    console.log(`Updating ${field} to:`, value);
}

// Email handling functions
function sendBulkEmail() {
    const emailInput = document.getElementById('bulkEmail');
    const emails = emailInput.value.split(',').map(email => email.trim()).filter(Boolean);
    
    if (emails.length > 0) {
        window.location.href = `mailto:${emails.join(',')}`;
    } else {
        showToast('Error', 'Please enter at least one email address');
    }
}

function copyEmails() {
    const emailInput = document.getElementById('bulkEmail');
    navigator.clipboard.writeText(emailInput.value).then(() => {
        showToast('Success', 'Emails copied to clipboard');
    }).catch(() => {
        showToast('Error', 'Failed to copy emails');
    });
}

function updateSelection(checkbox, memberId) {
    const isChecked = checkbox.checked;
    // Here you would typically update your data/backend
    console.log(`Member ${memberId} selection updated to: ${isChecked}`);
}

// Section Management
function renderMainContent() {
    return `
        ${renderSectionTabs()}
        <div class="content-wrapper">
            <div id="team-manager" class="section active">
                ${renderTeamManagerSection()}
            </div>
            <div id="participants" class="section">
                ${renderParticipantsSection()}
            </div>
            <div id="spectators" class="section">
                ${renderSpectatorsSection()}
            </div>
        </div>
        ${renderBottomActions()}
    `;
}

function renderSectionTabs() {
    return `
        <div class="section-tabs">
            <button class="tab-btn active" onclick="switchSection('team-manager')">
                Team Manager(s)
            </button>
            <button class="tab-btn" onclick="switchSection('participants')">
                Participants <span class="count">(${participants.length})</span>
            </button>
            <button class="tab-btn" onclick="switchSection('spectators')">
                Spectator(s) <span class="count">(${spectators.length})</span>
            </button>
        </div>
    `;
}

// Quick Edit Table
function renderTeamManagerSection() {
    return `
        <div class="section-header">
            <h3>Team Manager(s)</h3>
            <div class="bulk-actions">
                <button class="btn btn-primary" onclick="saveAllChanges()">
                    <i class="fas fa-save"></i> Save All Changes
                </button>
                <button class="btn btn-outline-primary" onclick="addNewManager()">
                    <i class="fas fa-plus"></i> Add Manager
                </button>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th><input type="checkbox" onchange="selectAll(this)"></th>
                        <th>Name</th>
                        <th>Pronouns</th>
                        <th>First Year DI?</th>
                        <th>First GF?</th>
                        <th>DI Alum?</th>
                        <th>Certification</th>
                    </tr>
                </thead>
                <tbody>
                    ${renderManagerRows()}
                </tbody>
            </table>
        </div>
    `;
}

// Quick Actions
function renderQuickActions(member) {
    return `
        <div class="quick-actions">
            <button class="btn btn-sm btn-outline-primary" 
                    onclick="editMember('${member.id}')">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" 
                    onclick="removeMember('${member.id}')">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
}

// Form Validation
function validateForm(data) {
    const errors = [];
    
    if (!data.name?.trim()) {
        errors.push('Name is required');
    }
    
    if (data.email && !isValidEmail(data.email)) {
        errors.push('Invalid email format');
    }
    
    return errors;
}

// Auto-save functionality
let autoSaveTimeout;
function setupAutoSave(element, delay = 1000) {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
        saveChanges(element);
    }, delay);
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveAllChanges();
    }
    if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        toggleEditMode();
    }
});

// Toast Notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Remove the toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease-out forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Error Handling
function handleError(error, context) {
    console.error(`Error in ${context}:`, error);
    showToast(`An error occurred: ${error.message}`, 'error');
}

// Update the mobile row rendering
function renderMobileRow(member) {
    const initials = member.name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    return `
        <div class="mobile-member-row">
            <div class="mobile-member-header">
                <div class="avatar">${initials}</div>
                <h2>Name</h2>
                <div class="member-name">${member.name}</div>
            </div>

            <div class="mobile-fields">
                <div class="field-group">
                    <h2>Email</h2>
                    <div class="field-value">${member.email || 'No email provided'}</div>
                </div>

                <div class="field-group">
                    <h2>Pronouns</h2>
                    <div class="field-value">${member.pronouns || 'Not specified'}</div>
                </div>

                <div class="field-group">
                    <h2>Role</h2>
                    <div class="field-value">${member.role || 'Not specified'}</div>
                </div>

                <div class="field-group">
                    <h2>First Year DI?</h2>
                    <div class="field-value">${member.firstYearDI ? 'Yes' : 'No'}</div>
                </div>

                <div class="field-group">
                    <h2>First GF?</h2>
                    <div class="field-value">${member.firstGF ? 'Yes' : 'No'}</div>
                </div>

                <div class="field-group">
                    <h2>DI Alum?</h2>
                    <div class="field-value">${member.DIAlum === true ? 'Yes' : member.DIAlum === false ? 'No' : 'N/A'}</div>
                </div>
            </div>

            <div class="action-buttons">
                <button onclick="editMember(${member.id})">Edit</button>
                <button onclick="emailMember(${member.id})">Email</button>
                <button onclick="copyInfo(${member.id})">Copy</button>
                <button onclick="showMore(${member.id})">More</button>
            </div>
        </div>
    `;
}

function renderMobileEditForm(member) {
    return `
        <div class="mobile-edit-form">
            <div class="edit-field">
                <h2>Name</h2>
                <input type="text" value="${member.name}">
            </div>

            <div class="edit-field">
                <h2>Email</h2>
                <input type="email" value="${member.email || ''}">
            </div>

            <div class="edit-field">
                <h2>Pronouns</h2>
                <select>
                    <option value="">Select pronouns</option>
                    <option value="He/him" ${member.pronouns === 'He/him' ? 'selected' : ''}>He/him</option>
                    <option value="She/her" ${member.pronouns === 'She/her' ? 'selected' : ''}>She/her</option>
                    <option value="They/them" ${member.pronouns === 'They/them' ? 'selected' : ''}>They/them</option>
                </select>
            </div>

            <div class="edit-field">
                <h2>Role</h2>
                <select>
                    <option value="">Select role</option>
                    <option value="Team Manager" ${member.role === 'Team Manager' ? 'selected' : ''}>Team Manager</option>
                    <option value="Participant" ${member.role === 'Participant' ? 'selected' : ''}>Participant</option>
                </select>
            </div>

            <div class="edit-field">
                <h2>First Year DI?</h2>
                <select>
                    <option value="yes" ${member.firstYearDI ? 'selected' : ''}>Yes</option>
                    <option value="no" ${!member.firstYearDI ? 'selected' : ''}>No</option>
                </select>
            </div>

            <div class="edit-field">
                <h2>First GF?</h2>
                <select>
                    <option value="yes" ${member.firstGF ? 'selected' : ''}>Yes</option>
                    <option value="no" ${!member.firstGF ? 'selected' : ''}>No</option>
                </select>
            </div>

            <div class="edit-field">
                <h2>DI Alum?</h2>
                <select>
                    <option value="yes" ${member.DIAlum === true ? 'selected' : ''}>Yes</option>
                    <option value="no" ${member.DIAlum === false ? 'selected' : ''}>No</option>
                    <option value="na" ${member.DIAlum === null ? 'selected' : ''}>N/A</option>
                </select>
            </div>

            <div class="edit-actions">
                <button class="save-btn" onclick="saveMember(${member.id})">Save</button>
                <button class="cancel-btn" onclick="cancelEdit()">Cancel</button>
            </div>
        </div>
    `;
}

function renderMemberCardView(member) {
    return `
        <div class="member-card-view">
            <div class="field-group">
                <h2>Name</h2>
                <div class="field-value">${member.name}</div>
            </div>

            <div class="field-group">
                <h2>Email</h2>
                <div class="field-value">${member.email || 'No email provided'}</div>
            </div>

            <div class="field-group">
                <h2>Pronouns</h2>
                <div class="field-value">${member.pronouns || 'Not specified'}</div>
            </div>

            <div class="field-group">
                <h2>Role</h2>
                <div class="field-value">${member.role || 'Not specified'}</div>
            </div>

            <div class="field-group">
                <h2>First Year DI?</h2>
                <div class="field-value">${member.firstYearDI ? 'Yes' : 'No'}</div>
            </div>

            <div class="field-group">
                <h2>First GF?</h2>
                <div class="field-value">${member.firstGF ? 'Yes' : 'No'}</div>
            </div>

            <div class="field-group">
                <h2>DI Alum?</h2>
                <div class="field-value">${member.DIAlum === true ? 'Yes' : member.DIAlum === false ? 'No' : 'N/A'}</div>
            </div>
        </div>
    `;
}

function renderMemberDetails(member) {
    return `
        <div class="member-details">
            <div class="detail-group">
                <div class="detail-label">Name</div>
                <div class="detail-value">${member.name}</div>
            </div>

            <div class="detail-group">
                <div class="detail-label">Email</div>
                <div class="detail-value">${member.email || 'No email provided'}</div>
            </div>

            <div class="detail-group">
                <div class="detail-label">Pronouns</div>
                <div class="detail-value">${member.pronouns || 'Not specified'}</div>
            </div>

            <div class="detail-group">
                <div class="detail-label">Role</div>
                <div class="detail-value">${member.role || 'Not specified'}</div>
            </div>

            <div class="detail-group">
                <div class="detail-label">First Year DI?</div>
                <div class="detail-value">${member.firstYearDI ? 'Yes' : 'No'}</div>
            </div>

            <div class="detail-group">
                <div class="detail-label">First GF?</div>
                <div class="detail-value">${member.firstGF ? 'Yes' : 'No'}</div>
            </div>

            <div class="detail-group">
                <div class="detail-label">DI Alum?</div>
                <div class="detail-value">${member.DIAlum === true ? 'Yes' : member.DIAlum === false ? 'No' : 'N/A'}</div>
            </div>
        </div>
    `;
}
