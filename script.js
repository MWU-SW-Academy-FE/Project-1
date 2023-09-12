class Calculator {
    $previousPreview
    $currentPreview

    constructor($previousPreview, $currentPreview) {
        this.$previousPreview = $previousPreview
        this.$currentPreview = $currentPreview
    }

    onPressNumber(number) {
        // TODO: validation
        this.$currentPreview.textContent += number
    }

    onPressOperation(operation) {
        this.$currentPreview.textContent === '' ? 
        this.$previousPreview.textContent = "0 " + operation : 
        this.$previousPreview.textContent = this.$currentPreview.textContent + " " + operation

        this.$currentPreview.textContent = ''
    }
}

// 값 표시
const $previousPreview = document.querySelector('[data-previous-preview]')
const $currentPreview = document.querySelector('[data-current-preview]')

// 사칙연산
const $plus = document.querySelector('[data-btn-plus]')
const $minus = document.querySelector('[data-btn-minus]')
const $multiple = document.querySelector('[data-btn-multiple]')
const $divide = document.querySelector('[data-btn-divide]')

// 숫자, 연산
const $numbers = document.querySelectorAll('[data-btn-number]')
const $operations = document.querySelectorAll('[data-btn-operation]')

const cal = new Calculator($previousPreview, $currentPreview)

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