class Calculator {
    $previousPreview
    $currentPreview
    isOperated
    /*
        isOperated : 평소에는 false로 있다가 연산기호 입력 시 true로 전환,
        true 상태일 때 현재 텍스트가 그대로 유지되며 새로운 숫자 입력 시 다시 false로 전환
    */

    constructor($previousPreview, $currentPreview, isOperated) {
        this.$previousPreview = $previousPreview
        this.$currentPreview = $currentPreview
        this.isOperated = isOperated
    }

    onPressNumber(number) {
        // 계산 결과가 한타임 남아있도록 조치
        if(this.isOperated) {
            this.$currentPreview.textContent = ''
            this.isOperated = false
        }
        // validation: 올바르지 않은 데이터 형식 검사 후 값 입력
        if(this.$currentPreview.textContent.length === 0){
            if(number !== '.') this.$currentPreview.textContent += number
        }
        else if(this.$currentPreview.textContent.length === 1){
            if(!(this.$currentPreview.textContent === '0' && number === '0')) 
            this.$currentPreview.textContent += number
        }
        else{
            if(!(this.$currentPreview.textContent.includes('.') && number === '.')) 
            this.$currentPreview.textContent += number
        }
    }

    // 추가적 사칙연산을 위한 함수
    onCalculate(a, b, operation){
        if(operation === '+'){
            return a + b
        }
        if(operation === '-'){
            return a - b
        }
        if(operation === '*'){
            return a * b
        }
        if(operation === '÷'){
            return a / b
        }
        return 0
    }

    // 사칙연산 표시로 추가 연산 후 텍스트 변경까지 하는 함수
    onLinearOperation(operation){
        // 첫째 항, 실제 계산이 이뤄질 연산기호, = 이 입력되었는지 확인하기 위한 데이터
        const [a, preOperation, isEqual] = this.$previousPreview.textContent.trim().split(' ')
        // 둘째 항(사용자 입력 값)
        const b = this.$currentPreview.textContent
        // 히스토리에 결과까지 전달하기 위해 변수 설정
        let result = 0

        // 이미 = 를 눌렀을 경우 처리
        if(isEqual){
            this.$previousPreview.textContent = `${b} ${operation}`
            this.$currentPreview.textContent = ''
            return
        }

        // 계산은 previous에 있는 연산기호로 하고 최신화는 입력 된 연산기호로 진행
        if(operation === '+') {
            result = this.onCalculate(Number(a), Number(b), preOperation)
            this.$previousPreview.textContent = `${result} +`
        }
        if(operation === '-') {
            result = this.onCalculate(Number(a), Number(b), preOperation)
            this.$previousPreview.textContent = `${result} -`
        }
        if(operation === '*') {
            result = this.onCalculate(Number(a), Number(b), preOperation)
            this.$previousPreview.textContent = `${result} *`
        }
        // validation: 올바르지 않은 계산식 검사 후 계산 진행(0으로 나누기)
        if(operation === '÷') {
            result = this.onCalculate(Number(a), Number(b), preOperation)
            b === '0' ? alert('0으로 나눌 수 없습니다!') : this.$previousPreview.textContent = `${result} ÷`
        }
        // 아래 숫자도 계산 결과로 초기화, 올바르지 않은 계산식일 때는 예외적 처리
        if(!Number.isFinite(result)){
            this.$currentPreview.textContent = a
        } else {
            this.$currentPreview.textContent = result
            // 추가 연산일 때 마다 history에도 추가
            this.onHistory({a, b, operation: preOperation, result})
        }
    }

    // 사칙연산이 클릭되면 이전 텍스트에 해당 연산을 추가하여 올림, = 는 별도의 처리
    // TODO: 3개 이상의 숫자 연산 가능하도록 구현
    onPressOperation(operation) {
        if(operation === '=') {
            this.onEqual()
            return
        }
        
        // 최초 입력일 시
        if(this.$previousPreview.textContent.length === 0){
            // 아무 입력이 없으면 자동으로 0 을 추가, 아니라면 일반적 연산
            this.$currentPreview.textContent === '' ? 
            this.$previousPreview.textContent = `0 ${operation}` : 
            this.$previousPreview.textContent = `${this.$currentPreview.textContent} ${operation}`
        }
        // 3개 이상의 연산일 시
        else{
            this.onLinearOperation(operation)
        }

        this.isOperated = true
    }

    // 이전 텍스트에 완성된 계산식을 보여준 후, 현재 텍스트에 계산 결과를 나타냄
    // + 계산식을 히스토리에 생성하기
    // TODO: 괄호가 포함된 연산 기능을 위한 추가적인 컴포넌트 필요
    onEqual() {
        const [a, operation] = this.$previousPreview.textContent.split(' ')
        const b = this.$currentPreview.textContent
        let result = 0
        
        if(operation === '+') {
            result = Number(a) + Number(b)
            this.$currentPreview.textContent = result
        }
        if(operation === '-') {
            result = Number(a) - Number(b)
            this.$currentPreview.textContent = result
        }
        if(operation === '*') {
            result = Number(a) * Number(b)
            this.$currentPreview.textContent = result
        }
        // validation: 올바르지 않은 계산식 검사 후 계산 진행(0으로 나누기)
        if(operation === '÷') {
            result = Number(a) / Number(b)
            b === '0' ? alert('0으로 나눌 수 없습니다!') : this.$currentPreview.textContent = result
        }

        this.$previousPreview.textContent = `
            ${a} ${operation} ${b} =
            `

        this.isOperated = true

        // 계산식들의 히스토리 생성, 올바르지 않은 계산식일 때는 생성하지 않음
        if(Number.isFinite(result)){
            this.onHistory({a, b, operation, result})
        }
    }

    // 계산식 히스토리 컨텐츠를 추가하는 함수
    onHistory({a, b, operation, result}){
        const $list = document.createElement('div')
        $list.classList.add('history-text')
        $list.textContent = ` ${a} ${operation} ${b} = ${result}`
        $history.appendChild($list)
    }

    // 모든 요소를 초기화하는 함수
    onReset() {
        this.$currentPreview.textContent = ''
        this.$previousPreview.textContent = ''
        this.isOperated = false
    }
    
    // 현재 글 요소의 길이를 구해 한개 씩 삭제하는 함수
    onDelete() {
        const length = this.$currentPreview.textContent.length - 1
        if(length < 0) return
        this.$currentPreview.textContent = this.$currentPreview.textContent.substring(0, length)
    }
}


// 값 표시
const $previousPreview = document.querySelector('[data-previous-preview]')
const $currentPreview = document.querySelector('[data-current-preview]')

// 숫자, 연산
const $numbers = document.querySelectorAll('[data-btn-number]')
const $operations = document.querySelectorAll('[data-btn-operation]')

// AC, DEL
const $reset = document.querySelector('[data-btn-reset]')
const $delete = document.querySelector('[data-btn-delete]')

// History
const $history = document.querySelector('.history')

const cal = new Calculator($previousPreview, $currentPreview, false)

// 버튼 이벤트들 등록 구간
$numbers.forEach(($number) => {
    $number.addEventListener('click', (e) => {
        cal.onPressNumber(e.target.textContent)
    })
})

$operations.forEach(($operation) => {
    $operation.addEventListener('click', (e) => {
        cal.onPressOperation(e.target.textContent)
    })
})

$reset.addEventListener('click', (e) => {
    cal.onReset()
})

$delete.addEventListener('click', (e) => {
    cal.onDelete()
})
