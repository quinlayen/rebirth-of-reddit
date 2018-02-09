console.log('sanity check');

const request = (url, callback) => {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', callback)
    oReq.open('GET', url);
    oReq.send();
}

url = 'https://www.reddit.com/r/boardgames.json'

request(url, function() {
    const data = JSON.parse(this.responseText);
    const content = document.getElementById('content');
    //const mappedTextData = 
    let text = data.data.children[0].data.selftext;
    let t = document.createTextNode(text)
    content.appendChild(t);
})
