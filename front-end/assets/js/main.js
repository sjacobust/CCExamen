function prettyPrint() {
    var ugly = document.getElementById('tata').value;
    var obj = JSON.parse(ugly);
    var pretty = JSON.stringify(obj, undefined, 4);
    document.getElementById('tata').value = pretty;
}