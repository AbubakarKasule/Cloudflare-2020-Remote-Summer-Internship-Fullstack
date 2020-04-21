addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  /* Javascript array containg the URLs from the fetch */
  let URLs = await getURLs('https://cfw-takehome.developers.workers.dev/api/variants');

  
  /* Ensure 50-50 split for fetch requests */
  let i = Math.random();

  if(Math.random() < 0.5){
    return getURL(URLs[0]);
  } else {
    return getURL(URLs[1]);
  }
}

/* fetch wrapper functions */
async function getURLs(url){
  return fetch(url).then(response => {
      return response.json();
    })
    .then(data => {return data.variants});
}

async function getURL(url){
  return rewriter.transform(await fetch(url))
}

/* Extra Credit option 1 */
class ElementHandler {
  element(element) {
    if (element.tagName == 'title'){
      element.setInnerContent('My Custom Title');
      console.log('check');
    } else if (element.tagName == 'h1'){
      element.setInnerContent('My Custom Title');
      console.log('check');
    } else if (element.tagName == 'p'){
      element.append(' I have added text to its description!');
      console.log('check');
    } else if (element.tagName == 'a'){
      element.setInnerContent('Instead of Cloudflare.com, go to my website that I made for a class!');
      console.log('check');
    }
    
  }

}

class AttributeRewriter {
 
  element(element) {
    if (element.tagName == 'a') {
      element.setAttribute('href', 'https://dartmouth-cs52-20s.github.io/lab1-landingpage-AbubakarKasule');
    }
  }
}

const rewriter = new HTMLRewriter()
  .on('title', new ElementHandler())
  .on('h1#title', new ElementHandler())
  .on('p#description', new ElementHandler())
  .on('a#url', new ElementHandler())
  .on('a#url', new AttributeRewriter('href'));

