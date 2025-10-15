    const courses = [
      { id: 1, title: "First Aid", price: 1700 },
      { id: 2, title: "Sewing", price: 1500 },
      { id: 3, title: "Landscaping", price: 1500 },
      { id: 4, title: "Life Skills", price: 1500 },
      { id: 5, title: "Child Minding", price: 750 },
      { id: 6, title: "Cooking", price: 750 },
    ];

    let cart = [];
    const successModal = document.getElementById("successModal");
    const invoiceSection = document.getElementById("invoiceSection");

    
    function handlePaymentSubmit(e) {
      e.preventDefault();
      setTimeout(() => {
        successModal.classList.remove("hidden");
        showInvoice();
      }, 1000);
    }

    
    function getDiscountedPrice() {
      const total = cart.reduce((sum, item) => sum + item.course.price * item.quantity, 0);
      const discount = cart.length >= 3 ? 0.15 : cart.length >= 2 ? 0.1 : 0;
      return total * (1 - discount);
    }

   
    function showInvoice() {
      const invoiceDetails = document.getElementById("invoiceDetails");
      const total = getDiscountedPrice().toFixed(2);
      const date = new Date().toLocaleDateString();
      const firstName = document.getElementById("firstName")?.value || "Customer";
      const lastName = document.getElementById("lastName")?.value || "";
      const email = document.getElementById("email")?.value || "";

      let html = `
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Customer:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr class="my-2">
        <h3 class="font-semibold mb-2">Purchased Courses:</h3>
        <ul class="list-disc pl-5">
          ${cart.map(
            (item) =>
              `<li>${item.course.title} x${item.quantity} — R${(
                item.course.price * item.quantity
              ).toFixed(2)}</li>`
          ).join("")}
        </ul>
        <hr class="my-2">
        <p><strong>Total Paid:</strong> R${total}</p>
      `;
      invoiceDetails.innerHTML = html;
      invoiceSection.classList.remove("hidden");

      document.getElementById("downloadInvoiceBtn").onclick = () => downloadInvoice(html);
      document.getElementById("closeInvoiceBtn").onclick = () => invoiceSection.classList.add("hidden");
    }

    
    function downloadInvoice(invoiceHtml) {
      const invoiceWindow = window.open("", "_blank");
      invoiceWindow.document.write(`
        <html><head><title>Invoice</title></head>
        <body style="font-family: Arial; margin: 40px;">
          <h1>Empowering the Nation - Invoice</h1>
          ${invoiceHtml}
        </body></html>
      `);
      invoiceWindow.document.close();
      invoiceWindow.print();
    }

    document.addEventListener("DOMContentLoaded", () => {
      cart = [
        { course: courses[0], quantity: 1 },
        { course: courses[1], quantity: 2 },
      ];
    });