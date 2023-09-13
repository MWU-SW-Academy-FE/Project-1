class Calculator {
    $previousPreview
    $currentPreview
    isOperated

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

    // 사칙연산 표시로 추가 연산 후 텍스트 변경까지 하는 함수
    onLinearOperation(){   
        const [a, operation] = this.$previousPreview.textContent.split(' ')
        const b = this.$currentPreview.textContent

        if(operation === '+') {
            this.$previousPreview.textContent = `${Number(a) + Number(b)} +`
        }
        if(operation === '-') {
            this.$previousPreview.textContent = `${Number(a) - Number(b)} -`
        }
        if(operation === '*') {
            this.$previousPreview.textContent = `${Number(a) * Number(b)} *`
        }
        if(operation === '÷') {
            b === '0' ? alert('0으로 나눌 수 없습니다!') : this.$previousPreview.textContent = `${Number(a) / Number(b)} ÷`
        }
    }

    // 사칙연산이 클릭되면 이전 텍스트에 해당 연산을 추가하여 올림, = 는 별도의 처리
    // TODO: 3개 이상의 숫자 연산 가능하도록 구현
    onPressOperation(operation) {
        if(operation === '=') {
            this.onEqual()
            return
        }
        // 최초 입력이면 자동으로 0 을 추가, 아니라면 3개 이상의 연속 연산
        this.$currentPreview.textContent === '' ? 
        this.$previousPreview.textContent = `0 + ${operation}` : 
        this.$previousPreview.textContent = `${this.$currentPreview.textContent} ${operation}`

        this.isOperated = true
    }

    // 이전 텍스트에 완성된 계산식을 보여준 후, 현재 텍스트에 계산 결과를 나타냄
    // + 계산식을 히스토리에 생성하기
    // TODO: 괄호가 포함된 연산 기능을 위한 추가적인 컴포넌트 필요
    onEqual() {
        const [a, operation] = this.$previousPreview.textContent.split(' ')
        const b = this.$currentPreview.textContent
        // validation: 올바르지 않은 계산식 검사 후 계산 진행(0으로 나누기)
        if(operation === '+') {
            this.$currentPreview.textContent = Number(a) + Number(b)
        }
        if(operation === '-') {
            this.$currentPreview.textContent = Number(a) - Number(b)
        }
        if(operation === '*') {
            this.$currentPreview.textContent = Number(a) * Number(b)
        }
        if(operation === '÷') {
            b === '0' ? alert('0으로 나눌 수 없습니다!') : this.$currentPreview.textContent = Number(a) / Number(b)
        }

        this.$previousPreview.textContent = `
            ${a} ${operation} ${b} =
            `

        this.isOperated = true

        // 계산식들의 히스토리 생성
        const $list = document.createElement('div')
        $list.classList.add('history-text')
        $list.textContent = ` ${a} ${operation} ${b} = ${this.$currentPreview.textContent}`
        $history.appendChild($list)
    }

    onReset() {
        this.$currentPreview.textContent = ''
        this.$previousPreview.textContent = ''
        this.isOperated = false
    }

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
