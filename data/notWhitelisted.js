// stop loading of the page
window.stop();

// replace page content and title
document.documentElement.innerHTML = '<h1>This page is not whitelisted. Go away!</h1>';
document.title = 'Forbidden website';

// set favicon to null
var link = document.createElement('link');
link.type = 'image/x-icon';
link.rel = 'shortcut icon';
link.href = '';
document.getElementsByTagName('head')[0].appendChild(link);