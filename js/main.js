const rankingDataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTFk1cMN1qqi08Rm6Gj--Z2ygEV0uuVCp0GPCHZGDgGQrz-NtgIpzw-CviDpCNBc-I4KZwlfhspgkK8/pub?output=csv";
let rankingData;

function loadData() {
    Papa.parse(rankingDataUrl, {
        download: true,
        header: true,
        complete: function(results) {
            rankingData = results;
        }
    });
}

function getPlayerData(name) {
    let playerData = [];
    rankingData.data.forEach(player => {
        if (player["Name"] == name) {
            playerData.push(player);
        }
    });
    return playerData;
}

function getPlayerCurrentRank(playerData) {
    let rank = playerData[playerData.length() - 1]["Rank"]
    return rank;
}

loadData();