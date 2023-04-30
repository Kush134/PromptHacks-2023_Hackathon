export const extractCodeFromHtml = (htmlString) => {
    // Replace all the tags with their inner text
    let textString = htmlString.replace(/<.*?>/g, match => {
        // If the tag is a <div>, add a newline and preserve whitespace
        if (match.toLowerCase().includes("<div")) {
            return match.replace(/<\/?div.*?>/g, '').trim() + "\n";
        }
        // Otherwise, replace the tag with an empty string
        return "";
    });

    textString = textString.replace(/&lt;/g, '<')
    textString = textString.replace(/&gt;/g, '>')
    textString = textString.replace(/&le;/g, '<=')
    textString = textString.replace(/&ge;/g, '>=')
    textString = textString.replace(/&nbsp;/g, ' ');
    // Trim any excess whitespace and return the result
    return textString.trim();
}