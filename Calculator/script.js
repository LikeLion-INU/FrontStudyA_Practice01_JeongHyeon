let result = ""; // 계산 결과 저장
let input = ""; // 입력 값 저장
let tokens = []; // 숫자, 연산자 배열 저장

const screen = document.querySelector(".screen");
const numberBtn = document.querySelectorAll(".number");
const opBtn = document.querySelectorAll(".operator");
const clearBtn = document.querySelector(".clear");
const resultBtn = document.querySelector(".result");

numberBtn.forEach(button => {
    button.addEventListener("click", () => handleNumber(button.textContent));
});

opBtn.forEach(button => {
    button.addEventListener("click", () => handleOperator(button.textContent));
});

clearBtn.addEventListener("click", clearCalculator);
resultBtn.addEventListener("click", calculateResult);

function updateScreen() { // 화면에 숫자와 연산자 표시
    screen.textContent = tokens.join(" ") + (input ? " " + input : ""); // 요소 사이에 공백과 함께 출력
}

function formatResult(value) { // 소수점 표시 제한
    let strValue = value.toString();

    if (strValue.length > 10) {
        return strValue.slice(0, 12);
    }
    return strValue;
}

function handleNumber(num) { // 숫자 버튼 클릭 시
    if (result !== "") { // 반환된 결과가 있다면 새로운 숫자 입력시 초기화
        result = "";
        input = num;
    } else {
        input += num;
    }
    updateScreen();
}

function handleOperator(op) { // 연산자 버튼 클릭 시
    if (input !== "") { // 입력된 숫자가 있다면 배열에 추가 후 연산자 추가
        tokens.push(input);
        tokens.push(op);
        input = "";
    } else if (tokens.length > 0) { // 마지막 입력이 연산자라면 새로운 연산자로 변경
        tokens[tokens.length - 1] = op;
    }
    updateScreen();
}

function clearCalculator() { // 클리어 버튼 클릭 시 초기화
    tokens = []; 
    input = "";
    result = "";
    screen.textContent = 0;
}

function calculateResult() { // 결과 버튼 클릭 시
    if (input !== "") { // 마지막 입력 숫자 배열에 추가
        tokens.push(input); 
    }

    let value = Number(tokens[0]); // 첫번째 숫자 초기값 설정
    for (let i = 1; i < tokens.length; i += 2) { // 연산 수행
        let operator = tokens[i];
        let nextValue = Number(tokens[i + 1]);

        switch (operator) {
            case "+": value += nextValue; break;
            case "-": value -= nextValue; break;
            case "*": value *= nextValue; break;
            case "/": value = nextValue === 0 ? "Error" : value / nextValue; break;
        }
    }
    
    result = formatResult(value);
    screen.textContent = result;
    input = "";
    tokens = [];
}