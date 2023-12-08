const newPayment = async () => {
  try {
    const merchant_id = "PGTESTPAYUAT";
    const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
    const req = {
      body: {
        MUID: "MUID" + Date.now(),
        transactionId: "T" + Date.now(),
        name: "name",
        amount: 9999,
        number: 1234567890,
      },
    };
    const merchantTransactionId = req.body.transactionId;
    const data = {
      merchantId: merchant_id,
      transactionId: merchantTransactionId,
      merchantUserId: req.body.MUID,
      name: req.body.name,
      amount: req.body.amount * 100,
      redirectUrl: `https://smileandhra.in/`,
      // redirectUrl: `http://localhost:5000/api/status/${merchantTransactionId}`,
      redirectMode: "REDIRECT",
      mobileNumber: req.body.number,
      // paymentInstrument: {
      //   type: "PAY_PAGE",
      // },
    };
    const payload = JSON.stringify(data);
    // const payloadMain = Buffer.from(payload).toString("base64");
    const payloadMain = btoa(payload);
    const keyIndex = 1;
    // const string = payloadMain + "/pg/v1/pay" + salt_key;
    const string = payloadMain + "/v4/debit" + salt_key;
    // const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const sha256 = CryptoJS.SHA256(string).toString(CryptoJS.enc.Hex);
    const checksum = sha256 + "###" + keyIndex;
    // const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-CALLBACK-URL": "https://www.demoMerchant.com/callback",
        "X-VERIFY": checksum,
        "X-REDIRECT-URL": "https://smileandhra.in/",
        "X-REDIRECT-MODE": "HTTP",
      },
      body: JSON.stringify({ request: payloadMain }),
    };
    await fetch("https://mercury-uat.phonepe.com/v4/debit/", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    // const prod_URL = "https://mercury-uat.phonepe.com/v4/debit/";
    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     accept: "application/json",
    //     "Content-Type": "application/json",
    //     "X-CALLBACK-URL": "https://smileandhra.in/",
    //     "X-VERIFY": checksum,
    //     "X-REDIRECT-URL": "https://smileandhra.in/",
    //     "X-REDIRECT-MODE": "HTTP",
    //   },
    //   body: JSON.stringify({ request: payloadMain }),
    //   mode: "cors",
    // };
    // console.log(options);
    // const rawResponse = await fetch(prod_URL, options);
    // const content = await rawResponse.json();
    // console.log(content);
    window.location.href = content.data.instrumentResponse.redirectInfo.url;
  } catch (error) {
    console.log(error);
    // res.status(500).send({
    //   message: error.message,
    //   success: false,
    // });
  }
};
const checkStatus = async (req, res) => {
  const merchantTransactionId = res.req.body.transactionId;
  const merchantId = res.req.body.merchantId;
  const keyIndex = 1;
  const string =
    `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
  const sha256 = crypto.createHash("sha256").update(string).digest("hex");
  const checksum = sha256 + "###" + keyIndex;
  const options = {
    method: "GET",
    url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": `${merchantId}`,
    },
  };
  // CHECK PAYMENT TATUS
  axios
    .request(options)
    .then(async (response) => {
      if (response.data.success === true) {
        console.log(".then variable data:", response.data);
        const url = `http://localhost:3000/success`;
        return res.redirect(url);
      } else {
        const url = `http://localhost:3000/failure`;
        return res.redirect(url);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
setTimeout(newPayment, 5000);
