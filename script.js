let seguraTotal = 0;
let buffer = "0";
let anteOperador;

const visor = document.querySelector('.visor');

function buttonClick(value){
    if(isNaN(value)){
        resolveSimbolo(value);
    }else{
        resolveNumero(value)
    }

    visor.innerText = buffer;
}

function resolveSimbolo(simbolo){
    switch(simbolo){
        case 'C':
            buffer = '0';
            seguraTotal = 0;
            break;
            case '=':
                if(anteOperador === null){
                    return
                }
                flushOperation(parseInt(buffer));
                anteOperador = null;
                buffer = seguraTotal;
                seguraTotal = 0;
                break;
                    case '←':
                        if(buffer.length === 1){
                            buffer = '0';
                        }else{
                            buffer = buffer.toString(0, buffer.length - 1);
                        }
                        break;
                        case '+':
                        case '−':
                        case '×':
                        case '÷':
                        handleMath(simbolo);
                        break;
    }
}

function handleMath(simbolo){
    if(buffer === '0'){
        reurn;
    }
    const intBuffer = parseInt(buffer);
    
    if(seguraTotal === 0){
        seguraTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    anteOperador = simbolo; 
    buffer = '0';
}

function flushOperation(intBuffer){
    if(anteOperador === '+'){
        seguraTotal += intBuffer;
    } else if(anteOperador === '−'){
        seguraTotal -= intBuffer;
    }else if(anteOperador === '×'){
        seguraTotal *= intBuffer;
    }else if(anteOperador === '÷'){
        seguraTotal /= intBuffer;
    }
}

function resolveNumero(numberString){
    if(buffer === "0"){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
    buttonClick(event.target.innerText);
    })
}

init();

