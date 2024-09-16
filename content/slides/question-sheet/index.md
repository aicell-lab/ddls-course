---
title: Question Sheet for DDLS Journal Club
summary: This question sheet is used for the DDLS Journal Club to discuss papers in a systematic way.
authors: []
tags: []
categories: []
date: '2021-02-05T00:00:00Z'
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

## Background

- What knowledge does this paper assume?
- Are there any concepts/terms that we did not yet define this week?

-----
## Aim(s) of the paper

- Summarize the aim(s) of the paper in maximum 3 sentences.

-----

## Methods

- What data is the paper working with?
  - What type of data is it?
  - How was is acquired (by which technique)?
  - How well does it adhere to the FAIR principles (Findability, Accessibility, Interoperability, and Reuse) for data management?
- What are the methods and analysis technique used in the paper?
  - How does the methods work?
  - Is it well suited? Why?
  - Would other analysis techniques have been useful?

-----

## Results

- What key result does each result figure/figure panel convey?

-----

## Applications

- What will this study be useful for?
- Is it expected to have impact? In which way?

-----

## Limitations

- What limitation(s) are acknowledged by the authors?
- Are there any other limitations you see that were not mentioned?

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
