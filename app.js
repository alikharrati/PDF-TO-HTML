function convertPdfToText() {
    const apiKey = '92cb624e0c7213e092cf98e96d282390'; // جایگزین با کلید API شما
    const username = 'alikharrati'; // جایگزین با نام کاربری شما

    const pdfFile = document.getElementById('pdfFile').files[0];
    if (!pdfFile) {
        alert("Please upload a PDF file");
        return;
    }

    const formData = new FormData();
    formData.append('file', pdfFile);

    fetch('https://api.pdfcrowd.com/v2/pdf/convert/to/text/', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + apiKey),
        },
        body: formData
    })
    .then(response => response.text())  // تبدیل پاسخ به متن
    .then(text => {
        document.getElementById('result').innerText = text;  // نمایش متن در صفحه
    })
    .catch(error => {
        console.error("Error converting PDF to text:", error);
    });
}
