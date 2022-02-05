export default function downloadMaster(arr, file, csvLink) {    //http://jsfiddle.net/JoeGregoria/nc6hz8ox/
    const date = new Date().toLocaleDateString()
    let csv = ConvertToCSV(arr)
    const fileName = `notes ${date}.csv`;

    var isMac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (!isMac) {
        var BOM = "\ufeff";
        csv = BOM + csv;
    }
    var blob = new Blob([csv], {
        encoding: "UTF-8",
        type: "text/csv;charset=UTF-8"
    });
    var blobUrl = window.URL.createObjectURL(blob);

    if (!window.navigator.msSaveOrOpenBlob) {
        csvLink.href = blobUrl;
        csvLink.download = fileName;
    }
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else if (isSafari) {
        alert("This is safari.");
        window.open('data:attachment/csv;charset=utf-8,' + encodeURI(csv));
    }
}

function ConvertToCSV(objArray) {   //https://stackoverflow.com/questions/11257062/converting-json-object-to-csv-format-in-javascript
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            line += index === 'content' ? `"""${array[i][index]}"""` : array[i][index];
            line += ','
        }
        str += line + '\r\n';
    }
    if (objArray.length === 0) {
        alert("file is empty")
        return ' '
    }
    let key = Object.keys(objArray[0])
    let keyStr = ''
    for (let i = 0; i < key.length; i++) {
        if (i === key.length - 1) keyStr += key[i] + "\n"
        else keyStr += key[i] + ','
    }
    return str = keyStr + str;
}
