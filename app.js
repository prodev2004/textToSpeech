const textarea = document.querySelector('textarea')
const button = document.querySelector('button')
const selectElement = document.querySelector('select')

let textToSpeech = window.speechSynthesis
let voices = []

if (speechSynthesis !== undefined) {
    speechSynthesis.onvoiceschanged = getVoices
}

getVoices()

function getVoices () {
    voices = textToSpeech.getVoices()
    selectElement.innerHTML = ''
    voices.forEach(voice => {
        let option = document.createElement('option')
        option.innerText = voice.name
        option.setAttribute('data-lang', voice.lang)
        option.setAttribute('data-name', voice.name)
        selectElement.appendChild(option)
    })
    selectElement.selectedIndex = 0
}

button.addEventListener('click', () => {
    let speak = new SpeechSynthesisUtterance(textarea.value)
    let selectedVoiceName = selectElement.selectedOptions[0].getAttribute('data-name')
    voices.forEach(voice => {
        if (voice.name === selectedVoiceName) {
            speak.voice = voice
        }
    })
    textToSpeech.speak(speak)
})