const inputWordContent = document.querySelector(".inputWordContent");
const tdk = document.querySelector(".tdk");
const wordNumber = document.querySelector(".wordNumber");
const statusMsg = document.querySelector(".statusMsg");
const statusMsgContent = document.querySelector(".statusMsgContent");
const statusMsgContentStatus = document.querySelector(".statusMsgContentStatus");
const playAgain = document.querySelector(".playAgain");
const tryAgain = document.querySelector(".tryAgain");

let word; // * Rastgele seçilen kelime. örn: "SELAM"
let wordArray = []; // * Rastgele seçilen kelimenin harf harf diziye aktarılması. örn: ["S", "E", "L", "A", "M"]
let getWordCount = []; // * Rastgele harf alımı için kelime uzunluğunu diziye aktarılması. örn: [0, 1, 2, 3, 4] => 0'ıncı eleman "S" harfini temsil ediyor. 1 = "E", 2 = "L" ...
let wordsDB = []; // * Kelime havuzu

// * Kelime sayısı kadar input elementi ekleme işlemi
const addInput = async () => {
  wordArray.forEach((element) => {
    inputWordContent.innerHTML += `<input type="text" class="inputWord" maxlength="1" onfocus="this.select();">`;
  });
  return;
};

// * Rastgele kelime seçimi ve input etkileşimleri
const loadWord = () => {
  inputWordContent.innerHTML = ""; // * Sıfırlama
  tdk.innerHTML = ""; // * Sıfırlama
  getWordCount = []; // * Sıfırlama
  word = wordsDB[Math.floor(Math.random() * wordsDB.length)].toLocaleUpperCase("tr-TR"); // * Kelime havuzundan rasgele kelime seçimi
  wordArray = Array.from(word); // * Rastgele seçilen kelimeyi harf harf diziye aktarılması
  wordNumber.innerHTML = wordArray.length; // * Kelime sayısını bildiren HTML elementine kelime sayısının yazdırılması
  addInput().then(() => {
    // * addInput() fonksiyondaki işlem bittiken sonra çalışacak kodlar
    const inputWord = document.querySelectorAll(".inputWord"); // * Tüm ".inputWord" class isimli elementlerin dizi halinde değişkene atanması
    for (let index = 0; index < wordArray.length; index++) {
      // * Kelime sayısı kadar çalışacak kod döngüsü
      getWordCount.push(index); // * Harf alımı için kelime sayısı kadar diziye index eklenmesi
      inputWord[index].addEventListener("keyup", (e) => {
        // * input elementlerine yazı yazıldığında çalışacak kodlar
        inputWord[index].value = inputWord[index].value.replace(/[^a-zA-ZğüşöçıİĞÜŞÖÇ]/g, ""); // * input elementlerine sadece harf yazımı yazılabilmesi için
        inputWord[index].value = inputWord[index].value.toLocaleUpperCase("tr-TR"); // * input elementlerindeki yazıları büyük harfe dömüştümek için
        if (inputWord[index].value.trim() != "" && index + 1 < inputWord.length && e.key.length === 1 && /[a-zA-ZğüşöçıİĞÜŞÖÇ]/.test(e.key)) {
          // * input elementine yazı yazıldığında sonraki input elementine geçiş için
          inputWord[index + 1].focus();
        } else if (index - 1 >= 0 && e.key == "Backspace") {
          // * input elementinde yazı silindiğine önceki input elementine geçiş için
          inputWord[index - 1].focus();
        }
      });
    }
  });

  // * Kelimenin sözlük anlamı GET işlemi ve HTML DOM işlemi
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

// * Kelime havuzuna ulaşmak için GET işlemi
const getWords = () => {
  if (wordsDB.length == 0) {
    getRequest("/assets/json/words.json")
      .then((response) => {
        wordsDB = response; // * Kelime havuzunun değişkene atanması
        loadWord();
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    loadWord();
  }
};

// * Tahmin Et butonuna tıklandığında çalışacak kod işlemleri
const submit = () => {
  const inputWord = document.querySelectorAll(".inputWord"); // * Tüm ".inputWord" class isimli elementlerin dizi halinde değişkene atanması
  let playerWord = "";
  for (let index = 0; index < inputWord.length; index++) {
    // * Kelime sayısı kadar çalışacak kod döngüsü
    if (inputWord[index].value.trim() != "") {
      playerWord += inputWord[index].value; // * inputlardaki harfleri birleştirip kelimeye dönüştürme işlemi
    } else {
      // * Eğer input boşsa...
      showStatusMsg(0);
      break;
    }
  }

  if (playerWord == word) {
    // * Eğer "playerWord" rastgele üretilen kelime ise...
    showStatusMsg(1);
  } else if (playerWord != word && inputWord.length == playerWord.length) {
    // * Eğer "playerWord" rastgele üretilen kelime değil ise...
    showStatusMsg(2);
  }
};

// * Harf Al butonuna tıklandığında çalışacak kod işlemleri
const getWord = () => {
  const inputWord = document.querySelectorAll(".inputWord");
  if (getWordCount.length != 0) {
    let getWordCountIndex = Math.floor(Math.random() * getWordCount.length); // * "getWordCount" değişkeninden rastgele index alma
    let wordIndex = getWordCount[getWordCountIndex]; // * "getWordCount" değişkeninden rastgele alınan index'in değişkendeki değer karşılığını alma
    inputWord[wordIndex].value = wordArray[wordIndex]; // * Rastgele alınan harfi ilgili input'a yazdırma işlemi
    inputWord[wordIndex].setAttribute("readonly", true); // * İlgili input'u düzenlenebilmesini engelleme işlemi
    inputWord[wordIndex].classList.add("readOnly"); // * İlgili input'a class ekleme işlemi
    getWordCount.splice(getWordCountIndex, getWordCountIndex == 0 ? 1 : 1); // * Rastgele alınan harf index'ini "getWordCount" dizisinden silme işlemi
  }
};

// * Cevap kontrol işlemleri
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
