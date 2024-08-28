const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

submitButton.disabled = true;

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

function verifyTextLength(e) {
  const textarea = e.target;

  // Enable the button if the text length is within the valid range, otherwise disable it
  submitButton.disabled = !(textarea.value.length > 200 && textarea.value.length < 100000);
}

async function submitData(e) {
  e.preventDefault(); // Prevent the default form submission behavior

  // Add loading animation to the submit button
  submitButton.classList.add("submit-button--loading");

  const textToSummarize = textArea.value;

  const requestOptions = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text_to_summarize: textToSummarize })
  };

  try {
    // Send the text to the server using fetch API
    const response = await fetch('/summarize', requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch the summary');
    }

    const summary = await response.text();

    // Update the output text area with the new summary
    summarizedTextArea.value = summary;

  } catch (error) {
    console.error('Error:', error.message || error);
    summarizedTextArea.value = error.message || error;
  } finally {
    // Stop the spinning loading animation
    submitButton.classList.remove("submit-button--loading");
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }
}
