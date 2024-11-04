const inputWordContent = document.querySelector(".inputWordContent");
const tdk = document.querySelector(".tdk");
const wordNumber = document.querySelector(".wordNumber");
const statusMsg = document.querySelector(".statusMsg");
const statusMsgContent = document.querySelector(".statusMsgContent");
const statusMsgContentStatus = document.querySelector(".statusMsgContentStatus");
const playAgain = document.querySelector(".playAgain");
const tryAgain = document.querySelector(".tryAgain");

let word;
let wordArray = [];
let getWordCount = [];
let wordsDB = [];

const addInput = async () => {
  wordArray.forEach((element) => {
    inputWordContent.innerHTML += `<input type="text" class="inputWord" maxlength="1" onfocus="this.select();">`;
  });
  return;
};

const loadWord = () => {
  inputWordContent.innerHTML = "";
  tdk.innerHTML = "";
  word = wordsDB[Math.floor(Math.random() * wordsDB.length)].toLocaleUpperCase("tr-TR");
  wordArray = Array.from(word);
  wordNumber.innerHTML = wordArray.length;
  addInput().then(() => {
    const inputWord = document.querySelectorAll(".inputWord");
    for (let index = 0; index < inputWord.length; index++) {
      getWordCount.push(index);
      inputWord[index].addEventListener("keyup", (e) => {
        inputWord[index].value = inputWord[index].value.replace(/[^a-zA-ZğüşöçıİĞÜŞÖÇ]/g, "");
        inputWord[index].value = inputWord[index].value.toLocaleUpperCase("tr-TR");
        if (index + 1 < inputWord.length && e.key.length === 1 && /[a-zA-ZğüşöçıİĞÜŞÖÇ]/.test(e.key)) {
          inputWord[index + 1].focus();
        } else if (index - 1 >= 0 && e.key == "Backspace") {
          inputWord[index - 1].focus(() => {
            inputWord[index - 1].select();
          });
        }
      });
    }
  });

  getRequest(`https://sozluk.gov.tr/gts?ara=${encodeURIComponent(word.toLocaleLowerCase("tr-TR"))}`)
    .then((response) => {
      tdk.innerHTML += `
    <li>
      <b class="info">
      ${response[0]["anlamlarListe"][0]["anlam"]}
      </b>
    </li>
    `;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getWords = () => {
  if (wordsDB.length == 0) {
    getRequest("/assets/json/words.json")
      .then((response) => {
        wordsDB = response;
        loadWord();
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    loadWord();
  }
};

const submit = () => {
  const inputWord = document.querySelectorAll(".inputWord");
  let playerWord = "";
  for (let index = 0; index < inputWord.length; index++) {
    if (inputWord[index].value.trim() != "") {
      playerWord += inputWord[index].value;
    } else {
      showStatusMsg(0);
      break;
    }
  }

  if (playerWord == word) {
    showStatusMsg(1);
  } else if (playerWord != word && inputWord.length == playerWord.length) {
    showStatusMsg(2);
  }
};

const getWord = () => {
  const inputWord = document.querySelectorAll(".inputWord");
  if (getWordCount.length != 0) {
    let getWordCountIndex = Math.floor(Math.random() * getWordCount.length);
    let wordIndex = getWordCount[getWordCountIndex];
    inputWord[wordIndex].value = wordArray[wordIndex];
    inputWord[wordIndex].setAttribute("readonly", true);
    inputWord[wordIndex].classList.add("readOnly");
    getWordCount.splice(getWordCountIndex, getWordCountIndex == 0 ? 1 : 1);
  }
};

const showStatusMsg = (statusCode) => {
  if (statusCode == 0) {
    statusMsgContentStatus.innerHTML = "Lütfen tüm harfleri doldurun";
    tryAgain.style = "display: inherit";
    playAgain.style = "display: none";
    statusMsgContent.style = "background-color: #fff400; box-shadow: 0px 0px 50px #fff400;";
    statusMsg.style = "display: flex";
  } else if (statusCode == 1) {
    statusMsgContentStatus.innerHTML = "Tebrikler Kazandın!";
    tryAgain.style = "display: none";
    playAgain.style = "display: inherit";
    statusMsgContent.style = "background-color: #00ff7b; box-shadow: 0px 0px 50px #00ff7b;";
    statusMsg.style = "display: flex";
  } else if (statusCode == 2) {
    statusMsgContentStatus.innerHTML = "Yanlış cevap! Tekrar deneyin";
    tryAgain.style = "display: inherit";
    playAgain.style = "display: none";
    statusMsgContent.style = "background-color: #ff5f5f; box-shadow: 0px 0px 50px #ff5f5f;";
    statusMsg.style = "display: flex";
  }
};

const tryAgainFunc = () => {
  statusMsg.style = "display: none";
};

const playAgainFunc = () => {
  statusMsg.style = "display: none";
  getWords();
};

const getRequest = async (uri) => {
  const response = await fetch(uri);
  if (!response.ok) {
    throw new Error("Error");
  }
  return await response.json();
};

getWords();
