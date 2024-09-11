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
        document.getElementById('result').innerHTML = html;  // نمایش HTML در صفحه
    })
    .catch(error => {
        console.error(error);
    });
}
