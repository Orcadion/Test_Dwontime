const personalDiv = document.getElementById('personalInfo');
const mainDiv = document.getElementById('mainForm');

function setQuickText(text) {
  document.getElementById('description').value = text;
}
function handleDescriptionInput() {
  const desc = document.getElementById('description').value.trim();
  const quickButtons = document.getElementById('quickButtons');

  if (desc === '') {
    quickButtons.style.display = 'block';
  } else {
    quickButtons.style.display = 'none';
  }
}


function saveUserInfo() {
  const name = document.getElementById('username').value;
  const factory = document.getElementById('factory').value;
  const shift = document.getElementById('shift').value;
  
  if (name && factory && shift) {
    localStorage.setItem('username', name);
    localStorage.setItem('factory', factory);
    localStorage.setItem('shift', shift);

    personalDiv.classList.add('hidden');
    mainDiv.classList.remove('hidden');
  } else {
    alert('يرجى ملء جميع الحقول');
  }
}

function editUserInfo() {
  personalDiv.classList.remove('hidden');
  mainDiv.classList.add('hidden');
}

function sendData() {
  const name = localStorage.getItem('username');
  const factory = localStorage.getItem('factory');
  const shift = localStorage.getItem('shift');
  const downtime = document.getElementById('downtime').value;
  const issueStart = document.getElementById('issueStart').value;
  const issueEnd = document.getElementById('issueEnd').value;
  const description = document.getElementById('description').value;
  const date = new Date().toISOString().split('T')[0];

  // إرسال البيانات إلى الخادم (الذي يعمل على Render)
  fetch('https://your-render-url.onrender.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name, factory, shift, date,
      downtime, issueStart, issueEnd, description
    })
  })
  .then(async res => {
    const text = await res.text();
    if (res.ok) {
      alert('تم الإرسال بنجاح!');
    } else {
      alert('فشل في الإرسال: ' + text);
    }
  })
  .catch(err => {
    alert('حدث خطأ في الإرسال: ' + err.message);
  });
}
  const name = localStorage.getItem('username');
  const factory = localStorage.getItem('factory');
  const shift = localStorage.getItem('shift');
  const downtime = document.getElementById('downtime').value;
  const issueStart = document.getElementById('issueStart').value;
  const issueEnd = document.getElementById('issueEnd').value;
  const description = document.getElementById('description').value;
  const date = new Date().toISOString().split('T')[0];

  fetch('https://script.google.com/macros/s/AKfycbwXBdNiVqtpqNGUuyR07mMCa9ahCJSSOvQK5pKR8tKF0mOXg7Wirw_0fJYGAAstP9acug/exec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name, factory, shift, date,
      downtime, issueStart, issueEnd, description
    })
  })
  .then(async res => {
    const text = await res.text();
    if (res.ok) {
      alert('تم الإرسال بنجاح!');
    } else {
      alert('فشل في الإرسال: ' + text);
    }
  })
  .catch(err => {
    alert('حدث خطأ في الإرسال: ' + err.message);
  });


// Load saved data if exists
window.onload = function() {
  if (localStorage.getItem('username')) {
    personalDiv.classList.add('hidden');
    mainDiv.classList.remove('hidden');
  }
};
