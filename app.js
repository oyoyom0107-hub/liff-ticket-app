document.addEventListener("DOMContentLoaded", async () => {
  await liff.init({ liffId: "2011312761-qIfAiMMa" });


  if (!liff.isLoggedIn()) {
    liff.login();
  }
});

async function createTicket() {
  try {
    const profile = await liff.getProfile();
    const userId = profile.userId;

    const res = await fetch("https://matchpoint-app.onrender.com/create_ticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        ticket_code: crypto.randomUUID()
      })
    });

    const data = await res.json();
    document.getElementById("result").innerText =
      `チケット発行成功！コード: ${data.ticket_code}`;

  } catch (err) {
    console.error(err);
    document.getElementById("result").innerText = "エラーが発生しました";
  }
}
