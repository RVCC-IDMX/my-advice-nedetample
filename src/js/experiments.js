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
