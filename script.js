async function searchWord() {
    const word = document.getElementById("wordInput").value;
    const resultDiv = document.getElementById("result");
    
    if (!word) {
        resultDiv.innerHTML = "Please enter a word.";
        return;
    }

    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.title === "No Definitions Found") {
            resultDiv.innerHTML = "No definitions found. Try another word.";
            return;
        }

        const definition = data[0].meanings[0].definitions[0].definition;
        const audio = data[0].phonetics[0]?.audio || "";
        
        resultDiv.innerHTML = `
            <h2>${word}</h2>
            <p><strong>Definition:</strong> ${definition}</p>
            ${audio ? `<audio controls src="${audio}"></audio>` : ""}
        `;
    } catch (error) {
        resultDiv.innerHTML = "Error fetching data.";
    }
}
