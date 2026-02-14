// รหัสผ่านที่ถูกต้อง
const CORRECT_PASSCODE = '170325';
let currentPasscode = '';

// อัพเดทเวลา
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('currentTime').textContent = `${hours}:${minutes}`;
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('th-TH', options);
    document.getElementById('currentDate').textContent = dateStr;
}

updateTime();
setInterval(updateTime, 1000);

// เพิ่มตัวเลข
function addDigit(digit) {
    if (currentPasscode.length < 6) {
        currentPasscode += digit;
        updateDots();
        
        // เล่นเสียง feedback (vibration on mobile)
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
        
        // ถ้าครบ 6 หลัก ให้ตรวจสอบ
        if (currentPasscode.length === 6) {
            setTimeout(checkPasscode, 300);
        }
    }
}

// ลบตัวเลข
function deleteDigit() {
    if (currentPasscode.length > 0) {
        currentPasscode = currentPasscode.slice(0, -1);
        updateDots();
        
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    }
}

// อัพเดทจุด
function updateDots() {
    for (let i = 1; i <= 6; i++) {
        const dot = document.getElementById(`dot${i}`);
        if (i <= currentPasscode.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
        dot.classList.remove('shake');
    }
}

// ตรวจสอบรหัสผ่าน
function checkPasscode() {
    if (currentPasscode === CORRECT_PASSCODE) {
        // ถูกต้อง - ปลดล็อก
        unlockSuccess();
    } else {
        // ผิด - แสดง error
        showError();
    }
}

// ปลดล็อกสำเร็จ
function unlockSuccess() {
    const lockScreen = document.querySelector('.lock-screen');
    lockScreen.classList.add('unlock-animation');
    
    // เล่น vibration
    if (navigator.vibrate) {
        navigator.vibrate([50, 100, 50]);
    }
    
    // รอ animation เสร็จแล้วไปหน้า index
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

// แสดง error
function showError() {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.classList.add('show');
    
    // เขย่าจุด
    for (let i = 1; i <= 6; i++) {
        const dot = document.getElementById(`dot${i}`);
        dot.classList.add('shake');
    }
    
    // เล่น vibration
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100]);
    }
    
    // รีเซ็ตหลังจาก 1 วินาที
    setTimeout(() => {
        currentPasscode = '';
        updateDots();
        errorMessage.classList.remove('show');
    }, 1000);
}

// รองรับการกดคีย์บอร์ด
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        addDigit(e.key);
    } else if (e.key === 'Backspace') {
        deleteDigit();
    } else if (e.key === 'Enter' && currentPasscode.length === 6) {
        checkPasscode();
    }
});

// ป้องกันการ back ไปหน้า index โดยตรง
window.addEventListener('load', () => {
    // ตรวจสอบว่ามี session หรือไม่
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'index.html';
    }
});

// เมื่อปลดล็อกสำเร็จ บันทึก session
function unlockSuccess() {
    sessionStorage.setItem('isLoggedIn', 'true');
    
    const lockScreen = document.querySelector('.lock-screen');
    lockScreen.classList.add('unlock-animation');
    
    if (navigator.vibrate) {
        navigator.vibrate([50, 100, 50]);
    }
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

console.log('🔒 Lock Screen Ready');
console.log('💡 Hint: รหัสคือวันที่พิเศษ (DDMMYY)');
