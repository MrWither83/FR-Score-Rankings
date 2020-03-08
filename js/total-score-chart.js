function loadTotalScoreChart() {

    var ctx = document.getElementById("total-score-chart").getContext('2d');

    let updateDates = getAllUpdateDates();

    let totalScoreList = [];

    updateDates.forEach(date => { totalScoreList.push(getTotalScore(date)) })

    var config = {
        type: 'line',
        data: {
            labels: updateDates,
            datasets: [{
                label: 'Score Total en Milliards',
                backgroundColor: 'rgba(144, 230, 137, 1)',
                borderColor: 'rgba(144, 230, 137, 1)',
                data: totalScoreList,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Score Total des joueurs FR du top 10000 Global en Milliards',
                fontSize: 16
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Score Total en Milliards'
                    }
                }]
            }
        }
    };

    var totalScoreChart = new Chart(ctx, config);

}