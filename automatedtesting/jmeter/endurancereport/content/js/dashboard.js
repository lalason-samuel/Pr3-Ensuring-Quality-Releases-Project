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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9293943052620988, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.8758344459279038, 500, 1500, "authors POST"], "isController": false}, {"data": [0.9646666666666667, 500, 1500, "activities DELETE "], "isController": false}, {"data": [0.9758522727272727, 500, 1500, "users DELETE"], "isController": false}, {"data": [0.9470827679782904, 500, 1500, "coverPhotos all GET"], "isController": false}, {"data": [0.9488403819918144, 500, 1500, "coverPhotosCoverPhotosForBook  GET"], "isController": false}, {"data": [0.858, 500, 1500, "authors all GET"], "isController": false}, {"data": [0.8902275769745649, 500, 1500, "authors DELETE"], "isController": false}, {"data": [0.9553695955369595, 500, 1500, "users all GET"], "isController": false}, {"data": [0.9425675675675675, 500, 1500, "books PUT"], "isController": false}, {"data": [0.9566982408660352, 500, 1500, "books POST"], "isController": false}, {"data": [0.9633821571238349, 500, 1500, "activities GET"], "isController": false}, {"data": [0.9600532623169108, 500, 1500, "activities PUT "], "isController": false}, {"data": [0.8969210174029452, 500, 1500, "authors PUT"], "isController": false}, {"data": [0.865047233468286, 500, 1500, "books GET"], "isController": false}, {"data": [0.9613297150610584, 500, 1500, "books DELETE"], "isController": false}, {"data": [0.9365517241379311, 500, 1500, "coverPhotos POST"], "isController": false}, {"data": [0.9808781869688386, 500, 1500, "users PUT"], "isController": false}, {"data": [0.9788135593220338, 500, 1500, "users POST"], "isController": false}, {"data": [0.904, 500, 1500, "authors GET"], "isController": false}, {"data": [0.9726123595505618, 500, 1500, "users GET"], "isController": false}, {"data": [0.9580559254327563, 500, 1500, "activities POST"], "isController": false}, {"data": [0.9428571428571428, 500, 1500, "coverPhotos GET"], "isController": false}, {"data": [0.7097855227882037, 500, 1500, "books all GET"], "isController": false}, {"data": [0.9486823855755895, 500, 1500, "coverPhotos DELETE"], "isController": false}, {"data": [0.9361263736263736, 500, 1500, "coverPhotos PUT"], "isController": false}, {"data": [0.9375830013280213, 500, 1500, "activities all GET"], "isController": false}, {"data": [0.9386666666666666, 500, 1500, "authorsAuthorsForBook GET "], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 19878, 0, 0.0, 300.37463527517906, 83, 5039, 564.0, 879.0, 2204.209999999999, 165.78953952910365, 1051.6635518488479, 37.579277337071204], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["authors POST", 749, 0, 0.0, 444.5874499332443, 85, 5039, 996.0, 1974.5, 4062.0, 6.4747019821751195, 1.5946499695282716, 1.8222762110891157], "isController": false}, {"data": ["activities DELETE ", 750, 0, 0.0, 228.40533333333337, 85, 1760, 409.6999999999997, 604.6999999999996, 1219.2100000000003, 6.393425853309237, 0.7554731721195485, 1.2805582446423092], "isController": false}, {"data": ["users DELETE", 704, 0, 0.0, 182.13210227272742, 84, 1043, 296.5, 499.0, 906.95, 7.488485390007552, 0.8848698556551893, 1.4633219450383466], "isController": false}, {"data": ["coverPhotos all GET", 737, 0, 0.0, 298.6540027137043, 94, 2066, 505.4000000000001, 937.6000000000004, 1327.58, 7.378559128589163, 149.26538417376656, 1.3114235951203397], "isController": false}, {"data": ["coverPhotosCoverPhotosForBook  GET", 733, 0, 0.0, 246.06139154160962, 84, 1538, 528.4000000000007, 1033.8999999999999, 1179.6399999999999, 7.363060140028729, 2.116151912713082, 1.4172423242860444], "isController": false}, {"data": ["authors all GET", 750, 0, 0.0, 510.3399999999991, 172, 3172, 1178.6999999999994, 2093.2999999999965, 2616.49, 6.440034690320198, 299.5929378177084, 1.1194591551533157], "isController": false}, {"data": ["authors DELETE", 747, 0, 0.0, 469.1097724230259, 85, 4165, 959.6000000000001, 2308.400000000002, 3875.56, 6.695588261656778, 0.7911779098246777, 1.3214571419608123], "isController": false}, {"data": ["users all GET", 717, 0, 0.0, 216.71827057182725, 84, 1073, 448.2000000000005, 649.5000000000001, 921.0200000000006, 7.403659493618603, 5.20569808145058, 1.2725039754656975], "isController": false}, {"data": ["books PUT", 740, 0, 0.0, 295.74459459459445, 86, 3151, 505.5999999999999, 807.3499999999977, 2013.0100000000011, 7.079375101646433, 2.3374382049479094, 2.6423214490715496], "isController": false}, {"data": ["books POST", 739, 0, 0.0, 249.6129905277408, 86, 1991, 436.0, 579.0, 1175.2000000000035, 7.2774183383064, 2.402809013314032, 2.751044851768147], "isController": false}, {"data": ["activities GET", 751, 0, 0.0, 204.8615179760323, 85, 1146, 384.0, 550.4, 902.48, 6.334398906873371, 1.7787408985188808, 1.132644137096298], "isController": false}, {"data": ["activities PUT ", 751, 0, 0.0, 224.6311584553927, 85, 1959, 437.80000000000007, 582.5999999999999, 1096.8000000000025, 6.356434302738937, 1.7523456411661644, 1.9453966767317263], "isController": false}, {"data": ["authors PUT", 747, 0, 0.0, 448.87282463186057, 87, 4483, 954.2, 1755.800000000003, 4164.5599999999995, 6.591312174074172, 1.6233904999514694, 1.823569828092049], "isController": false}, {"data": ["books GET", 741, 0, 0.0, 445.71255060728754, 89, 4219, 714.6000000000005, 1835.6999999999998, 2331.7400000000002, 7.037438030657018, 4.571518943387088, 1.2239909800178548], "isController": false}, {"data": ["books DELETE", 737, 0, 0.0, 230.62415196743567, 86, 1930, 416.20000000000005, 583.9000000000002, 1122.98, 7.34590543018898, 0.86802202837194, 1.4354577143220237], "isController": false}, {"data": ["coverPhotos POST", 725, 0, 0.0, 248.8013793103446, 84, 2384, 546.1999999999999, 854.3999999999999, 1075.48, 7.399091697708833, 1.7724432470531204, 1.9964391871204776], "isController": false}, {"data": ["users PUT", 706, 0, 0.0, 178.97592067988677, 84, 2431, 279.30000000000007, 441.14999999999975, 934.8999999999985, 7.481270332418485, 1.8125945424344858, 2.0032730557704332], "isController": false}, {"data": ["users POST", 708, 0, 0.0, 185.35169491525417, 84, 1067, 317.8000000000002, 486.39999999999964, 960.5099999999981, 7.44072641668068, 1.8027693519316461, 1.9989603804964688], "isController": false}, {"data": ["authors GET", 750, 0, 0.0, 329.62933333333336, 86, 2830, 728.4999999999999, 1177.4999999999993, 1980.0, 6.422112618166873, 1.6701255763846075, 1.1295141430975133], "isController": false}, {"data": ["users GET", 712, 0, 0.0, 191.24016853932574, 85, 913, 368.8000000000002, 514.35, 826.22, 7.417516590442655, 1.784109458505662, 1.2900953331892195], "isController": false}, {"data": ["activities POST", 751, 0, 0.0, 219.53794940079868, 84, 1351, 445.60000000000014, 640.8, 969.6400000000003, 6.335734894629389, 1.7466392158578972, 1.9322564490989926], "isController": false}, {"data": ["coverPhotos GET", 735, 0, 0.0, 263.63129251700644, 85, 1897, 564.3999999999997, 979.3999999999999, 1472.8399999999997, 7.385747015555288, 2.108240995794646, 1.3278427746543269], "isController": false}, {"data": ["books all GET", 746, 0, 0.0, 713.3404825737272, 195, 4433, 1354.8000000000113, 2423.65, 3803.2999999999997, 6.919837485854219, 643.4678887886574, 1.189347067881194], "isController": false}, {"data": ["coverPhotos DELETE", 721, 0, 0.0, 233.06380027739243, 83, 1525, 506.60000000000014, 796.0, 962.3599999999997, 7.380715960158465, 0.8721353820109125, 1.4855122419052689], "isController": false}, {"data": ["coverPhotos PUT", 728, 0, 0.0, 257.5329670329667, 84, 1537, 653.4000000000001, 972.0, 1245.5500000000002, 7.336490980550237, 1.757458209462864, 1.9587739657865564], "isController": false}, {"data": ["activities all GET", 753, 0, 0.0, 296.73837981407695, 168, 1238, 654.2000000000002, 803.7999999999993, 1061.92, 6.290358959793496, 18.708750193180016, 1.111870089572874], "isController": false}, {"data": ["authorsAuthorsForBook GET ", 750, 0, 0.0, 262.3466666666666, 85, 2619, 550.9, 752.3499999999998, 1487.090000000003, 6.4153009203818385, 2.631183882304889, 1.2160253014122215], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 19878, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
