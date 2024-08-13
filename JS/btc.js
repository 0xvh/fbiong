

function showPopup(message, address) {
    const popup = document.getElementById('popup-text');
    popup.textContent = `${message}\n\n${address}`;
    popup.style.display = 'block';

    setTimeout(() => {
        popup.style.display = 'none';
    }, 4000); 
}

document.getElementById("copy-btn-text").onclick = function() {
    const btcAddress = document.getElementById("bitcoin-address").value;
    navigator.clipboard.writeText(btcAddress).then(() => {
        showPopup("Solana Address Copied To Clipboard", btcAddress);
    });
};
