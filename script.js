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
        // TODO: validation, .이 먼저 눌리면 안되도록 조정
        // 계산 결과가 한타임 남아있도록 조치
        if(this.isOperated) {
            this.$currentPreview.textContent = ''
            this.isOperated = false
        }
        this.$currentPreview.textContent += number
    }

    // 사칙연산이 클릭되면 이전 텍스트에 해당 연산을 추가하여 올림, = 는 별도의 처리
    // 도전 TODO: = 3개 이상의 숫자 연산 => 연속해서 사칙연산 입력 시 중첩되어 계산하도록 로직 생성
    onPressOperation(operation) {
        if(operation === '=') {
            this.onEqual()
            return
        }
        this.$currentPreview.textContent === '' ? 
        this.$previousPreview.textContent = "0 " + operation : 
        this.$previousPreview.textContent = this.$currentPreview.textContent + " " + operation

        this.isOperated = true
    }

    // 이전 텍스트에 완성된 계산식을 보여준 후, 현재 텍스트에 계산 결과를 나타냄
    onEqual() {
        const [a, operation] = this.$previousPreview.textContent.split(' ')
        const b = this.$currentPreview.textContent
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
            this.$currentPreview.textContent = Number(a) / Number(b)
        }

        this.$previousPreview.textContent = `
            ${a} ${operation} ${b} =
            `

        this.isOperated = true
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