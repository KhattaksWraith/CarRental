// ===== SIDEBAR TOGGLE (Mobile) =====
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

if (sidebarToggle) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('active');
  });
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
  });
}

// ===== FILE UPLOAD CLICK =====
document.querySelectorAll('.file-upload').forEach(upload => {
  upload.addEventListener('click', () => {
    // In a real app, this would open a file picker
    upload.style.borderColor = 'var(--primary)';
    upload.querySelector('p').textContent = 'File selected (demo)';
    setTimeout(() => {
      upload.style.borderColor = '';
    }, 2000);
  });
});
