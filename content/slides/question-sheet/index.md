```javascript execute
// List of random names
const names = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Eve",
  "Frank"
];

// Function to get a random name from the list
function getRandomName() {
    return names[Math.floor(Math.random() * names.length)];
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

# Question Sheet for Seminar Papers

Your tool for understanding paper in a systematic way.

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
- Which analysis technique is used?
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
