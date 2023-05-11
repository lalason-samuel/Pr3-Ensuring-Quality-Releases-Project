/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 6;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9724074074074074, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.98, 500, 1500, "authors POST"], "isController": false}, {"data": [0.995, 500, 1500, "activities DELETE "], "isController": false}, {"data": [1.0, 500, 1500, "users DELETE"], "isController": false}, {"data": [0.985, 500, 1500, "coverPhotos all GET"], "isController": false}, {"data": [0.975, 500, 1500, "coverPhotosCoverPhotosForBook  GET"], "isController": false}, {"data": [0.88, 500, 1500, "authors all GET"], "isController": false}, {"data": [0.97, 500, 1500, "authors DELETE"], "isController": false}, {"data": [0.995, 500, 1500, "users all GET"], "isController": false}, {"data": [0.995, 500, 1500, "books PUT"], "isController": false}, {"data": [0.975, 500, 1500, "books POST"], "isController": false}, {"data": [0.98, 500, 1500, "activities GET"], "isController": false}, {"data": [0.98, 500, 1500, "activities PUT "], "isController": false}, {"data": [0.97, 500, 1500, "authors PUT"], "isController": false}, {"data": [0.965, 500, 1500, "books GET"], "isController": false}, {"data": [0.975, 500, 1500, "books DELETE"], "isController": false}, {"data": [1.0, 500, 1500, "coverPhotos POST"], "isController": false}, {"data": [0.995, 500, 1500, "users PUT"], "isController": false}, {"data": [0.995, 500, 1500, "users POST"], "isController": false}, {"data": [0.94, 500, 1500, "authors GET"], "isController": false}, {"data": [0.995, 500, 1500, "users GET"], "isController": false}, {"data": [0.97, 500, 1500, "activities POST"], "isController": false}, {"data": [1.0, 500, 1500, "coverPhotos GET"], "isController": false}, {"data": [0.81, 500, 1500, "books all GET"], "isController": false}, {"data": [0.985, 500, 1500, "coverPhotos DELETE"], "isController": false}, {"data": [0.99, 500, 1500, "coverPhotos PUT"], "isController": false}, {"data": [0.965, 500, 1500, "activities all GET"], "isController": false}, {"data": [0.99, 500, 1500, "authorsAuthorsForBook GET "], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2700, 0, 0.0, 265.14444444444473, 83, 803, 435.0, 506.9499999999998, 603.9899999999998, 250.53354365778975, 1569.1208164667812, 56.78597215134082], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["authors POST", 100, 0, 0.0, 271.1700000000001, 87, 736, 394.9, 498.29999999999984, 735.0699999999995, 15.071590052750565, 3.711967784476262, 4.241828372268275], "isController": false}, {"data": ["activities DELETE ", 100, 0, 0.0, 231.54999999999995, 84, 516, 374.0, 414.84999999999997, 515.8299999999999, 17.97268152408339, 2.123725062904385, 3.599801738856937], "isController": false}, {"data": ["users DELETE", 100, 0, 0.0, 190.67000000000004, 84, 482, 373.80000000000007, 438.69999999999993, 481.99, 18.68460388639761, 2.20784870142003, 3.6511613649103136], "isController": false}, {"data": ["coverPhotos all GET", 100, 0, 0.0, 322.24000000000007, 107, 575, 465.8, 482.95, 574.3599999999997, 14.01541695865452, 283.52942142606867, 2.491021373510862], "isController": false}, {"data": ["coverPhotosCoverPhotosForBook  GET", 100, 0, 0.0, 248.91999999999993, 94, 659, 387.0, 502.0999999999991, 657.9499999999995, 14.322543683758235, 4.116332623173876, 2.756809921942137], "isController": false}, {"data": ["authors all GET", 100, 0, 0.0, 393.5600000000001, 185, 658, 570.8, 604.9, 657.93, 15.386982612709648, 716.0850767906601, 2.6746903369749195], "isController": false}, {"data": ["authors DELETE", 100, 0, 0.0, 289.12000000000006, 86, 677, 432.9, 518.9, 675.8499999999995, 14.03705783267827, 1.6586757790567097, 2.770399792953397], "isController": false}, {"data": ["users all GET", 100, 0, 0.0, 222.46000000000004, 87, 650, 372.9, 426.2499999999996, 648.4599999999992, 15.015015015015015, 10.557432432432432, 2.5807057057057055], "isController": false}, {"data": ["books PUT", 100, 0, 0.0, 273.3300000000001, 95, 526, 396.5, 460.95, 525.6099999999998, 13.888888888888888, 4.585774739583333, 5.183919270833333], "isController": false}, {"data": ["books POST", 100, 0, 0.0, 284.7099999999999, 118, 563, 429.9, 499.5999999999997, 562.6299999999998, 14.05283867341203, 4.63990698777403, 5.312357275857224], "isController": false}, {"data": ["activities GET", 100, 0, 0.0, 223.07999999999996, 86, 537, 388.5, 435.34999999999985, 536.81, 20.798668885191347, 5.841501143926789, 3.7189807352329454], "isController": false}, {"data": ["activities PUT ", 100, 0, 0.0, 232.77999999999997, 86, 565, 369.5, 468.64999999999924, 564.89, 18.38235294117647, 5.067713120404411, 5.62600528492647], "isController": false}, {"data": ["authors PUT", 100, 0, 0.0, 305.45, 87, 672, 467.9000000000001, 544.6999999999999, 671.93, 14.566642388929353, 3.5876046977421705, 4.030009559359067], "isController": false}, {"data": ["books GET", 100, 0, 0.0, 323.1299999999998, 131, 570, 456.8, 544.5999999999997, 569.8499999999999, 13.596193065941536, 8.832347255268525, 2.3647285010197145], "isController": false}, {"data": ["books DELETE", 100, 0, 0.0, 259.9200000000001, 93, 528, 409.9000000000001, 501.1499999999996, 527.93, 14.017381553125876, 1.656350749929913, 2.739138719512195], "isController": false}, {"data": ["coverPhotos POST", 100, 0, 0.0, 245.22, 86, 482, 368.9, 429.69999999999993, 481.65999999999985, 14.45086705202312, 3.461716492052023, 3.8991939125722546], "isController": false}, {"data": ["users PUT", 100, 0, 0.0, 191.30999999999995, 86, 554, 330.6, 436.64999999999947, 553.1599999999996, 17.89228842368939, 4.3350358964036495, 4.791079575952764], "isController": false}, {"data": ["users POST", 100, 0, 0.0, 198.22999999999988, 83, 503, 318.70000000000005, 404.39999999999986, 502.7999999999999, 17.271157167530223, 4.184545012953368, 4.639936852331606], "isController": false}, {"data": ["authors GET", 100, 0, 0.0, 282.25, 86, 671, 520.7, 530.95, 669.9399999999995, 16.630633627141197, 4.3249391942458, 2.9249776525860636], "isController": false}, {"data": ["users GET", 100, 0, 0.0, 210.04000000000005, 83, 679, 360.8, 414.6499999999999, 676.889999999999, 15.659254619480114, 3.7664789187284686, 2.72354809348575], "isController": false}, {"data": ["activities POST", 100, 0, 0.0, 229.29000000000008, 86, 675, 395.6, 513.95, 674.5999999999998, 19.692792437967704, 5.42897979027176, 6.005917068727845], "isController": false}, {"data": ["coverPhotos GET", 100, 0, 0.0, 244.0100000000001, 88, 470, 378.9, 397.9, 469.8299999999999, 14.104372355430185, 4.026082069816643, 2.535756787729196], "isController": false}, {"data": ["books all GET", 100, 0, 0.0, 445.9699999999999, 226, 803, 585.5, 654.7499999999998, 802.7299999999999, 13.48435814455232, 1253.9194183185004, 2.31762405609493], "isController": false}, {"data": ["coverPhotos DELETE", 100, 0, 0.0, 243.93999999999997, 88, 612, 400.8, 472.49999999999966, 611.9499999999999, 14.684287812041116, 1.7351551027900147, 2.9554997246696035], "isController": false}, {"data": ["coverPhotos PUT", 100, 0, 0.0, 255.7400000000001, 95, 558, 402.6, 429.69999999999993, 557.8699999999999, 14.341029685931451, 3.435404865194321, 3.828942886849276], "isController": false}, {"data": ["activities all GET", 100, 0, 0.0, 292.59999999999985, 170, 647, 445.8000000000001, 545.6499999999999, 646.5699999999998, 20.764119601328904, 61.746286791424424, 3.670220359219269], "isController": false}, {"data": ["authorsAuthorsForBook GET ", 100, 0, 0.0, 248.21000000000004, 85, 547, 402.40000000000003, 448.2999999999996, 546.7699999999999, 17.319016279875303, 7.027393812781434, 3.282833066331832], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Percentile 1
            case 8:
            // Percentile 2
            case 9:
            // Percentile 3
            case 10:
            // Throughput
            case 11:
            // Kbytes/s
            case 12:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2700, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
