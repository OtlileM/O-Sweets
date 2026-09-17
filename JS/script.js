document.addEventListener("DOMContentLoaded", function () {

    const products = [
        {
            name: "Colourful Gummies",
            image: "../Images/sweets1.png",
            description: "A selection of colourful gummy sweets with different shapes and flavours.",
            price: 35
        },
        {
            name: "Mixed Sweets",
            image: "../Images/sweets2.png",
            description: "A mixed selection of sweets for customers who enjoy different flavours and textures.",
            price: 40
        },
        {
            name: "Fruit Flavoured Sweets",
            image: "../Images/sweets3.png",
            description: "Colourful fruit flavoured sweets that are suitable for parties, gifts or everyday treats.",
            price: 35
        }
    ];


    const productList = document.getElementById("productList");
    const productSearch = document.getElementById("productSearch");


    function displayProducts(items) {

        if (!productList) {
            return;
        }

        productList.innerHTML = "";

        if (items.length === 0) {
            productList.innerHTML = "<p>No sweets were found.</p>";
            return;
        }

        items.forEach(function (product) {

            const article = document.createElement("article");

            article.innerHTML =
                "<h3>" + product.name + "</h3>" +
                "<img src='" + product.image +
                "' alt='" + product.name +
                "' class='product-image'>" +
                "<p>" + product.description + "</p>" +
                "<p><strong>Price: R" +
                product.price +
                " per 100g</strong></p>";

            productList.appendChild(article);
        });
    }


    if (productList) {
        displayProducts(products);
    }


    if (productSearch) {

        productSearch.addEventListener("input", function () {

            const searchText =
                productSearch.value.toLowerCase().trim();

            const filteredProducts =
                products.filter(function (product) {

                    return (
                        product.name.toLowerCase().includes(searchText) ||
                        product.description.toLowerCase().includes(searchText)
                    );
                });

            displayProducts(filteredProducts);
        });
    }


    if (productList) {

        const lightbox = document.createElement("div");
        lightbox.className = "lightbox";

        const closeButton = document.createElement("span");
        closeButton.className = "lightbox-close";
        closeButton.innerHTML = "&times;";

        const lightboxImage = document.createElement("img");

        lightbox.appendChild(closeButton);
        lightbox.appendChild(lightboxImage);

        document.body.appendChild(lightbox);


        productList.addEventListener("click", function (event) {

            if (event.target.classList.contains("product-image")) {

                lightboxImage.src = event.target.src;
                lightboxImage.alt = event.target.alt;

                lightbox.style.display = "flex";
            }
        });


        closeButton.addEventListener("click", function () {
            lightbox.style.display = "none";
        });


        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                lightbox.style.display = "none";
            }
        });
    }


    const enquiryForm =
        document.getElementById("enquiryForm");


    if (enquiryForm) {

        enquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name").value.trim();

            const surname =
                document.getElementById("surname").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const subject =
                document.getElementById("subject").value;

            const message =
                document.getElementById("message").value.trim();

            const enquiryResponse =
                document.getElementById("enquiryResponse");


            if (
                name === "" ||
                surname === "" ||
                email === "" ||
                phone === "" ||
                subject === "" ||
                message === ""
            ) {

                alert("Please complete all the required fields.");
                return;
            }


            let response = "";


            if (subject === "products") {

                response =
                    "Thank you, " + name +
                    ". We currently offer Colourful Gummies, Mixed Sweets and Fruit Flavoured Sweets.";

            } else if (subject === "orders") {

                response =
                    "Thank you, " + name +
                    ". Orders can be collected or delivered.";

            } else if (subject === "pricing") {

                response =
                    "Thank you, " + name +
                    ". Our sweets range from R35 to R40 per 100g.";

            } else {

                response =
                    "Thank you, " + name +
                    ". Your enquiry has been received.";
            }


            if (enquiryResponse) {
                enquiryResponse.textContent = response;
            } else {
                alert(response);
            }


            enquiryForm.reset();
        });
    }


    const orderForm =
        document.getElementById("orderForm");


    if (orderForm) {

        orderForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const customerName =
                document.getElementById("customerName").value.trim();

            const email =
                document.getElementById("orderEmail").value.trim();

            const phone =
                document.getElementById("orderPhone").value.trim();

            const sweet =
                document.getElementById("sweet").value;

            const quantity =
                Number(document.getElementById("quantity").value);

            const method =
                document.getElementById("method").value;


            if (
                customerName === "" ||
                email === "" ||
                phone === "" ||
                sweet === "" ||
                quantity === 0 ||
                method === ""
            ) {

                alert(
                    "Please complete all the required order fields."
                );

                return;
            }


            if (quantity < 1) {

                alert(
                    "Please enter a quantity of at least 1."
                );

                return;
            }


            let price = 0;


            products.forEach(function (product) {

                if (product.name === sweet) {
                    price = product.price;
                }
            });


            const total = price * quantity;


            alert(
                "Thank you, " +
                customerName +
                "! Your order request has been received. Estimated total: R" +
                total
            );


            orderForm.reset();
        });
    }


    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const name =
                document.getElementById("contactName").value.trim();

            const email =
                document.getElementById("contactEmail").value.trim();

            const phone =
                document.getElementById("contactPhone").value.trim();

            const subject =
                document.getElementById("contactSubject").value.trim();

            const message =
                document.getElementById("contactMessage").value.trim();

            const contactResponse =
                document.getElementById("contactResponse");


            if (
                name === "" ||
                email === "" ||
                phone === "" ||
                subject === "" ||
                message === ""
            ) {

                alert("Please complete all the contact fields.");
                return;
            }


            if (contactResponse) {

                contactResponse.textContent =
                    "Thank you, " +
                    name +
                    ". Your message has been prepared for O Sweets.";
            }


            const emailSubject =
                encodeURIComponent(subject);

            const emailBody =
                encodeURIComponent(
                    "Name: " + name +
                    "\nEmail: " + email +
                    "\nPhone: " + phone +
                    "\n\nMessage:\n" + message
                );


            window.location.href =
                "mailto:info@osweets.co.za?subject=" +
                emailSubject +
                "&body=" +
                emailBody;
        });
    }

});