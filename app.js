function convertPdfToHtml() {
    const apiKey = '92cb624e0c7213e092cf98e96d282390'; // کلید API خود را جایگزین کنید
    const username = 'alikharrati'; // نام کاربری خود را جایگزین کنید

    const pdfFile = document.getElementById('pdfFile').files[0];
    if (!pdfFile) {
        alert("Please upload a PDF file");
        return;
    }

    const formData = new FormData();
    formData.append('file', pdfFile);
    formData.append('input_format', 'pdf');
    formData.append('output_format', 'html');

    console.log("Sending request to PDFCROWD API...");

    // ارسال درخواست به PDFCROWD API برای تبدیل به HTML
    fetch('https://api.pdfcrowd.com/convert/24.04/', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + apiKey),
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error converting PDF to HTML: " + response.statusText);
        }
        return response.text();  // دریافت نتیجه به صورت HTML
    })
    .then(html => {
        // ایجاد یک Blob برای فایل HTML
        const blob = new Blob([html], { type: 'text/html' });
        
        // ایجاد یک لینک برای دانلود فایل
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'converted.html';  // نام فایل HTML که دانلود خواهد شد
        
        // افزودن لینک به صفحه و کلیک خودکار بر روی آن برای دانلود
        document.body.appendChild(link);
        link.click();
        
        // حذف لینک پس از دانلود
        document.body.removeChild(link);
    })
    .catch(error => {
        console.error("Error occurred: ", error);
    });
}
