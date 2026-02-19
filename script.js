// make event listener to trigger when the DOM is loaded (when visiting webpage)
addEventListener("DOMContentLoaded", async function() {
    const response = await fetch("http://localhost:3000/api/songs")
    const songs = await response.json()

    let html = ""
    for (let song of songs) {
        html += `<li>${song.title} - ${song.artist}</li>`
    }

    document.querySelector("#addedSong").innerHTML = html
})