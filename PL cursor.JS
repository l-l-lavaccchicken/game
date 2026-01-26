(function() {
    const style = document.createElement('style');
    document.head.appendChild(style);

    const apply = (url) => {
        style.innerHTML = `* { cursor: url("${url}") 16 16, auto !important; } a, button { cursor: url("${url}") 16 16, pointer !important; }`;
    };

    // Auto-load from extension sync storage
    chrome.storage.local.get(['pl_cursor'], (res) => {
        if (res.pl_cursor) apply(res.pl_cursor);
    });

    // The GUI (Hidden by default)
    const gui = document.createElement('div');
    gui.style.cssText = 'position:fixed;top:15px;right:15px;z-index:2147483647;background:#111;color:#0f0;padding:15px;border-radius:10px;font-family:monospace;border:2px solid #333;display:none;width:180px;text-align:center;';
    gui.innerHTML = '<div style="font-weight:bold;margin-bottom:10px;">PL TOOLS</div><input type="file" id="plInp" style="font-size:10px;width:100%;color:#ccc;"><button id="plRes" style="margin-top:10px;width:100%;cursor:pointer;">RESET</button>';
    document.body.appendChild(gui);

    document.getElementById('plInp').onchange = (e) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
            apply(ev.target.result);
            chrome.storage.local.set({pl_cursor: ev.target.result});
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    document.getElementById('plRes').onclick = () => {
        style.innerHTML = '';
        chrome.storage.local.remove('pl_cursor');
    };

    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === 'e') {
            e.preventDefault();
            gui.style.display = (gui.style.display === 'none' ? 'block' : 'none');
        }
    });
})();
