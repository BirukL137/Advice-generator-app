const adviceId = document.getElementById("advice-id");
const adviceText = document.getElementById("advice-text");
const button = document.getElementById("advice-btn");

async function fetchAdvice() {
  try {
    // Fade out old advice
    adviceText.classList.add("fade");

    const response = await fetch("https://api.adviceslip.com/advice", {
      cache: "no-cache", // prevent caching
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { slip } = await response.json();

    // Update UI with fade-in
    setTimeout(() => {
      adviceText.textContent = `“${slip.advice}”`;
      adviceId.textContent = `#${slip.id}`;
      adviceText.classList.remove("fade");
    }, 200);
  } catch (error) {
    adviceText.textContent = "Something went wrong... try again.";
    adviceId.textContent = "#???";
    console.error(error);
  }
}

button.addEventListener("click", fetchAdvice);
window.addEventListener("DOMContentLoaded", fetchAdvice);
