console.log('sanity check');

const request = (url, callback) => {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener('load', callback);
  oReq.addEventListener('error', e => {
    console.log(e);
  });
  oReq.open('GET', url);
  oReq.send();
};

url = 'https://www.reddit.com/r/boardgames.json';

/*
Dynamically create and populate posts into a group of contentBox.
Each content box should include a thumbnail (if available), title, author, and caption or 
shortened version of posts. When the box is clicked on it should expand showing the entire post.
*/

const requestListener = url => {
  request(url, function() {
    const data = JSON.parse(this.responseText);
    console.log(this);
    const contentContainer = document.getElementById('content_container');
    data.data.children.forEach(element => {
      //variables for data collection
      const title = element.data.title;
      const selfTextData = element.data.selftext;
      const author = element.data.author;
      const submittedUtc = element.data.created_utc;
      const defaultImage = 'http://placezombie.com/300x200';
      const image = element.data.preview
        ? element.data.preview.images[0].source.url.replace('&amp;', '&')
        : defaultImage;
      //create dom elements to connect variables to
      //create contentBox which is the parent element for posts
      const contentBox = document.createElement('div');
      contentBox.className = 'content_box';
      contentContainer.appendChild(contentBox);

      //create image element and put images into contentBox
      const imageBox = document.createElement('IMG');
      imageBox.className = 'image_box';
      imageBox.src = image;
      contentBox.appendChild(imageBox);

      //create title content
      const titleText = document.createElement('div');
      titleText.className = 'title_text';
      contentBox.appendChild(titleText);
      titleText.innerHTML = title;

      //this function calculates the time when the post was submitted and displays it along with the author
      const calculatetime = submittedUtc => {
        const submittedDate = new Date(submittedUtc * 1000);
        const todaysDate = new Date();
        const howLongAgo = todaysDate - submittedDate;
        //convert difference from posted and today's date into a readable time
        let seconds = Math.floor(howLongAgo / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        //convert days into years with days left over
        while (days > 365) {
          let years = Math.floor(days / 365);
          days = days % 365;
          return `Submitted ${years} years and ${days} days ago by ${author}`;
        }
        //convert hours into days with hours left over
        if (hours > 24) {
          days = Math.floor(hours / 24);
          hours = hours % 24;
          return `Submitted ${days} days and ${hours} hours ago by ${author}`;
        }
        //convert minutes into hours with minutes left over
        while (minutes > 60) {
          hours = Math.floor(minutes / 60);
          minutes = minutes % 60;
          return `Submitted ${hours} hours and ${minutes} minutes ago by ${author}`;
        }
        //convert seconds into minutes with seconds left over
        while (seconds > 60) {
          minutes = Math.floor(seconds / 60);
          seconds = seconds % 60;
          return `Submitted ${minutes} hours and ${seconds} minutes ago by ${author}`;
        }
      };

      //create author content
      const authorTimeText = document.createElement('div');
      authorTimeText.className = 'author_text';
      contentBox.appendChild(authorTimeText);
      authorTimeText.innerHTML = calculatetime(submittedUtc);

      //create text content of each post
      const postText = document.createElement('p');
      postText.className = 'post_text';
      contentBox.appendChild(postText);
      postText.innerHTML = selfTextData;
    }); //end of forEach loop
  });
};
requestListener(url);

const deleteContentContainer = () => {
  const mainContainer = document.getElementById('main_container');
  contentContainer = document.getElementById('content_container');
  mainContainer.removeChild(contentContainer);
};

const createContentContainer = () => {
  const contentContainer = document.createElement('div');
  contentContainer.id = 'content_container';
  contentContainer.className = 'content_container';
  mainContainer = document.getElementById('main_container');
  mainContainer.appendChild(contentContainer);
};

const getApp = document.getElementById('get_app');
getApp.addEventListener('click', function() {
  deleteContentContainer();
  createContentContainer();
  requestListener('https://www.reddit.com/r/reactjs.json');
});

const myBoards = document.getElementById('my_boards');
myBoards.addEventListener('click', function() {
  deleteContentContainer();
  createContentContainer();
  requestListener('https://www.reddit.com/r/boardgames.json');
});

const random = document.getElementById('random');
random.addEventListener('click', function() {
  requestListener('https://www.reddit.com/r/random.json');
});
