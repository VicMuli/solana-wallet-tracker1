async function checkBalance() {
  const wallet = document.getElementById("wallet").value.trim();
  const resultDiv = document.getElementById("result");

  if (!wallet) {
    resultDiv.textContent = "⚠️ Please enter a wallet address.";
    return;
  }

  resultDiv.textContent = "⏳ Fetching balance...";

  try {
    const res = await fetch(`https://solana-balance-proxy.onrender.com/get-balance?wallet=${wallet}`);
    const data = await res.json();

    if (!("sol" in data)) {
      resultDiv.textContent = `❌ Error: ${data.error || "Invalid response"}`;
      return;
    }

    resultDiv.textContent = `✅ Balance: ${data.sol.toFixed(4)} SOL`;
  } catch (err) {
    console.error(err);
    resultDiv.textContent = "❌ Failed to fetch balance.";
  }
}
