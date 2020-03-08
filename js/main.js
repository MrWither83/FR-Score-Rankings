const rankingDataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTFk1cMN1qqi08Rm6Gj--Z2ygEV0uuVCp0GPCHZGDgGQrz-NtgIpzw-CviDpCNBc-I4KZwlfhspgkK8/pub?output=csv";
let rankingData;

function loadData() {
    Papa.parse(rankingDataUrl, {
        download: true,
        header: true,
        complete: function(results) {
            rankingData = results;
            init();
        }
    });
}

loadData();

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
    let rank = playerData[playerData.length - 1]["Rank"]
    return rank;
}

function getAllUpdateDates() {
    let dates = []
    rankingData.data.forEach(row => {
        rowDate = row["Date"];
        if (dates.indexOf(rowDate) == -1) {
            dates.push(rowDate);
        }
    });
    return dates;
}

function getTotalScore(date) {
    let totalScore = 0;
    rankingData.data.forEach(row => {
        if (row["Date"] == date) {
            totalScore += row["Score"];
        }
    });
    return totalScore;
}

function init() {
    console.log(rankingData);
    loadTotalScoreChart();
}