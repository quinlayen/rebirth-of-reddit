console.log('sanity check');

const request = (url, callback) => {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener('load', callback);
  oReq.open('GET', url);
  oReq.send();
};

url = 'https://www.reddit.com/r/boardgames.json';

/*
Dynamically create and populate posts into a group of contentBox.
Each content box should include a thumbnail (if available), title, author, and caption or 
shortened version of posts. When the box is clicked on it should expand showing the entire post.
*/
request(url, function() {
  const data = JSON.parse(this.responseText);
  const contentContainer = document.getElementById('content_container');
  data.data.children.forEach(element => {
    //variables for data collection
    const title = element.data.title;
    const selfTextData = element.data.selftext;
    const author = element.data.author;
    const defaultImage = '../assets/Placeholder.jpg';
    const image = element.data.preview
      ? element.data.preview.images[0].source.url
      : defaultImage;
    const permalink = element.data.permalink;
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

    //create author content
    const authorText = document.createElement('div');
    authorText.className = 'author_text';
    contentBox.appendChild(authorText);
    authorText.innerHTML = author;

    //create text content of each post
    const postText = document.createElement('p');
    postText.className = 'post_text';
    contentBox.appendChild(postText);
    postText.innerHTML = selfTextData;
  }); //end of forEach loop
});

const calculatetime = postedUtc => {
  const postedDate = new Date(postedUtc * 1000);
  const todaysDate = new Date();
  const howLongAgo = todaysDate - postedDate;

  //convert difference from posted and today's date into a readable time
  let seconds = Math.floor(howLongAgo / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  //convert days into years with days left over
  while (days > 365) {
    let years = Math.floor(days / 365);
    days = days % 365;
    return `submitted ${years} years and ${days} days ago`;
  }
  //convert hours into days with hours left over
  if (hours > 24) {
    days = Math.floor(hours / 24);
    hours = hours % 24;
    return `submitted ${days} days and ${hours} hours ago`;
  }

  //convert minutes into hours with minutes left over
  while (minutes > 60) {
    hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return `submitted ${hours} hours and ${minutes} minutes ago`;
  }

  //convert seconds into minutes with seconds left over
  while (seconds > 60) {
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `submitted ${minutes} hours and ${seconds} minutes ago`;
  }
};
console.log(calculatetime(1517937191));
