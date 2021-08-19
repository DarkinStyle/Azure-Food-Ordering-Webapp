$(function () {
    if (typeof Storage !== "undefined") {
        
        if (localStorage.getItem('covidDetails') === null) { //No COVID details exists case
            getCovidData();
        } else { //If exists check for updated
            let temp = JSON.parse(localStorage.getItem('covidDetails'));

            //Indicating Different Date => need update
            if (Math.floor((temp[temp.length - 1].Date - new Date()) / (1000 * 60 * 60 * 24)) > 1)
                getCovidData();
        }

        buildChart(JSON.parse(localStorage.getItem('covidDetails')));
    }

    function buildChart(data) {

        var dateLabels = [];
        var dataPoints = [];

        for (let i = data.length - 1; i >= data.length - 6; i--) {

            let tempDate = new Date(Date.parse(data[i].Date));

            let month = tempDate.getMonth() + 1;
            let day = tempDate.getDate();
            let str = `${day}/${month}`;


            dateLabels.unshift(str);
            dataPoints.unshift(data[i].Active);
        }

        var ctx = $('#myChart');

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dateLabels,
                datasets: [{
                    label: '# of Active Cases (Last 5 Days)',
                    data: dataPoints,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: 'white'
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: 'white'
                        }
                    }]
                },
                legend: {
                    labels: {
                        fontColor: 'white'
                    }
                }
            }
        });
    }

    //Call the API to retrieve data
    function getCovidData() {

        let api = `https://api.covid19api.com/total/country/malaysia`;

        $.getJSON(api, function (data) {
            localStorage.setItem('covidDetails', JSON.stringify(data));
        });
    }
});