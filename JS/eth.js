function showPopup(message, address) {
    const popup = document.getElementById('popup-text');
    popup.textContent = `${message}\n\n${address}`;
    popup.style.display = 'block';

    setTimeout(() => {
        popup.style.display = 'none';
    }, 4000); 
}

document.getElementById("copy-btn-text-eth").onclick = function() {
    const ethAddress = document.getElementById("eth-address").value;
    navigator.clipboard.writeText(ethAddress).then(() => {
        showPopup("Ethereum Address Copied To Clipboard:", ethAddress);
    });
};