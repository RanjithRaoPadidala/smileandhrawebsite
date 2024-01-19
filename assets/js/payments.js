localStorage.removeItem("appliedPromoDetails");
function getPaymentValues(application_type = "COLLEGE", promoCodeDiscount = 0) {
  let original_fees = application_type === "COLLEGE" ? 9990 : 19990;
  let original_gst = Math.ceil(original_fees * (18 / 100));
  let original_total_payment = original_fees + original_gst;
  let pass_fees = original_fees;
  if (promoCodeDiscount > 0) {
    pass_fees = Math.ceil(
      original_fees - original_fees * (promoCodeDiscount / 100)
    );
  }
  let gst_fees = Math.ceil(pass_fees * (18 / 100));
  let total_payment = pass_fees + gst_fees;
  if (document.getElementById("registration-fee")) {
    document.getElementById("registration-fee").innerHTML =
      formattedPrice(pass_fees);
  }
  if (document.getElementById("registration-gstfee")) {
    document.getElementById("registration-gstfee").innerHTML =
      formattedPrice(gst_fees);
  }
  if (document.getElementById("registration-totalfee")) {
    document.getElementById("registration-totalfee").innerHTML =
      formattedPrice(total_payment);
  }
  if (promoCodeDiscount > 0) {
    if (document.getElementById("registration-oldfee")) {
      document.getElementById("registration-oldfee").innerHTML =
        formattedPrice(original_fees);
    }
    if (document.getElementById("registration-oldtotalfee")) {
      document.getElementById("registration-oldtotalfee").innerHTML =
        formattedPrice(original_total_payment);
    }
  }
  return {
    original_fees,
    original_total_payment,
    pass_fees,
    gst_fees,
    total_payment,
  };
}
function formattedPrice(number) {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
let paymentForm = document.getElementById("paymentForm");
if (paymentForm) {
  paymentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const regDetails = JSON.parse(localStorage.getItem("Registrationdetails"));
    const application_type = localStorage.getItem("application_type");
    // const promoCode = document.getElementById("promoCodeInput");
    console.log(
      "newPayment variable regDetails:",
      regDetails.info.registration_id,
      application_type
      // promoCode.value
    );
    let total_payment = 23589;
    const appliedPromoDetails = localStorage.getItem("appliedPromoDetails")
      ? JSON.parse(localStorage.getItem("appliedPromoDetails"))
      : null;
    console.log(appliedPromoDetails);
    if (!appliedPromoDetails) {
      total_payment = getPaymentValues(application_type).total_payment;
    }
    console.log(
      JSON.stringify({
        registration_id: regDetails.info.registration_id,
        amount: appliedPromoDetails
          ? appliedPromoDetails.total_payment
          : total_payment,
        coupon_code: appliedPromoDetails ? appliedPromoDetails.coupon_code : "",
      })
    );
    const response = await fetch(
      "https://api.smileandhra.in/api/payment/initiate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registration_id: regDetails.info.registration_id,
          amount: appliedPromoDetails
            ? appliedPromoDetails.total_payment
            : total_payment,
          coupon_code: appliedPromoDetails
            ? appliedPromoDetails.coupon_code
            : "",
        }),
      }
    );
    const res_obj = await response.json();
    console.log("newPayment variable res_obj:", res_obj);
    localStorage.setItem("payment_initiate", JSON.stringify(res_obj?.info));
    window.location.href = res_obj.info.pay_page_url;
    console.log(
      "newPayment variable  window.location.href:",
      window.location.href
    );
  });
}
registration_response = localStorage.getItem("Registrationdetails");
application_type = localStorage.getItem("application_type");
console.log(registration_response);
if (registration_response) {
  // id="registration-name"
  reg_details = JSON.parse(registration_response)?.info;
  console.log(`${reg_details.firstname} ${reg_details.lastname}`);
  console.log(`${reg_details.gst} ${reg_details.investor_name}`);
  let userName = `${reg_details.firstname} ${reg_details.lastname}`;
  let gstin = reg_details.gst;
  let ref_no = reg_details.application_reference;
  let source = "";
  // let pass_fees = application_type === "COLLEGE" ? "₹9,990" : "₹19,990";
  // let gst_fees = application_type === "COLLEGE" ? "₹1,798" : "₹3,599";
  // let total_payment = application_type === "COLLEGE" ? "₹11,788" : "₹23,589";
  // let { pass_fees, gst_fees, total_payment } =
  getPaymentValues(application_type);
  if (application_type === "INVESTOR") {
    source = reg_details.investor_name;
  } else if (application_type === "ENTERPRISE") {
    source = reg_details.enterprise;
  } else if (application_type === "COLLEGE") {
    source = reg_details.college_name;
  } else if (application_type === "STARTUP") {
    source = reg_details.startup_name;
  } else if (application_type === "MSME") {
    source = reg_details.msme;
  }
  if (document.getElementById("registration-ref-no")) {
    document.getElementById("registration-ref-no").innerHTML = ref_no;
  }
  if (document.getElementById("registration-name")) {
    document.getElementById("registration-name").innerHTML = userName;
  }
  if (document.getElementById("registration-gst")) {
    document.getElementById("registration-gst").innerHTML = gstin;
  }
  if (document.getElementById("registration-source")) {
    document.getElementById("registration-source").innerHTML = source;
  }
}
async function applyPromoCode() {
  console.log("promocode clicked");
  const promoCodeStatus = document.getElementById("promoCodeStatus");
  const promoCode = document.getElementById("promoCodeInput");
  let promoCodeValue = promoCode.value ? promoCode.value.toUpperCase() : "";
  if (!promoCodeValue) {
    return;
  }
  const removePromo = document.getElementById("removePromo");
  const applyPromo = document.getElementById("applyPromo");
  console.log(promoCodeValue);
  const response = await fetch("https://api.smileandhra.in/api/applyCode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      coupon_code: promoCodeValue,
    }),
  });
  const res_obj = await response.json();
  console.log("promo code  variable res_obj:", res_obj);
  if (
    res_obj?.success &&
    res_obj?.info?.coupon_code === promoCodeValue &&
    // application_type === res_obj?.info?.application_type &&
    +res_obj?.info?.usages > 0 &&
    +res_obj?.info?.discount_percentage
  ) {
    let promoCodePrices = getPaymentValues(
      application_type,
      +res_obj?.info?.discount_percentage
    );
    console.log(
      JSON.stringify({
        ...res_obj.info,
        ...promoCodePrices,
      })
    );
    localStorage.setItem(
      "appliedPromoDetails",
      JSON.stringify({
        ...res_obj.info,
        ...promoCodePrices,
      })
    );
    promoCodeStatus.innerHTML = "";
    removePromo.style.display = "block";
    applyPromo.classList.add("disabled");
    applyPromo.innerHTML = "APPLIED";
    applyPromo.style["pointer-events"] = "none";
    applyPromo.style["cursor"] = "default";
    promoCode.readOnly = true;
    promoCode.style.color = "#808080";
  } else {
    promoCodeStatus.innerHTML = `Invalid PromoCode ${promoCodeValue}`;
    promoCodeStatus.style.color = "red";
    applyPromo.innerHTML = "APPLY";
  }
}
function resetPromoCode() {
  localStorage.removeItem("appliedPromoDetails");
  getPaymentValues(application_type, 0);
  const promoCodeStatus = document.getElementById("promoCodeStatus");
  const promoCode = document.getElementById("promoCodeInput");
  const removePromo = document.getElementById("removePromo");
  const applyPromo = document.getElementById("applyPromo");
  console.log(promoCode.value);
  promoCodeStatus.innerHTML = "";
  promoCode.value = "";
  removePromo.style.display = "none";
  applyPromo.innerHTML = "APPLY";
  applyPromo.style["pointer-events"] = "auto";
  applyPromo.style["cursor"] = "pointer";
  promoCode.readOnly = false;
  promoCode.style.color = "black";
  if (document.getElementById("registration-oldfee")) {
    document.getElementById("registration-oldfee").innerHTML = "";
  }
  if (document.getElementById("registration-oldtotalfee")) {
    document.getElementById("registration-oldtotalfee").innerHTML = "";
  }
}
