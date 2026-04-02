// Change text on the page
const paragraph = document.querySelector('p');
paragraph.textContent = 'Get ready to discover your next favorite song!';

// Count recommendations on the page
const getRecommendationsBtn = document.querySelector('#get-recs');
getRecommendationsBtn.addEventListener('click', () => {
  setTimeout(() => {
    const allOptions = document.querySelectorAll('#recommendations .song-card');
    console.log(`This page has ${allOptions.length} recommendations`);
  }, 0);
});

// Create a link as a footer
let footer = document.querySelector('footer');
if (!footer) {
  footer = document.createElement('footer');
  document.body.appendChild(footer);
}
const link = document.createElement('a');
link.href = 'https://github.com/nedetample';
link.textContent = 'Visit my GitHub';
link.target = '_blank';
footer.appendChild(link);

// Modify all cards to have a badge with their index number
const getRecommendationsBttn = document.querySelector('#get-recs');
getRecommendationsBttn.addEventListener('click', () => {
  setTimeout(() => {
    const allOptions = document.querySelectorAll('#recommendations .song-card');
    console.log(`This page has ${allOptions.length} recommendations`);

    allOptions.forEach((card, index) => {
      card.classList.add('experiment-border');
      const badge = document.createElement('span');
      badge.textContent = `#${index + 1}`;
      badge.className = 'card-badge';
      card.prepend(badge);
    });
  }, 0);
});

// Adding a gif for style
const img = document.createElement('img');
img.src = 'src/images/spinningRecord.gif';
img.alt = 'Spinning record animation';
img.classList.add('banner-image');

const subtitle = document.querySelector('p');
if (subtitle) {
  subtitle.after(img);
}
