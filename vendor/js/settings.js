// Declare variables
const $ = window.$ // Assuming jQuery is available globally
let currentContextMenuRow = null
const salesAgents = [
  { username: "Emmanuel Ighodaro", branch: "Silverbird-Lagos", password: "••••••", dateAdded: "7th May, 2025" },
  { username: "Angel Mars", branch: "Silverbird-Abuja", password: "••••••", dateAdded: "7th May, 2025" },
  { username: "Ngozi Friday", branch: "Silverbird-Delta", password: "••••••", dateAdded: "7th May, 2025" },
  { username: "Temiloluwa Alade", branch: "Silverbird-Lagos", password: "••••••", dateAdded: "7th May, 2025" },
]

const admins = [
  { username: "Emmanuel Ighodaro", branch: "Silverbird-Lagos", password: "••••••", dateAdded: "7th May, 2025" },
  { username: "Angel Mars", branch: "Silverbird-Abuja", password: "••••••", dateAdded: "7th May, 2025" },
  { username: "Ngozi Friday", branch: "Silverbird-Delta", password: "••••••", dateAdded: "7th May, 2025" },
  { username: "Temiloluwa Alade", branch: "Silverbird-Lagos", password: "••••••", dateAdded: "7th May, 2025" },
]

document.addEventListener("DOMContentLoaded", () => {
  // Initialize page
  populateSalesTable()
  populateAdminTable()

  // Settings navigation
  document.querySelectorAll(".settings-nav-item").forEach((item) => {
    item.addEventListener("click", function () {
      const section = this.dataset.section

      document.querySelectorAll(".settings-nav-item").forEach((nav) => nav.classList.remove("active"))
      this.classList.add("active")

      document.querySelectorAll(".settings-section").forEach((sec) => sec.classList.remove("active"))
      document.getElementById(section + "Section").classList.add("active")
    })
  })

  // Add buttons
  document.getElementById("addSalesAgentBtn").addEventListener("click", () => {
    showModal("addSalesAgentModal")
  })

  document.getElementById("addAdminBtn").addEventListener("click", () => {
    showModal("addAdminModal")
  })

  // Close modals
  document.getElementById("closeSalesAgentModal").addEventListener("click", () => {
    closeModal("addSalesAgentModal")
  })

  document.getElementById("closeAdminModal").addEventListener("click", () => {
    closeModal("addAdminModal")
  })

  document.getElementById("closeSuccessModal").addEventListener("click", () => {
    closeModal("successModal")
  })

  // Form submissions
  document.getElementById("salesAgentForm").addEventListener("submit", function (e) {
    e.preventDefault()

    const name = document.getElementById("salesAgentName").value
    const branch = document.getElementById("salesAgentBranch").value
    const password = document.getElementById("salesAgentPassword").value

    if (name && branch && password && password.length === 6) {
      // Add to sales agents array
      salesAgents.push({
        username: name,
        branch: branch,
        password: "••••••",
        dateAdded: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      })

      populateSalesTable()
      closeModal("addSalesAgentModal")

      // Show success modal
      setTimeout(() => {
        showModal("successModal")
      }, 300)

      // Reset form
      this.reset()
    }
  })

  document.getElementById("adminForm").addEventListener("submit", function (e) {
    e.preventDefault()

    const name = document.getElementById("adminName").value
    const branch = document.getElementById("adminBranch").value
    const password = document.getElementById("adminPassword").value

    if (name && branch && password && password.length === 6) {
      // Add to admins array
      admins.push({
        username: name,
        branch: branch,
        password: "••••••",
        dateAdded: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      })

      populateAdminTable()
      closeModal("addAdminModal")

      // Show success modal
      setTimeout(() => {
        showModal("successModal")
      }, 300)

      // Reset form
      this.reset()
    }
  })

  // Reset password form
  document.getElementById("resetPasswordForm").addEventListener("submit", function (e) {
    e.preventDefault()

    const oldPassword = document.getElementById("oldPassword").value
    const newPassword = document.getElementById("newPassword").value

    if (oldPassword && newPassword && newPassword.length === 6) {
      closeModal("resetPasswordModal")

      // Show OTP modal
      setTimeout(() => {
        showModal("otpModal")
        // Focus first OTP input
        document.querySelector(".otp-input").focus()
      }, 300)

      // Reset form
      this.reset()
    }
  })

  // OTP form handling
  document.getElementById("otpForm").addEventListener("submit", (e) => {
    e.preventDefault()

    const otpInputs = document.querySelectorAll(".otp-input")
    const otp = Array.from(otpInputs)
      .map((input) => input.value)
      .join("")

    if (otp.length === 6) {
      alert("Password reset successfully!")
      closeModal("otpModal")
    }
  })

  // OTP input handling
  document.querySelectorAll(".otp-input").forEach((input, index) => {
    input.addEventListener("input", function () {
      const value = this.value

      // Only allow numbers
      this.value = value.replace(/[^0-9]/g, "")

      // Move to next input
      if (this.value && index < 5) {
        document.querySelectorAll(".otp-input")[index + 1].focus()
      }
    })

    input.addEventListener("keydown", function (e) {
      // Move to previous input on backspace
      if (e.key === "Backspace" && !this.value && index > 0) {
        document.querySelectorAll(".otp-input")[index - 1].focus()
      }
    })
  })

  // Success modal actions
  document.getElementById("shareEmailBtn").addEventListener("click", () => {
    alert("Sharing password via Email...")
    closeModal("successModal")
  })

  document.getElementById("shareWhatsAppBtn").addEventListener("click", () => {
    alert("Sharing password via WhatsApp...")
    closeModal("successModal")
  })

  // Delete confirmation actions
  document.getElementById("cancelDeleteBtn").addEventListener("click", () => {
    closeModal("deleteConfirmModal")
  })

  document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
    if (currentContextMenuRow) {
      currentContextMenuRow.remove()
      currentContextMenuRow = null
    }
    closeModal("deleteConfirmModal")
    alert("Account deleted successfully!")
  })

  // Context menu actions
  document.getElementById("resetPasswordBtn").addEventListener("click", () => {
    hideContextMenu()
    showModal("resetPasswordModal")
  })

  document.getElementById("deleteAccountBtn").addEventListener("click", () => {
    hideContextMenu()
    showModal("deleteConfirmModal")
  })

  // Resend OTP
  document.getElementById("resendOtp").addEventListener("click", (e) => {
    e.preventDefault()
    alert("OTP resent successfully!")
    document.querySelectorAll(".otp-input").forEach((input) => (input.value = ""))
    document.querySelector(".otp-input").focus()
  })

  // Hide context menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".context-menu") && !e.target.closest(".more-btn")) {
      hideContextMenu()
    }
  })

  // Handle more button clicks
  document.addEventListener("click", (e) => {
    if (e.target.closest(".more-btn")) {
      e.stopPropagation()

      const btn = e.target.closest(".more-btn")
      const rect = btn.getBoundingClientRect()
      const contextMenu = document.getElementById("contextMenu")

      currentContextMenuRow = btn.closest("tr")

      contextMenu.style.top = rect.bottom + window.scrollY + 5 + "px"
      contextMenu.style.left = rect.left + window.scrollX - 140 + "px"
      contextMenu.classList.add("show")
    }
  })

  // Password input validation
  document.getElementById("salesAgentPassword").addEventListener("input", function () {
    validatePasswordInput(this)
  })

  document.getElementById("adminPassword").addEventListener("input", function () {
    validatePasswordInput(this)
  })

  document.getElementById("newPassword").addEventListener("input", function () {
    validatePasswordInput(this)
  })

  // Populate sales table
  function populateSalesTable() {
    const tbody = document.getElementById("salesTableBody")
    tbody.innerHTML = ""

    salesAgents.forEach((agent, index) => {
      const row = document.createElement("tr")
      row.innerHTML = `
                <td>${agent.username}</td>
                <td>${agent.branch}</td>
                <td class="password-cell">${agent.password}</td>
                <td>${agent.dateAdded}</td>
                <td>
                    <button class="more-btn" data-index="${index}" data-type="sales">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                </td>
            `
      tbody.appendChild(row)
    })
  }

  // Populate admin table
  function populateAdminTable() {
    const tbody = document.getElementById("adminTableBody")
    tbody.innerHTML = ""

    admins.forEach((admin, index) => {
      const row = document.createElement("tr")
      row.innerHTML = `
                <td>${admin.username}</td>
                <td>${admin.branch}</td>
                <td class="password-cell">${admin.password}</td>
                <td>${admin.dateAdded}</td>
                <td>
                    <button class="more-btn" data-index="${index}" data-type="admin">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                </td>
            `
      tbody.appendChild(row)
    })
  }

  // Show modal function
  function showModal(modalId) {
    document.getElementById(modalId).classList.add("show")
    document.getElementById("overlay").classList.add("show")
  }

  // Close modal function
  function closeModal(modalId) {
    document.getElementById(modalId).classList.remove("show")
    document.getElementById("overlay").classList.remove("show")
  }

  // Hide context menu
  function hideContextMenu() {
    document.getElementById("contextMenu").classList.remove("show")
    currentContextMenuRow = null
  }

  // Validate password input
  function validatePasswordInput(input) {
    const value = input.value
    if (value.length > 6) {
      input.value = value.substring(0, 6)
    }

    // Only allow numbers
    input.value = input.value.replace(/[^0-9]/g, "")
  }

  // Mobile menu toggle
  document.getElementById("mobileMenuBtn").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("show")
  })

  // Close overlay
  document.getElementById("overlay").addEventListener("click", function () {
    document.querySelectorAll(".modal-overlay.show").forEach((modal) => {
      modal.classList.remove("show")
    })
    this.classList.remove("show")
  })
})

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("show")
  document.getElementById("overlay").classList.remove("show")
}

function hideContextMenu() {
  document.getElementById("contextMenu").classList.remove("show")
  currentContextMenuRow = null
}

// Close new modals
$("#closeResetPasswordModal").on("click", () => {
  closeModal("#resetPasswordModal")
})

$("#closeOtpModal").on("click", () => {
  closeModal("#otpModal")
})

$("#closeDeleteConfirmModal").on("click", () => {
  closeModal("#deleteConfirmModal")
})

// Delete confirmation actions
$("#cancelDeleteBtn").on("click", () => {
  closeModal("#deleteConfirmModal")
})

$("#confirmDeleteBtn").on("click", () => {
  if (currentContextMenuRow) {
    currentContextMenuRow.remove()
    currentContextMenuRow = null
  }
  closeModal("#deleteConfirmModal")
  alert("Account deleted successfully!")
})

// Update context menu actions to use new modals
$("#resetPasswordBtn")
  .off("click")
  .on("click", () => {
    hideContextMenu()
    $("#resetPasswordModal").addClass("show")
    $("#overlay").addClass("show")
  })

$("#deleteAccountBtn")
  .off("click")
  .on("click", () => {
    hideContextMenu()
    $("#deleteConfirmModal").addClass("show")
    $("#overlay").addClass("show")
  })

// Update new password input validation
$("#newPassword").on("input", function () {
  const value = $(this).val()
  if (value.length > 6) {
    $(this).val(value.substring(0, 6))
  }

  // Only allow numbers
  $(this).val(
    $(this)
      .val()
      .replace(/[^0-9]/g, ""),
  )
})
