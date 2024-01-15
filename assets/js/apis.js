async function getSpeakerDetails() {
  const response = await fetch(
    `https://api.smileandhra.in/api/backoffice/speakers`,
    {
      method: "GET",
    }
  );
  const res_obj = await response.json();
  if (res_obj?.success && res_obj?.info) {
  }
}
getSpeakerDetails();
