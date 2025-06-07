$(document).ready(function() {
    // Sample data for different ticket types
    const ticketData = {
        'gift-vouchers': [
            { id: '#086-GHADT7690', price: 'N8,500', scannedBy: 'Ngozi-Abuja', partner: 'Kuda Microfinance Bank', date: '7th May, 2025', status: 'Used' },
            { id: '#086-GHADT7690', price: 'N8,500', scannedBy: 'Nil', partner: 'Dangote Refineries', date: '7th May, 2025', status: 'Expired' },
            { id: '#086-GHADT7690', price: 'N8,500', scannedBy: '---', partner: 'Wema Bank', date: '7th May, 2025', status: 'Unused' },
            { id: '#086-GHADT7690', price: 'N8,500', scannedBy: '---', partner: 'Kuda Microfinance Bank', date: '7th May, 2025', status: 'Unused' },
            { id: '#086-GHADT7690', price: 'N8,500', scannedBy: 'Nil', partner: 'Lanstellar', date: '7th May, 2025', status: 'Expired' },
            { id: '#086-GHADT7690', price: 'N8,500', scannedBy: 'Emma-Lagos', partner: 'Fidelity Bank', date: '7th May, 2025', status: 'Used' },
            { id: '#086-GHADT7690', price: 'N8,500', scannedBy: '---', partner: 'Wema Bank', date: '7th May, 2025', status: 'Unused' },
            { id: '#086-GHADT7690', price: 'N8,500', scannedBy: 'Ngozi-Abuja', partner: 'Sterling', date: '7th May, 2025', status: 'Used' },
            { id: '#086-GHADT7690', price: 'N8,500', scannedBy: '---', partner: 'Kuda Microfinance Bank', date: '7th May, 2025', status: 'Unused' }
        ],
        'vvip-tickets': [
            { id: '#086-GHADT7690', scannedBy: 'Ngozi-Abuja', partner: 'Kuda Microfinance Bank', date: '7th May, 2025', status: 'Used' },
            { id: '#086-GHADT7690', scannedBy: 'Nil', partner: 'Dangote Refineries', date: '7th May, 2025', status: 'Expired' },
            { id: '#086-GHADT7690', scannedBy: '---', partner: 'Lanstellar', date: '7th May, 2025', status: 'Unused' },
            { id: '#086-GHADT7690', scannedBy: '---', partner: 'Sterling Bank', date: '7th May, 2025', status: 'Unused' },
            { id: '#086-GHADT7690', scannedBy: 'Nil', partner: 'Dangote Refineries', date: '7th May, 2025', status: 'Expired' },
            { id: '#086-GHADT7690', scannedBy: 'Emma-Lagos', partner: 'Wema Bank', date: '7th May, 2025', status: 'Used' },
            { id: '#086-GHADT7690', scannedBy: '---', partner: 'Kuda Microfinance Bank', date: '7th May, 2025', status: 'Unused' },
            { id: '#086-GHADT7690', scannedBy: 'Emma-Lagos', partner: 'Lanstellar', date: '7th May, 2025', status: 'Used' },
            { id: '#086-GHADT7690', scannedBy: '---', partner: 'Sterling Bank', date: '7th May, 2025', status: 'Unused' }
        ],
        'regular-tickets': [
            { id: '#086-GHADT7690', price: 'N8,500', scannedBy: 'Ngozi-Abuja', partner: 'Kuda Microfinance Bank', date: '7th May, 2025', status: 'Used' },
            { id: '#086-GHADT7690', price: 'N8,500', scannedBy: 'Nil', partner: 'Dangote Refineries', date: '7th May, 2025', status: 'Expired' },
            { id: '#086-GHADT7690', price: 'N8,500', scannedBy: '---', partner: 'Wema Bank', date: '7th May, 2025', status: 'Unused' },
            { id: '#086-GHADT7690', price: 'N8,500', scannedBy: '---', partner: 'Kuda Microfinance Bank', date: '7th May, 2025', status: 'Unused' },
            { id: '#086-GHADT7690', price: 'N8,500', scannedBy: 'Nil', partner: 'Lanstellar', date: '7th May, 2025', status: 'Expired' },
            { id: '#086-GHADT7690', price: 'N8,500', scannedBy: 'Emma-Lagos', partner: 'Fidelity Bank', date: '7th May, 2025', status: 'Used' },
            { id: '#086-GHADT7690', price: 'N8,500', scannedBy: '---', partner: 'Wema Bank', date: '7th May, 2025', status: 'Unused' },
            { id: '#086-GHADT7690', price: 'N8,500', scannedBy: 'Ngozi-Abuja', partner: 'Sterling', date: '7th May, 2025', status: 'Used' },
            { id: '#086-GHADT7690', price: 'N8,500', scannedBy: '---', partner: 'Kuda Microfinance Bank', date: '7th May, 2025', status: 'Unused' }
        ]
    };

    let currentTicketType = 'gift-vouchers';

    // Initialize date range picker
    $('#historyDateRange').daterangepicker({
        startDate: moment('2025-04-01'),
        endDate: moment('2025-05-03'),
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, function(start, end, label) {
        $('#historyDateRange').val(start.format('DD MMMM') + ' - ' + end.format('DD MMMM YYYY'));
    });

    // Tab switching
    $('.history-tab').on('click', function() {
        $('.history-tab').removeClass('active');
        $(this).addClass('active');
        
        currentTicketType = $(this).data('type');
        updateTable();
    });

    // Export button
    $('#exportBtn').on('click', function() {
        // Simulate export functionality
        alert('Exporting data...');
    });

    // Pagination
    $('.pagination-number').on('click', function() {
        if (!$(this).hasClass('active')) {
            $('.pagination-number').removeClass('active');
            $(this).addClass('active');
            
            // Update pagination buttons
            const pageNum = parseInt($(this).text());
            $('.pagination-btn.prev').prop('disabled', pageNum === 1);
            $('.pagination-btn.next').prop('disabled', pageNum === 10);
        }
    });

    $('.pagination-btn.next').on('click', function() {
        const currentPage = parseInt($('.pagination-number.active').text());
        if (currentPage < 10) {
            $('.pagination-number.active').removeClass('active');
            $('.pagination-number').eq(currentPage).addClass('active');
            $(this).prop('disabled', currentPage + 1 === 10);
            $('.pagination-btn.prev').prop('disabled', false);
        }
    });

    $('.pagination-btn.prev').on('click', function() {
        const currentPage = parseInt($('.pagination-number.active').text());
        if (currentPage > 1) {
            $('.pagination-number.active').removeClass('active');
            $('.pagination-number').eq(currentPage - 2).addClass('active');
            $(this).prop('disabled', currentPage - 1 === 1);
            $('.pagination-btn.next').prop('disabled', false);
        }
    });

    // Filter change
    $('#partnerFilter').on('change', function() {
        // Filter functionality would go here
        updateTable();
    });

    // Sort functionality
    $('.sortable').on('click', function() {
        const $icon = $(this).find('.sort-icon');
        
        // Reset other sort icons
        $('.sortable').not(this).find('.sort-icon').removeClass('fa-chevron-up fa-chevron-down').addClass('fa-chevron-down');
        
        // Toggle current sort icon
        if ($icon.hasClass('fa-chevron-up')) {
            $icon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
        } else {
            $icon.removeClass('fa-chevron-down').addClass('fa-chevron-up');
        }
        
        // Sort functionality would go here
        updateTable();
    });

    // Update table based on current ticket type
    function updateTable() {
        const data = ticketData[currentTicketType];
        const $table = $('#historyTable');
        const $tbody = $('#tableBody');
        
        // Show/hide price column based on ticket type
        if (currentTicketType === 'vvip-tickets') {
            $table.addClass('hide-price');
        } else {
            $table.removeClass('hide-price');
        }
        
        // Clear existing rows
        $tbody.empty();
        
        // Add new rows
        data.forEach(function(ticket) {
            const statusClass = `status-${ticket.status.toLowerCase()}`;
            
            let row = `
                <tr>
                    <td>${ticket.id}</td>
            `;
            
            // Add price column if not VVIP tickets
            if (currentTicketType !== 'vvip-tickets') {
                row += `<td class="price-column">${ticket.price}</td>`;
            }
            
            row += `
                    <td>${ticket.scannedBy}</td>
                    <td>${ticket.partner}</td>
                    <td>${ticket.date}</td>
                    <td><span class="status-badge ${statusClass}">${ticket.status}</span></td>
                    <td><a href="view-batch.html" class="view-link">View batch</a></td>
                </tr>
            `;
            
            $tbody.append(row);
        });
    }

    // Initialize table
    updateTable();
});