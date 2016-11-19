const rulesTree = {
    false: {
        false:{
            false: true,
            true: false
        },
        true:{
            false: false,
            true: true
        }
    },
    true: {
        false:{
            false: false,
            true: true
        },
        true:{
            false: true,
            true: false
        }
    }
}

window.onload = function (){
    generateSeedRow()
    startMutating()
}

function generateSeedRow(){
    let row = document.createElement('div')
    row.classList.add('row')
    for(let i = 0; i < 200; i++){
        let div = document.createElement('div')
        div.classList.add(randomBool() ? 'active' : 'inactive')
        row.appendChild(div)
    }
    document.getElementById('world').appendChild(row)
}

function randomBool(){
    return Math.floor(Math.random() * 2)
}

function startMutating(){
    for(let i = 0; i < 180; i++){
        let allRows = document.querySelectorAll('.row')
        let lastRow = allRows[allRows.length - 1]
        let newRow = lastRow.cloneNode(true)
        mutateRow(newRow, lastRow);
        document.getElementById('world').appendChild(newRow)
    }
}

function mutateRow(row, parentRow){
    for(let i = 0; i < row.childNodes.length; i++){
        let target = row.childNodes[i]
        let self = parentRow.childNodes[i]
        let leftSibling = self.previousElementSibling || 
            parentRow.childNodes[parentRow.childNodes.length - 1]
        let rightSibling = self.nextElementSibling ||
            parentRow.childNodes[0]

        let evaluation = evaluateByRule(leftSibling, self, rightSibling)
        setActive(target, evaluation)
    }

}

function setActive(div, value){
    div.className = ""
    let newClass = value ? 'active' : 'inactive'
    div.classList.add(newClass)
}

function evaluateByRule(left, self, right){
    left = left.classList.contains('active')
    self = self.classList.contains('active')
    right = right.classList.contains('active')
    return rulesTree[left][self][right]
}