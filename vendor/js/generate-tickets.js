$(document).ready(function() {
    // Initialize date range picker
    $('#dateRange').daterangepicker({
        startDate: moment('2025-05-29'),
        endDate: moment('2025-06-27'),
        locale: {
            format: 'DD MMM YYYY'
        },
        opens: 'left'
    }, function(start, end, label) {
        $('#dateRange').val(start.format('DD MMM') + '  -  ' + end.format('DD MMM YYYY'));
        updatePreview();
    });

    // Form input change handlers
    $('#partnerName').on('change', updatePreview);
    $('#ticketCount').on('input', updatePreview);
    $('#ticketType').on('change', function() {
        const ticketType = $(this).val();
        
        // Show/hide price field based on ticket type
        if (ticketType === 'VVIP Tickets') {
            $('#priceGroup').hide();
            $('#previewPriceItem').hide();
        } else {
            $('#priceGroup').show();
            $('#previewPriceItem').show();
        }
        
        updatePreview();
    });
    $('#ticketPrice').on('input', updatePreview);

    // Form submission
    $('#generateTicketsForm').on('submit', function(e) {
        e.preventDefault();
        showSuccessModal();
    });

    // Close success modal
    $('#closeSuccessModal').on('click', function() {
        closeSuccessModal();
    });

    // Action buttons in success modal
    $('#downloadPdfBtn').on('click', function() {
        // Simulate PDF download
        alert('Downloading PDF...');
        closeSuccessModal();
    });

    $('#emailBtn').on('click', function() {
        // Simulate email sending
        alert('Sending via Email...');
        closeSuccessModal();
    });

    $('#whatsappBtn').on('click', function() {
        // Simulate WhatsApp sending
        alert('Sending via WhatsApp...');
        closeSuccessModal();
    });

    // Initial preview update
    updatePreview();
});

// Update preview card with form values
function updatePreview() {
    $('#previewPartner').text($('#partnerName').val());
    $('#previewCount').text($('#ticketCount').val());
    $('#previewType').text($('#ticketType').val());
    $('#previewPrice').text($('#ticketPrice').val());
    
    // Extract date range from input
    const dateRange = $('#dateRange').val();
    const formattedDate = dateRange.replace('  -  ', ' - ');
    $('#previewDate').text(formattedDate);
}

// Show success modal
function showSuccessModal() {
    $('#successModal').addClass('show');
    $('#overlay').addClass('show');
}

// Close success modal
function closeSuccessModal() {
    $('#successModal').removeClass('show');
    $('#overlay').removeClass('show');
}