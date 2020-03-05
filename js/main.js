const dataUrl = "file:///C:\Users\asus\Documents\GitHub\FR-Score-Rankings\test\data.csv";
let data;

function loadData() {
    Papa.parse(dataUrl, {
        download: true,
        complete: function(results) {
            data = results;
        }
    });
}

loadData()
console.log(data);