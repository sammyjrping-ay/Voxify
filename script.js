const message = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector("#voices");
const rate = document.querySelector("#rate");
const pitch = document.querySelector("#pitch");
const text = document.querySelector("#text");
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
message.text = text.value;

function populateVoices() {
    voices = this.getVoices();
    voices.forEach(voice => {
        const voiceOption = document.createElement("option");
        voiceOption.value = voice.name;
        voiceOption.innerHTML = `${voice.name} (${voice.lang})`;
        voicesDropdown.appendChild(voiceOption);
    });
}

function setVoice() {
    message.voice = voices.find(voice => voice.name == this.value);
    console.log(this.value);
    toggle(true);
}

function toggle(startOver) {
    speechSynthesis.cancel();
    if(startOver){
        speechSynthesis.speak(message);
    }
}

function setOption() {
    console.log(this.id);
    message[this.id] = this.value;
    toggle(true);
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
rate.addEventListener("change", setOption)
pitch.addEventListener("change", setOption)
text.addEventListener("change", setOption)
speakButton.addEventListener("click", () => toggle(true));
stopButton.addEventListener("click", () => toggle(false));