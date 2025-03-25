document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                const progress = progressBar.dataset.progress;

                console.log(`Animating: ${progress}%`); // Debugging line
                
                progressBar.style.width = `${progress}%`; // Ensure width is updated
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    });

    const skills = document.querySelectorAll('#programming-languages .skill');
    skills.forEach(skill => observer.observe(skill));
});



const tweets = document.querySelector('.tweets');

const fetchTweets = async () => {
    const res = await fetch(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=[your_screen_name]&count=5`, {
        headers: {
            'Authorization': `Bearer [your_bearer_token]`
        }
    });

    const data = await res.json();

    data.forEach(tweet => {
        const tweetEl = document.createElement('div');
        tweetEl.classList.add('tweet');
        tweetEl.innerHTML = `
            <p>${tweet.text}</p>
            <small>${tweet.created_at}</small>
        `;

        tweets.appendChild(tweetEl);
});
}

fetchTweets();

const toggle = document.getElementById('toggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () =>
    nav.classList.toggle('active')
);