/* =========================================================
   DEV LIVE
   Live News + Chat + YouTube
========================================================= */

"use strict";


/* =========================================================
   CONFIG
========================================================= */

const CONFIG = {

    /*
        PUT YOUR REAL YOUTUBE VIDEO ID HERE.

        Example:

        https://www.youtube.com/watch?v=ABC123XYZ

        becomes:

        videoId: "ABC123XYZ"
    */

    videoId: "pykpO5kQJ98",

    hackerNewsAPI:
        "https://hacker-news.firebaseio.com/v0",

    refreshInterval:
        60000,

    maxStories:
        10

};


/* =========================================================
   TECHNOLOGY IMAGES
========================================================= */

const TECHNOLOGY_IMAGES = [

    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85",

    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=85",

    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=900&q=85",

    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85",

    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=85",

    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=85",

    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=85",

    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=85"

];


/* =========================================================
   CHAT USERS
========================================================= */

const CHAT_USERS = [

    "Alex",
    "Maria",
    "Daniel",
    "Sofia",
    "Leo",
    "Emma",
    "Chris",
    "James",
    "Nina",
    "Oliver"

];


const CHAT_MESSAGES = [

    "AI is moving ridiculously fast 🚀",

    "This is exactly the kind of tech news I wanted.",

    "Developers are going to love this.",

    "Anyone else watching from London? 👀",

    "The future of software is changing every week.",

    "That startup story is wild.",

    "Open source is having a huge moment right now.",

    "AI + developers = interesting times.",

    "This newsroom design is 🔥",

    "Cybersecurity is definitely something to watch.",

    "Technology never sleeps.",

    "The live format makes this feel like real TV."

];


/* =========================================================
   DOM
========================================================= */

const liveNews =
    document.getElementById("liveNews");

const storyGrid =
    document.getElementById("storyGrid");

const tickerTrack =
    document.getElementById("tickerTrack");

const breakingHeadline =
    document.getElementById("breakingHeadline");

const apiStatus =
    document.getElementById("apiStatus");

const storyCount =
    document.getElementById("storyCount");

const liveChat =
    document.getElementById("liveChat");

const chatInput =
    document.getElementById("chatInput");

const chatSend =
    document.getElementById("chatSend");

const viewerCount =
    document.getElementById("viewerCount");

const refreshNews =
    document.getElementById("refreshNews");

const youtubePlayer =
    document.getElementById("youtubePlayer");

const youtubeFallback =
    document.getElementById("youtubeFallback");


/* =========================================================
   CLOCK
========================================================= */

function updateClock() {

    const now =
        new Date();

    const time =
        now.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );

    const clock =
        document.getElementById("liveClock");

    const tvTime =
        document.getElementById("tvTime");

    if (clock) {
        clock.textContent = time;
    }

    if (tvTime) {
        tvTime.textContent =
            "LIVE • " + time;
    }

}


setInterval(
    updateClock,
    1000
);

updateClock();


/* =========================================================
   YOUTUBE
========================================================= */

function getYouTubeOrigin() {

    /*
       YouTube Error 153 happens when the embedded
       player doesn't receive HTTP Referer information.

       When running from localhost / GitHub Pages,
       window.location.origin is valid.

       When opening index.html directly using file://,
       there is no proper HTTP origin.
    */

    if (
        window.location.protocol === "http:" ||
        window.location.protocol === "https:"
    ) {

        return window.location.origin;

    }

    return null;

}


function loadYouTube() {

    if (!youtubePlayer) {
        return;
    }


    if (
        !CONFIG.videoId ||
        CONFIG.videoId === "YOUR_VIDEO_ID_HERE"
    ) {

        youtubePlayer.style.display =
            "none";

        youtubeFallback.style.display =
            "flex";

        return;

    }


    const origin =
        getYouTubeOrigin();


    if (!origin) {

        youtubePlayer.style.display =
            "none";

        youtubeFallback.style.display =
            "flex";

        youtubeFallback.innerHTML = `

            <i class="bi bi-exclamation-triangle"></i>

            <strong>DEV LIVE</strong>

            <span>
                Start this website through
                localhost instead of opening
                index.html directly.
            </span>

        `;

        return;

    }


    const params = new URLSearchParams({

        autoplay: "1",

        mute: "1",

        playsinline: "1",

        rel: "0",

        modestbranding: "1",

        enablejsapi: "1",

        origin: origin

    });


    const iframe =
        document.createElement("iframe");


    iframe.id =
        "youtubeIframe";

    iframe.src =
        `https://www.youtube.com/embed/${encodeURIComponent(CONFIG.videoId)}?${params.toString()}`;

    iframe.title =
        "DEV LIVE YouTube Player";

    iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

    iframe.allowFullscreen =
        true;

    iframe.referrerPolicy =
        "strict-origin-when-cross-origin";


    youtubePlayer.innerHTML = "";

    youtubePlayer.appendChild(
        iframe
    );

    youtubePlayer.style.display =
        "block";

    youtubeFallback.style.display =
        "none";

}


loadYouTube();


/* =========================================================
   HACKER NEWS
========================================================= */

async function fetchJSON(url) {

    const response =
        await fetch(url, {
            cache: "no-store"
        });

    if (!response.ok) {
        throw new Error(
            `HTTP ${response.status}`
        );
    }

    return response.json();

}


async function getTopStories() {

    const ids =
        await fetchJSON(
            `${CONFIG.hackerNewsAPI}/topstories.json`
        );


    const selected =
        ids.slice(
            0,
            CONFIG.maxStories
        );


    const stories =
        await Promise.all(

            selected.map(
                async id => {

                    try {

                        return await fetchJSON(
                            `${CONFIG.hackerNewsAPI}/item/${id}.json`
                        );

                    } catch {

                        return null;

                    }

                }
            )

        );


    return stories.filter(
        story =>
            story &&
            story.title &&
            story.url
    );

}


/* =========================================================
   FORMAT TIME
========================================================= */

function timeAgo(timestamp) {

    const seconds =
        Math.floor(
            Date.now() / 1000 -
            timestamp
        );


    if (seconds < 60) {
        return "just now";
    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    if (minutes < 60) {
        return `${minutes} min ago`;
    }


    const hours =
        Math.floor(
            minutes / 60
        );


    if (hours < 24) {
        return `${hours}h ago`;
    }


    const days =
        Math.floor(
            hours / 24
        );


    return `${days}d ago`;

}


/* =========================================================
   DOMAIN
========================================================= */

function getDomain(url) {

    try {

        return new URL(url)
            .hostname
            .replace(
                /^www\./,
                ""
            );

    } catch {

        return "technology";

    }

}


/* =========================================================
   IMAGE
========================================================= */

function getNewsImage(index) {

    return TECHNOLOGY_IMAGES[
        index % TECHNOLOGY_IMAGES.length
    ];

}


/* =========================================================
   LIVE NEWS
========================================================= */

function renderLiveNews(stories) {

    if (!liveNews) {
        return;
    }


    liveNews.innerHTML = "";


    stories
        .slice(0, 6)
        .forEach(
            (story, index) => {

                const card =
                    document.createElement("article");

                card.className =
                    "live-news-card";

                card.style.animationDelay =
                    `${index * 70}ms`;


                card.innerHTML = `

                    <div class="news-image">

                        <img
                            src="${getNewsImage(index)}"
                            alt=""
                            loading="lazy"
                        >

                        <span class="news-image-label">
                            ${index === 0 ? "LIVE" : "TECH"}
                        </span>

                    </div>

                    <div class="news-content">

                        <div class="news-meta">

                            <span>
                                ${getDomain(story.url)}
                            </span>

                            <span>
                                ${timeAgo(story.time)}
                            </span>

                        </div>

                        <h3>
                            ${escapeHTML(story.title)}
                        </h3>

                        <p>
                            ${story.score || 0}
                            points •
                            ${story.descendants || 0}
                            comments
                        </p>

                    </div>

                `;


                card.addEventListener(
                    "click",
                    () => {

                        window.open(
                            story.url,
                            "_blank",
                            "noopener,noreferrer"
                        );

                    }
                );


                liveNews.appendChild(
                    card
                );

            }
        );

}


/* =========================================================
   STORY GRID
========================================================= */

function renderStoryGrid(stories) {

    if (!storyGrid) {
        return;
    }


    storyGrid.innerHTML = "";


    stories
        .slice(0, 6)
        .forEach(
            (story, index) => {

                const card =
                    document.createElement("article");

                card.className =
                    "story-card";

                card.style.animationDelay =
                    `${index * 90}ms`;


                card.innerHTML = `

                    <div class="story-image">

                        <img
                            src="${getNewsImage(index + 2)}"
                            alt=""
                            loading="lazy"
                        >

                    </div>

                    <div class="story-body">

                        <span class="story-category">
                            TECHNOLOGY
                        </span>

                        <h3>
                            ${escapeHTML(story.title)}
                        </h3>

                        <div class="story-footer">

                            <span>
                                ${getDomain(story.url)}
                            </span>

                            <span>
                                ${timeAgo(story.time)}
                            </span>

                        </div>

                    </div>

                `;


                card.addEventListener(
                    "click",
                    () => {

                        window.open(
                            story.url,
                            "_blank",
                            "noopener,noreferrer"
                        );

                    }
                );


                storyGrid.appendChild(
                    card
                );

            }
        );


    if (storyCount) {

        storyCount.textContent =
            `${stories.length} LIVE STORIES`;

    }

}


/* =========================================================
   TICKER
========================================================= */

function updateTicker(stories) {

    if (!tickerTrack) {
        return;
    }


    const headlines =
        stories
            .slice(0, 8)
            .map(
                story =>
                    `● ${story.title}`
            )
            .join(
                "     •     "
            );


    tickerTrack.textContent =
        headlines;


    if (
        breakingHeadline &&
        stories.length
    ) {

        breakingHeadline.textContent =
            stories[0].title;

    }

}


/* =========================================================
   LOAD NEWS
========================================================= */

async function loadNews() {

    try {

        if (apiStatus) {

            apiStatus.textContent =
                "CONNECTING";

            apiStatus.className =
                "signal-status";

        }


        const stories =
            await getTopStories();


        renderLiveNews(
            stories
        );


        renderStoryGrid(
            stories
        );


        updateTicker(
            stories
        );


        if (apiStatus) {

            apiStatus.textContent =
                "CONNECTED";

            apiStatus.classList.add(
                "connected"
            );

        }


    } catch (error) {

        console.error(
            "DEV LIVE news error:",
            error
        );


        if (apiStatus) {

            apiStatus.textContent =
                "OFFLINE";

        }


        if (liveNews) {

            liveNews.innerHTML = `

                <div class="news-error">

                    <i class="bi bi-wifi-off"></i>

                    <strong>
                        Live feed unavailable
                    </strong>

                    <span>
                        Trying again automatically...
                    </span>

                </div>

            `;

        }

    }

}


loadNews();


setInterval(
    loadNews,
    CONFIG.refreshInterval
);


/* =========================================================
   REFRESH BUTTON
========================================================= */

if (refreshNews) {

    refreshNews.addEventListener(
        "click",
        async () => {

            refreshNews.classList.add(
                "rotating"
            );

            await loadNews();

            setTimeout(
                () => {

                    refreshNews.classList.remove(
                        "rotating"
                    );

                },
                500
            );

        }
    );

}


/* =========================================================
   LIVE CHAT
========================================================= */

function createChatMessage(
    username,
    message,
    own = false
) {

    if (!liveChat) {
        return;
    }


    const item =
        document.createElement("div");

    item.className =
        "chat-message" +
        (own ? " own" : "");


    const avatar =
        username
            .charAt(0)
            .toUpperCase();


    item.innerHTML = `

        <div class="chat-avatar">
            ${avatar}
        </div>

        <div class="chat-bubble">

            <div class="chat-user">
                ${escapeHTML(username)}
            </div>

            <div class="chat-text">
                ${escapeHTML(message)}
            </div>

        </div>

    `;


    liveChat.appendChild(
        item
    );


    while (
        liveChat.children.length > 20
    ) {

        liveChat.removeChild(
            liveChat.firstElementChild
        );

    }


    liveChat.scrollTop =
        liveChat.scrollHeight;

}


/* =========================================================
   INITIAL CHAT
========================================================= */

function initialiseChat() {

    if (!liveChat) {
        return;
    }


    const initial =
        CHAT_MESSAGES.slice(
            0,
            7
        );


    initial.forEach(
        (message, index) => {

            createChatMessage(
                CHAT_USERS[index],
                message
            );

        }
    );

}


initialiseChat();


/* =========================================================
   SIMULATED LIVE CHAT
========================================================= */

function addAutomaticChatMessage() {

    const user =
        CHAT_USERS[
            Math.floor(
                Math.random() *
                CHAT_USERS.length
            )
        ];


    const message =
        CHAT_MESSAGES[
            Math.floor(
                Math.random() *
                CHAT_MESSAGES.length
            )
        ];


    createChatMessage(
        user,
        message
    );


    if (viewerCount) {

        const number =
            120 +
            Math.floor(
                Math.random() * 50
            );

        viewerCount.innerHTML = `
            <i class="bi bi-people-fill"></i>
            ${number}
        `;

    }

}


setInterval(
    addAutomaticChatMessage,
    7000
);


/* =========================================================
   SEND CHAT
========================================================= */

function sendChatMessage() {

    if (!chatInput) {
        return;
    }


    const message =
        chatInput.value.trim();


    if (!message) {
        return;
    }


    createChatMessage(
        "You",
        message,
        true
    );


    chatInput.value =
        "";


    chatInput.focus();

}


if (chatSend) {

    chatSend.addEventListener(
        "click",
        sendChatMessage
    );

}


if (chatInput) {

    chatInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                sendChatMessage();

            }

        }
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value;

    return div.innerHTML;

}


/* =========================================================
   COOKIE
========================================================= */

const cookieBanner =
    document.getElementById(
        "cookieBanner"
    );

const acceptCookies =
    document.getElementById(
        "acceptCookies"
    );


if (
    localStorage.getItem(
        "devlive_cookie_consent"
    ) === "accepted"
) {

    if (cookieBanner) {

        cookieBanner.style.display =
            "none";

    }

}


if (acceptCookies) {

    acceptCookies.addEventListener(
        "click",
        () => {

            localStorage.setItem(
                "devlive_cookie_consent",
                "accepted"
            );


            if (cookieBanner) {

                cookieBanner.classList.add(
                    "hide"
                );


                setTimeout(
                    () => {

                        cookieBanner.style.display =
                            "none";

                    },
                    400
                );

            }

        }
    );

}


/* =========================================================
   ONLINE / OFFLINE
========================================================= */

window.addEventListener(
    "online",
    () => {

        if (apiStatus) {

            apiStatus.textContent =
                "CONNECTED";

        }

        loadNews();

    }
);


window.addEventListener(
    "offline",
    () => {

        if (apiStatus) {

            apiStatus.textContent =
                "OFFLINE";

        }

    }
);
