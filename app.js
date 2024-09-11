function convertPdfToText() {
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
    formData.append('output_format', 'txt');

    // ارسال درخواست به PDFCROWD API
    fetch('https://api.pdfcrowd.com/convert/24.04/', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + apiKey),
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error converting PDF to text: " + response.statusText);
        }
        return response.text();  // دریافت نتیجه به صورت متن
    })
    .then(text => {
        document.getElementById('result').innerText = text;  // نمایش متن در صفحه
    })
    .catch(error => {
        console.error(error);
    });
}
