---
title: Question Sheet for DDLS Journal Club (v2)
summary: This question sheet is used for the DDLS Journal Club to discuss papers in a systematic way.
authors: []
tags: []
categories: []
date: '2022-02-05T00:00:00Z'
slides:
  # Choose a theme from https://github.com/hakimel/reveal.js#theming
  theme: black
  # Choose a code highlighting style (if highlighting enabled in `params.toml`)
  #   Light style: github. Dark style: dracula (default).
  highlight_style: dracula
---
# Question Sheet for DDLS Journal Club

Your tool for discussing papers in a systematic way.

<button class="button" onclick="window.setNames()">Set Presenters</button>

(Enter names separated by commas)
<input id="names-field" type="text" style="width: 100%;height:30px;font-size:20px"></input>

-----


## 0. Overall Summary

* Provide a concise summary of the paper in **your own words** (max 200 words).
* You may use ChatGPT or another AI tool to generate an initial draft — but then **mark in bold or comment** what you *added, changed, or disagreed with*.
* What did the AI summary miss, oversimplify, or misrepresent?

-----

## 1. Background & Context

* What prior knowledge is essential to fully understand this paper?
* Which parts of the introduction did you find most *unclear* or *assumed too much background*? Why?
* If you asked ChatGPT or another AI tool to explain background terms, how accurate or useful was it? Where did it fail?

-----

## 2. Aim(s) of the Paper

* Summarize the aim(s) of the paper in your own words (max 3 sentences).
* **Critical reflection:** Did the experiments and analyses actually match the stated aims? Point out any mismatch or “scope creep.”

-----

## 3. Methods

* **Summary:** List the main methods used in the paper in 2–3 sentences.
* Which methodological choices were most crucial for the conclusions?
* Could alternative methods have been used, and what would have been the trade-offs?
* If you used AI to explain a method, what nuance or detail did the AI miss that you only understood by reading deeper?

-----

## 4. Results

* **Summary:** Briefly summarize the key results in 3–4 sentences.
* For one figure of your choice, *re-explain it as if you were teaching it to a peer who hasn’t read the paper*.
* Which result surprised you, or challenged your expectations? Why?
* Did the authors overinterpret any result, in your view?

-----

## 5. Applications & Impact

* Who benefits most from this study (scientists, clinicians, industry, society)?
* Can you think of an application beyond what the authors suggest?
* How would the field change if these results turned out to be wrong?

-----

## 6. Limitations & Open Questions

* What limitation acknowledged by the authors do you consider *most serious*? Why?
* Identify a limitation **not discussed** in the paper.
* What experiment or follow-up study would you propose to address these limitations?

-----

## 7. Your Perspective

* Did reading this paper change how you think about your own research, or about the field more broadly?
* If you asked AI to generate a critique of this paper, how does your own critique differ? (Be specific.)
* What was the *most difficult part* of this paper for you to understand — and how did you work through it?

-----

## Thank you!


```javascript execute
// List of random names
window.names = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Eve",
  "Frank"
];


function setNames(names) {
  const nf = document.getElementById("names-field")
  window.names = nf.value.split(",")
  console.log(window.names)
  localStorage.setItem("presenters", nf.value);
  alert("Here are the names configured for the presenters:\n" + window.names.join("\n"))
}



Reveal.addEventListener('ready', ()=>{
    const loadedNames = localStorage.getItem("presenters")
    const nf = document.getElementById("names-field")
    if(loadedNames) {
        nf.value = loadedNames;
        window.names = nf.value.split(",");
    }
    else{
      nf.value = window.names.join(",")
    }
});

// Function to get a random name from the list
function getRandomName() {
    return window.names[Math.floor(Math.random() * window.names.length)];
}

// Add a button to every slide to display a random name, except for the first and last slides
Reveal.addEventListener('slidechanged', function(event) {
    const slide = event.currentSlide;
    const slideIndex = Reveal.getIndices().h;
    const totalSlides = Reveal.getTotalSlides();

    // Skip the first slide (index 0) and the last slide
    if (slideIndex === 0 || slideIndex === totalSlides - 1) {
        return;
    }

    // Check if button already exists, if not, create one
    if (!slide.querySelector('.random-name-button')) {
        // Create a button with the specified style
        const button = document.createElement("button");
        button.className = "button random-name-button";
        button.innerText = "Select Presenter";
        button.style.marginTop = "20px";
        button.style.marginLeft = "auto";
        button.style.marginRight = "auto";
        button.style.display = "block";
        
        // Create a span to show the name next to the button
        const nameSpan = document.createElement("span");
        nameSpan.className = "name-display";
        nameSpan.style.marginLeft = "10px";
        
        // Add the button and name span to the slide
        slide.appendChild(button);
        slide.appendChild(nameSpan);
        
        // Add event listener for the button
        button.addEventListener("click", function() {
            const randomName = getRandomName();
            nameSpan.innerText = randomName;
        });
    }
});
```
