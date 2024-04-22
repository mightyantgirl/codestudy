
//해야할일
//1박스두개만들기
//2드랍다운 리스트 만들기
//3환율정보 가져오기
//4드랍다운 리스트에서 아이템 선택하면 아이템이 바뀜
//5금액 실시간환율적용


//6드랍다운리스트에서 단위기준으로 환율이 바뀜
//7환율정보를 한국어로 읽기쉽게 바뀜

let currencyRatio = {
    USD: {
        KRW: 1378.88,
        USD: 1,
        JPY: 154.70,
        unit: "달러"
    },
    KRW: {
        KRW: 1,
        USD: 0.00073,
        JPY: 0.11,
        unit: "원"
    },
    JPY: {
        KRW: 8.91,
        USD: 0.0065,
        JPY: 1,
        unit: "엔"
    }
}


const TOBUTTON = document.getElementById("to-button");
const FROMBUTTON = document.getElementById("from-button");
const TOEXCHANGE = document.getElementById("to-exchange");
const FROMEXCAHNGE = document.getElementById("from-exchange");
const RESET = document.getElementById("reset");



let fromCurrency = 'USD'
//기본 바꿀 단위
let toCurrency = 'KRW'
//기본 바뀌어질 단위

function onFromButton() {
    //버튼 가져온다
    FROMBUTTON.textContent = this.textContent;
    //from-buttonm의 text를 = this의 text로 바꾼다. 여기서 this는 클릭한 from-currency-list의 각 a
    fromCurrency = this.textContent;
    //선택된 currency 값을 변수에 저장한다
    FROMEXCAHNGE.textContent = currencyRatio[fromCurrency].unit;
    convert();
    //환전 다시 
}

function onToButton() {
    //버튼 가져온다
    TOBUTTON.textContent = this.textContent;
    //from-buttonm의 text를 = this의 text로 바꾼다. 여기서 this는 클릭한 from-currency-list의 각 a
    toCurrency = this.textContent;
    //선택된 currency 값을 변수에 저장한다
    TOEXCHANGE.textContent = currencyRatio[toCurrency].unit;
    convert();
    //환전 다시
}


document.querySelectorAll("#from-currency-list a").forEach(menu =>
    menu.addEventListener("click", onFromButton));

document.querySelectorAll("#to-currency-list a").forEach(menu =>
    menu.addEventListener("click", onToButton));



//1 키를 입력하면
//2 환전이 되고
//3 환전 된 값이 표시된다

function convert(type) {
    //환전
    let amonut = 0;
    if (type == "from") {
        let amonut = document.getElementById("from-input").value;
        //value를 쓰면 인풋창에 쓰인 값을 가져올 수 있음
        let convetedAmount = amonut * currencyRatio[fromCurrency][toCurrency];
        //환전된 값은 = 인풋창에 쓰인 값 * 객체에서 
        let RESULT = convetedAmount.toFixed(2);
        //환전값 소숫점 2자리 초과 버리기
        document.getElementById("to-input").value = RESULT;
        //환전 된 후의 값 인풋 창에 보여짐
        FROMEXCAHNGE.textContent = `${amonut}${currencyRatio[fromCurrency].unit}`
        //실시간 환율 반영
        TOEXCHANGE.textContent = `${RESULT}${currencyRatio[toCurrency].unit}`

    } else {
        let amonut = document.getElementById("to-input").value;
        let convetedAmount = amonut / currencyRatio[fromCurrency][toCurrency];
        let RESULT = convetedAmount.toFixed(2);
        document.getElementById("from-input").value = RESULT;
        TOEXCHANGE.textContent = `${amonut}${currencyRatio[toCurrency].unit}`
        FROMEXCAHNGE.textContent = `${RESULT}${currencyRatio[fromCurrency].unit}`
    }
};


RESET.addEventListener("click", onReset);

function onReset() {
    document.getElementById("from-input").value = currencyRatio['USD'].USD;
    document.getElementById("to-input").value = currencyRatio['USD'].KRW;
    TOEXCHANGE.textContent = `${currencyRatio['USD'].KRW}원`;
    FROMEXCAHNGE.textContent = `${currencyRatio['USD'].USD}달러`;
    TOBUTTON.textContent = 'KRW';
    FROMBUTTON.textContent = 'USD';
}