/*
function Calculator(){

}

const cal = new Calculator()
*/

class Calculator{
    $previousPreview
    $currentPreview

    previousOperation = ""
    currentOperation = ""

    constructor($previousPreview, $currentPreview){      //생성자?
        this.$previousPreview = $previousPreview
        this.$currentPreview = $currentPreview
    }

    onPressNumber(number){
        // 소수점이 연속되지 않게
        // 소수점 맨 앞에 찍히지 않게
        if(number === "." && this.$currentPreview.textContent.length<1){
            return
        }

        this.$currentPreview.textContent += number
    }

    onPressOperation(operation){
        // 연산할 수보다 연산기호 먼저 눌리지 않게
        if(this.$currentPreview.textContent.length<1){
            return
        }

        //
        this.previousOperation = operation

        this.$previousPreview.textContent = `${this.$currentPreview.textContent} ${operation}`
        this.$currentPreview.textContent = ''
    }

    /*
    MyonEqual(){
        this.$previousPreview.textContent += ` ${this.$currentPreview.textContent}`
        let $arr = (this.$previousPreview.textContent).split(" ")
        $arr[0] = $arr[0] - 0
        $arr[2] = $arr[2] - 0
        let $answer = 0
        switch($arr[1]){
            case '+':
                $answer = $arr[0] + $arr[2];
                break;

            case '-':
                $answer = $arr[0] - $arr[2];
                break;

            case '*':
                $answer = $arr[0] * $arr[2];
                break;

            case '/':
                $answer = $arr[0] / $arr[2];
                break;

            default:
                break;
        }
        this.$currentPreview.textContent = `${$answer}`
    }
    */

    onEqual(){

        if(
            this.$currentPreview.textContent.length > 0 &&
            this.$previousPreview.textContent.length > 0 &&
            this.previousOperation.length > 0
        ){
            let result = 0;

            switch(this.previousOperation){
                case "+":
                    result = this.handlePlus()
                    break;
                case "-":
                    result = this.handleMinus()
                    break;
                case "*":
                    result = this.handleMultiple()
                    break;
                case "/":
                    result = this.handleDivide()
                    break;
                default:
                    break;
        }

            this.$currentPreview.textContent = result.toString()
            this.$previousPreview.textContent = ""
            this.currentOperation = ""
        }

    }

    onReset() {
        this.$currentPreview.textContent = ""
        this.$previousPreview.textContent = ""
        this.previousOperation.textContent = ""
        this.currentOperation.textContent = ""
    }

    onDelete() {
        if(this.$currentPreview.textContent < 1){
            return
        }
        
        this.$currentPreview.textContent = this.$currentPreview.textContent.slice(0, -1)
    }

    handlePlus() {
        return(
            Number(this.$previousPreview.textContent.split(" ")[0])
            + Number(this.$currentPreview.textContent)
        )
    }

    handleMinus() {
        return(
            Number(this.$previousPreview.textContent.split(" ")[0])
            - Number(this.$currentPreview.textContent)
        )
    }

    handleMultiply() {
        return(
            Number(this.$previousPreview.textContent.split(" ")[0])
            * Number(this.$currentPreview.textContent)
        )
    }

    handleDivide() {
        return(
            Number(this.$previousPreview.textContent.split(" ")[0])
            / Number(this.$currentPreview.textContent)
        )
    }
}

// 값 표시
const $previousPreview = document.querySelector('[data-previous-preview]')
const $currentPreview = document.querySelector(['[data-current-preview]'])

// 사칙연산
const $plus = document.querySelector('[data-btn-plus]')
const $minus = document.querySelector('[data-btn-minus]')
const $multiply = document.querySelector('[data-btn-multiply]')
const $divide = document.querySelector('[data-btn-divide]')
const $equal = document.querySelector('[data-btn-equal]')

// 리셋, 삭제
const $reset = document.querySelector('[data-btn-reset]')
const $delete = document.querySelector('[data-btn-delete]')

// 숫자, 연산
const $numbers = document.querySelectorAll('[data-btn-number]')
const $operations = document.querySelectorAll('[data-btn-operation]')

const cal = new Calculator($previousPreview, $currentPreview)

$numbers.forEach(($number) => {
    $number.addEventListener("click", (e) => {
        cal.onPressNumber(e.target.textContent)
    })
})

$operations.forEach(($operation) => {
    $operation.addEventListener("click", (e) => {
        switch($operation){
            case $plus:
                cal.onPressOperation("+")
                break;
            case $minus:
                cal.onPressOperation("-")
                break;
            case $multiply:
                cal.onPressOperation("*")
                break;
            case $divide:
                cal.onPressOperation("/")
                break;
            case $equal:
                cal.onEqual()
                break;
            default:
                break;
        }
    })
})

$reset.addEventListener("click", (e) => cal.onReset())

$delete.addEventListener("click",(e) => cal.onDelete())