// เปลี่ยนรูปหลัก
document.getElementById('photoInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('mainPhoto').src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// เปลี่ยนรูปในแกลเลอรี่
let currentGalleryIndex = 0;

function changeGalleryImage(index) {
    currentGalleryIndex = index;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const galleryItems = document.querySelectorAll('.gallery-item img');
                galleryItems[currentGalleryIndex].src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// บันทึกการแก้ไขข้อความอัตโนมัติ
const editableElements = document.querySelectorAll('.editable');
editableElements.forEach(element => {
    element.addEventListener('blur', function() {
        // บันทึกลง localStorage
        const key = this.textContent.substring(0, 20);
        localStorage.setItem(key, this.textContent);
    });
    
    element.addEventListener('focus', function() {
        // เพิ่มเอฟเฟกต์เมื่อโฟกัส
        this.style.transition = 'all 0.3s ease';
    });
});

// โหลดข้อความที่บันทึกไว้
window.addEventListener('load', function() {
    editableElements.forEach(element => {
        const key = element.textContent.substring(0, 20);
        const savedText = localStorage.getItem(key);
        if (savedText) {
            element.textContent = savedText;
        }
    });
});

// เพิ่มเอฟเฟกต์ปุ่ม
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// สร้างหัวใจลอยเพิ่มเติมเมื่อคลิก
document.addEventListener('click', function(e) {
    if (!e.target.matches('button') && !e.target.matches('input')) {
        createClickHeart(e.pageX, e.pageY);
    }
});

function createClickHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '💖';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '2rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'floatUp 2s ease-out forwards';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// เพิ่ม CSS สำหรับ animation floatUp
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.5);
        }
    }
`;
document.head.appendChild(style);

// แจ้งเตือนเมื่อโหลดเสร็จ
console.log('🎉 Valentine Website พร้อมใช้งานแล้ว!');
console.log('💡 คลิกที่ข้อความเพื่อแก้ไข');
console.log('📷 คลิกที่รูปภาพเพื่อเปลี่ยน');
