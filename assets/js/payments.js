let paymentForm = document.getElementById("paymentForm");
if (paymentForm) {
  paymentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const regDetails = JSON.parse(localStorage.getItem("Registrationdetails"));
    const application_type = localStorage.getItem("application_type");
    console.log(
      "newPayment variable regDetails:",
      regDetails.info.registration_id, application_type
    );
    const amount = application_type === "COLLEGE" ? 11788 : 23589;
    const response = await fetch(
      "https://api.smileandhra.in/api/payment/initiate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registration_id: regDetails.info.registration_id,
          amount: amount,
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
  })
}

registration_response = localStorage.getItem("Registrationdetails");
application_type = localStorage.getItem("application_type");
console.log(registration_response)
if (registration_response) {
  // id="registration-name"
  reg_details = JSON.parse(registration_response)?.info;
  console.log(`${reg_details.firstname} ${reg_details.lastname}`);
  console.log(`${reg_details.gst} ${reg_details.investor_name}`);
  let userName = `${reg_details.firstname} ${reg_details.lastname}`;
  let gstin = reg_details.gst;
  let ref_no = reg_details.application_reference;
  let source = "";
  let pass_fees = application_type === "COLLEGE" ? "₹9,990" : "₹19,990";
  let gst_fees = application_type === "COLLEGE" ? "₹1,798" : "₹3,599";
  let total_payment = application_type === "COLLEGE" ? "₹11,788" : "₹23,589";
  if(application_type === "INVESTOR") {
    source = reg_details.investor_name
  } else if(application_type === "ENTERPRISE") {
    source = reg_details.enterprise
  } else if(application_type === "COLLEGE") {
    source = reg_details.college_name
  } else if(application_type === "STARTUP") {
    source = reg_details.startup_name
  } else if(application_type === "MSME") {
    source = reg_details.msme
  }
  
  if(document.getElementById("registration-ref-no")) {
    document.getElementById("registration-ref-no").innerHTML = ref_no;
  }
  if(document.getElementById("registration-name")) {
    document.getElementById("registration-name").innerHTML = userName;
  }
  if(document.getElementById("registration-gst")) {
    document.getElementById("registration-gst").innerHTML = gstin;
  }
  if(document.getElementById("registration-source")) {
    document.getElementById("registration-source").innerHTML = source;
  }
  if(document.getElementById("registration-fee")) {
    document.getElementById("registration-fee").innerHTML = pass_fees;
  }
  if(document.getElementById("registration-gstfee")) {
    document.getElementById("registration-gstfee").innerHTML = gst_fees;
  }
  if(document.getElementById("registration-totalfee")) {
    document.getElementById("registration-totalfee").innerHTML = total_payment;
  }
  

}
