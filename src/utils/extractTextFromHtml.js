export const extractTextFromHtml = (htmlString) => {
    // Create a temporary element to hold the HTML string
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;

    // Ignore elements with id "MathJax_SVG_styles"
    const elementsToIgnore = tempElement.querySelectorAll('#MathJax_SVG_styles'); // for Hackerrank
    elementsToIgnore.forEach(element => element.remove());

    // Use the .textContent property to extract the text from the remaining HTML tags
    const extractedText = tempElement.textContent;

    // Remove any whitespace from the extracted text
    const trimmedText = extractedText.replace(/\s+/g, ' ').trim();

    // Return the trimmed text
    return trimmedText;
};
