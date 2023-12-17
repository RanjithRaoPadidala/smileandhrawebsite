const myInterval = setInterval(checkTxnStatus, 5000);

async function checkTxnStatus() {
    const payment_initiate = localStorage.getItem("payment_initiate");
    if (payment_initiate) {
        console.log(
            "newPayment variable regDetails:", JSON.parse(payment_initiate)
          );
          let txn_id = JSON.parse(payment_initiate)?.transaction_id;
          console.log(txn_id);
          const response = await fetch(
            `https://api.smileandhra.in/api/payment/status?transaction_id=${txn_id}`,
            {
              method: "GET"
            }
          );
          const res_obj = await response.json();
          console.log("latest payment status res_obj:", res_obj);
          if (res_obj?.success && res_obj?.info){
              if(res_obj?.info?.status === "SUCCESS") {
                  var pending_elem = document.getElementById('payment_pending');
                  if (pending_elem) {
                      pending_elem.style.display = 'none';
                  }
                  var success_elem = document.getElementById('payment_success');
                  if (success_elem) {
                      success_elem.style.display = 'block';
                  }
                  myStopFunction()
              } else if (res_obj?.info?.status === "FAILED") {
                  var pending_elem = document.getElementById('payment_pending');
                  if (pending_elem) {
                      pending_elem.style.display = 'none';
                  }
                  var failed_elem = document.getElementById('payment_failed');
                  if (failed_elem) {
                      failed_elem.style.display = 'block';
                  }
                  myStopFunction()
              }
          }
    } else {
        myStopFunction();
    }
    
}

function myStopFunction() {
  clearInterval(myInterval);
}
