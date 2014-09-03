var dragDrop = require('drag-drop');
var viewer = require('../');

dragDrop(document.body, function (files) {
    files.forEach(load);
});

function load (file) {
    var wv = viewer({ label: file.name });
    wv.appendTo('#clips');
    
    var reader = new FileReader;
    reader.addEventListener('load', function (ev) {
        wv.load(ev.target.result);
    });
    reader.readAsArrayBuffer(file);
}
