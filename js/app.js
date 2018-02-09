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
    const contentContainer = document.getElementById('content_container');
    data.data.children.forEach(element =>{
        const title = element.data.title;
        const selfTextData = element.data.selftext;
        const author = element.data.author;
        const permalink = element.data.permalink;
        let contentBox = document.createElement('div');
        contentBox.className='content_box';
        contentContainer.appendChild(contentBox);
        let t = document.createTextNode(selfTextData);
        contentBox.appendChild(t);   
    })
   


});
