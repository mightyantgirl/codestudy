let quotes = [
  {
    quote: "이 항로의 목적지, 모든 세상의 끝. 너.",
    author: "<비아 에어 메일>",
  },
  {
    quote: "어쩌면 삶이란, 하나의 별을 켜고 누군가를 기다리는 일 어쩌면 삶이란, 하나의 별을 향해 영원히 돌아가는 길",
    author: "<비아 에어 메일>",
  },
  {
    quote: "어쩌면 삶이란, 하나의 별을 켜고 누군가를 기다리는 일 어쩌면 삶이란, 하나의 별을 향해 영원히 돌아가는 길",
    author: "<비아 에어 메일>",
  },
  {
    quote: "밤하늘의 영토 우린 별을 만지고, 꿈속의 꿈을 속삭이고, 밤을 노래하네",
    author: "<비아 에어 메일>",
  },
  {
    quote: "당연한 것들이 당연해질 때까지 세상을 시끄럽게 만들어요. 거짓된 말들이 고요해질 때까지 더욱 큰 소리로 떠들어요.",
    author: "<레드북>",
  },
  {
    quote: "산골로 가는 것은 세상한테 지는 것이 아니다.세상 같은 건 더러워 버리는 것이다.",
    author: "<나와 나타샤와 흰 당나귀>",
  },
  {
    quote: "눈이 푹푹 쌓이는 밤 흰 당나귀를 타고 산골로 가자 출출이 우는 깊은 산골로 가 마가리에 살자.",
    author: "<나와 나타샤와 흰 당나귀>",
  },
];

let quote = document.querySelector("#quotes span:nth-child(1)");
let author = document.querySelector("#quotes span:nth-child(2)");

let toDaysQuote = (quotes[Math.floor(Math.random() * quotes.length)]);
//배열안의 [반올림한순서(중에서 랜덤으로 * 배열의 갯수중에)]

quote.innerText = toDaysQuote.quote;
author.innerText = toDaysQuote.author;