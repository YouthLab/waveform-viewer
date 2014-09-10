# waveform-viewer

display waveforms from audio files in the browser

![waveform](example/waveform.png)

# example

``` js
var dragDrop = require('drag-drop');
var viewer = require('waveform-viewer');

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
```

# methods

``` js
var viewer = require('waveform-viewer')
```

## var v = viewer(opts)

Create a new waveform viewer. Options are:

* `opts.width` - viewer width, default: `800`
* `opts.height` - viewer height, default: `100`
* `opts.samples` - number of samples in the waveform graph, default: `100`
* `opts.label` - label text to show above the waveform
* `opts.fontSize` - size of the label font, default: `15`
* `opts.colors.waveform` - color of the waveform body, default: `'purple'`
* `opts.colors.text` - color of the label, default: `'purple'`
* `opts.colors.waveformHover` - color of the waveform body while hovering,
default: `'cyan'`
* `opts.colors.textHover` - color of the label while hovering, default: `'cyan'`

## v.load(arrayBuffer)

Load audio data into the waveform viewer from an array buffer.

## v.appendTo(target)

Append the viewer `v` to an html element or css selector string `target`.

## var sel = v.select(opts)

Create a selected region that overlays the waveform data.

Options are:

* `opts.start` - start of the selection in pixels
* `opts.end` -  end of the selection in pixels
* `opts.fill` - color to fill the selected region

## sel.remove()

Remove the selected region created with `v.select()`.

# events

## v.element.on(evname, function (ev) {})

When mouse event happens on the viewer, the event is forwarded with the
underlying `ev` object.

# install

With [npm](https://npmjs.org) do:

```
npm install waveform-viewer
```

To use in the browser, compile with [browserify](http://browserify.org) or fetch
a UMD bundle from [browserify cdn](http://wzrd.in).

# license

MIT
