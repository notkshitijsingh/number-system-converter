//html elements
const fromSystem = document.getElementById('from');
const toSystem = document.getElementById('to');
const numberToChange = document.getElementById('number');
const confirmButton = document.getElementById('cnf-btn');
const overlay = document.getElementById('overlay');
const steps = document.getElementById('steps');
const backButton = document.getElementById('back-btn');
const binaryDigits = ['0', '1'];
//event listener for buttons
confirmButton.addEventListener('click', function() {
    overlay.style.display = 'flex';
    from = fromSystem.value;
    to = toSystem.value;
    num = numberToChange.value;
    if ( from === to ) {
        steps.innerHTML = `The number remains the same, i.e., <br><b>${num}</b><br> since the "from" and "to" sections were the same.`
    } else if ( to === 'decimal' ) {
        if ( from === 'binary' ) {
            radix = 2;
        } else if ( from === 'octal' ) {
            radix = 8;
        } else if ( from === 'hexadecimal' ) {
            radix = 16;
        }
        toDecimal(num, radix);
    } else if ( from === 'decimal') {
        if ( to === 'binary' ) {
            radix = 2;
        } else if ( to === 'octal' ) {
            radix = 8;
        } else if ( to === 'hexadecimal' ) {
            radix = 16;
        }
        fromDecimal(num, radix);
    } else if ( from === 'binary' ) {
        if ( to === 'octal' ) {
            radix = 8;
        } else if ( to === 'hexadecimal' ) {
            radix = 16;
        }
        fromBinary(num, radix);
    } else if ( to === 'binary' ) {
        if ( from === 'octal' ) {
            radix = 8;
        } else if ( from === 'hexadecimal' ) {
            radix = 16;
        }
        toBinary(num, radix);
    } else if ( from === 'octal' && to === 'hexadecimal' ) {
        octalToHexadecimal(num);
    } else if ( to === 'octal' && from === 'hexadecimal' ) {
        hexadecimalToOctal(num);
    }
})
backButton.addEventListener('click', function() {
    overlay.style.display = 'none';
    steps.innerHTML = '';
})
//functions

function reverseString(str) {
    let newString = "";
    for (let i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}

function fromDecimal(x, r) {
    steps.innerHTML = steps.innerHTML + `<b>Converting (${x})<sub>10</sub><br><br></b>`;
    bin = 0;
    let rem, i = 1, step = 1;
    while (x != 0) {
        
        rem = x % r;
        steps.innerHTML = steps.innerHTML + `Step ${step++}: ${x}/${r}, Remainder = ${rem}, Quotient = ${parseInt(x/r)}` + '<br/>';
        x = parseInt(x / r);
        if ( r != 16 ) {
            bin = bin + rem * i;
            i = i * 10;
        } else {
            if ( rem === 10 ) {
                rem = 'A';
            } else if ( rem === 11 ) {
                rem = 'B';
            } else if ( rem === 12 ) {
                rem = 'C';
            } else if ( rem === 13 ) {
                rem = 'D';
            } else if ( rem === 14 ) {
                rem = 'E';
            } else if ( rem === 15 ) {
                rem = 'F';
            }
            bin = bin + String(rem);
        }
    }
    if ( r === 16 ) {
        bin = reverseString(bin);
        if ( bin[bin.length-1] === '0' ) {
            bin = bin.split("");
            bin.pop();
            bin = bin.join('');
        }
    }
    steps.innerHTML = steps.innerHTML + `<br>Hence, the converted form is: <b>(${bin})<sub>${r}</sub></b>`;
}
function toDecimal(x, r) {
    steps.innerHTML = steps.innerHTML + `<b>Converting (${x})<sub>${r}</sub><br><br></b>`;
    let dec = 0;
    let len = x.length - 1;
    var array = x.split('');
    for ( var i = 0; i < x.length; i++ ) {
        if ( array[i] === 'A' ) {
            array[i] = '10';
        } else if ( array[i] === 'B' ) {
            array[i] = '11';
        } else if ( array[i] === 'C' ) {
            array[i] = '12';
        } else if ( array[i] === 'D' ) {
            array[i] = '13';
        } else if ( array[i] === 'E' ) {
            array[i] = '14';
        } else if ( array[i] === 'F' ) {
            array[i] = '15';
        }
        dec = dec + array[i] * Math.pow(r, (len-i));
        steps.innerHTML = steps.innerHTML + ` ${array[i]} × ${r} <sup> ${len-i} </sup> <br>`;
    }
    steps.innerHTML = steps.innerHTML + `<br> Hence, the converted form is: <b>(${dec})<sub>10</sub></b>`;
}

function fromBinary(x, r) {
    steps.innerHTML = steps.innerHTML + `<b>Converting (${x})<sub>2</sub><br><br></b>Groups formed as follows:<br>`;
    grp = Math.log2(r);
    final = '';
    while ( x.length % grp != 0 ) {
        x = '0' + x;
    }
    copy = x;
    x = x.split('');
    if ( grp === 3 ) {
        while ( x.length > 0 ) {
            if (x[0] === '0' && x[1] === '0' && x[2] === '0' ){
                x.shift();
                x.shift();
                x.shift();
                final = final + '0';
            } else if (x[0] === '0' && x[1] === '0' && x[2] === '1' ){
                x.shift();
                x.shift();
                x.shift();
                final = final + '1';
            } else if (x[0] === '0' && x[1] === '1' && x[2] === '0' ){
                x.shift();
                x.shift();
                x.shift();
                final = final + '2';
            } else if (x[0] === '0' && x[1] === '1' && x[2] === '1' ){
                x.shift();
                x.shift();
                x.shift();
                final = final + '3';
            } else if (x[0] === '1' && x[1] === '0' && x[2] === '0' ){
                x.shift();
                x.shift();
                x.shift();
                final = final + '4';
            } else if (x[0] === '1' && x[1] === '0' && x[2] === '1' ){
                x.shift();
                x.shift();
                x.shift();
                final = final + '5';
            } else if (x[0] === '1' && x[1] === '1' && x[2] === '0' ){
                x.shift();
                x.shift();
                x.shift();
                final = final + '6';
            } else if (x[0] === '1' && x[1] === '1' && x[2] === '1' ){
                x.shift();
                x.shift();
                x.shift();
                final = final + '7';
            }
        }
    } else if ( grp === 4 ) {
        while ( x.length > 0 ) {
            if (x[0] === '0' && x[1] === '0' && x[2] === '0' && x[3] === '0'){
                x.shift();
                x.shift();
                x.shift();
                final = final + '0';
            } else if (x[0] === '0' && x[1] === '0' && x[2] === '0' && x[3] === '1' ){
                x.shift();
                x.shift();
                x.shift();
                x.shift();
                final = final + '1';
            } else if (x[0] === '0' && x[1] === '0' && x[2] === '1' && x[3] === '0' ){
                x.shift();
                x.shift();
                x.shift();
                x.shift();
                final = final + '2';
            } else if (x[0] === '0' && x[1] === '0' && x[2] === '1' && x[3] === '1' ){
                x.shift();
                x.shift();
                x.shift();
                x.shift();
                final = final + '3';
            } else if (x[0] === '0' && x[1] === '1' && x[2] === '0' && x[3] === '0' ){
                x.shift();
                x.shift();
                x.shift();
                x.shift();
                final = final + '4';
            } else if (x[0] === '0' && x[1] === '1' && x[2] === '0' && x[3] === '1' ){
                x.shift();
                x.shift();
                x.shift();
                x.shift();
                final = final + '5';
            } else if (x[0] === '0' && x[1] === '1' && x[2] === '1' && x[3] === '0' ){
                x.shift();
                x.shift();
                x.shift();
                x.shift();
                final = final + '6';
            } else if (x[0] === '0' && x[1] === '1' && x[2] === '1' && x[3] === '1' ){
                x.shift();
                x.shift();
                x.shift();
                x.shift();
                final = final + '7';
            } else if (x[0] === '1' && x[1] === '0' && x[2] === '0' && x[3] === '0' ){
                x.shift();
                x.shift();
                x.shift();
                x.shift();
                final = final + '8';
            } else if (x[0] === '1' && x[1] === '0' && x[2] === '0' && x[3] === '1' ){
                x.shift();
                x.shift();
                x.shift();
                x.shift();
                final = final + '9';
            } else if (x[0] === '1' && x[1] === '0' && x[2] === '1' && x[3] === '1' ){
                x.shift();
                x.shift();
                x.shift();
                x.shift();
                final = final + 'B';
            } else if (x[0] === '1' && x[1] === '1' && x[2] === '0' && x[3] === '0' ){
                x.shift();
                x.shift();
                x.shift();
                x.shift();
                final = final + 'C';
            } else if (x[0] === '1' && x[1] === '1' && x[2] === '0' && x[3] === '1' ){
                x.shift();
                x.shift();
                x.shift();
                x.shift();
                final = final + 'D';
            } else if (x[0] === '1' && x[1] === '1' && x[2] === '1' && x[3] === '0' ){
                x.shift();
                x.shift();
                x.shift();
                x.shift();
                final = final + 'E';
            } else if (x[0] === '1' && x[1] === '1' && x[2] === '1' && x[3] === '1' ){
                x.shift();
                x.shift();
                x.shift();
                x.shift();
                final = final + 'F';
            } else if (x[0] === '1' && x[1] === '0' && x[2] === '1' && x[3] === '0' ){
                x.shift();
                x.shift();
                x.shift();
                x.shift();
                final = final + 'A';
            }
        }
    }
    copy = copy.split('');
    if (grp === 3) {
        while (copy.length > 0) {
            steps.innerHTML = steps.innerHTML + `<u>${copy[0]}${copy[1]}${copy[2]}</u> `;
            copy.shift();
            copy.shift();
            copy.shift();
        }
    } else if (grp === 4) {
        while (copy.length > 0) {
            steps.innerHTML = steps.innerHTML + `<u>${copy[0]}${copy[1]}${copy[2]}${copy[3]}</u> `;
            copy.shift();
            copy.shift();
            copy.shift();
            copy.shift();
        }
    }
    steps.innerHTML = steps.innerHTML + `<br> On converting:<br>`;
    for ( let i = 0; i < final.length; i++ ) {
        space = '&nbsp;&nbsp;';
        spaces = space.repeat(grp);
        steps.innerHTML = steps.innerHTML + spaces + `${final[i]}`;
    }
    steps.innerHTML = steps.innerHTML + `<br><br> Hence, the converted form is: <b>(${final})<sub>${r}</sub></b>`;
}
function toBinary(x, r) {
    steps.innerHTML = steps.innerHTML + `<b>Converting (${x})<sub>${r}</sub><br><br></b>Digits Separated:<br>`;
    final = '';
    if ( r === 8 ) {
        for ( let i = 0; i < x.length; i++ ) {
            steps.innerHTML = steps.innerHTML + `${x[i]}&nbsp; &nbsp; &nbsp;`;
        }
        steps.innerHTML = steps.innerHTML + `<br>Changing to binary:<br>`;
        for ( let i = 0; i < x.length; i++ ) {
            if ( x[i] === '0' ) {
                final = final + '000';
                steps.innerHTML = steps.innerHTML + '000 &nbsp; &nbsp;';
            } else if ( x[i] === '1' ) {
                final = final + '001';
                steps.innerHTML = steps.innerHTML + '001 &nbsp; &nbsp;';
            } else if ( x[i] === '2' ) {
                final = final + '010';
                steps.innerHTML = steps.innerHTML + '010 &nbsp; &nbsp;';
            } else if ( x[i] === '3' ) {
                final = final + '011';
                steps.innerHTML = steps.innerHTML + '011 &nbsp; &nbsp;';
            } else if ( x[i] === '4' ) {
                final = final + '100';
                steps.innerHTML = steps.innerHTML + '100 &nbsp; &nbsp;';
            } else if ( x[i] === '5' ) {
                final = final + '101';
                steps.innerHTML = steps.innerHTML + '101 &nbsp; &nbsp;';
            } else if ( x[i] === '6' ) {
                final = final + '110';
                steps.innerHTML = steps.innerHTML + '110 &nbsp; &nbsp;';
            } else if ( x[i] === '7' ) {
                final = final + '111';
                steps.innerHTML = steps.innerHTML + '111 &nbsp; &nbsp;';
            }
        } 
    } else if ( r === 16 ) {
        for ( let i = 0; i < x.length; i++ ) {
            steps.innerHTML = steps.innerHTML + `${x[i]}&nbsp; &nbsp; &nbsp;`;
        }
        steps.innerHTML = steps.innerHTML + `<br>Changing to binary:<br>`;
        for ( let i = 0; i < x.length; i++ ) {
            if ( x[i] === '0' ) {
                final = final + '0000';
                steps.innerHTML = steps.innerHTML + '0000 &nbsp; &nbsp;';
            } else if ( x[i] === '1' ) {
                final = final + '0001';
                steps.innerHTML = steps.innerHTML + '0001 &nbsp; &nbsp;';
            } else if ( x[i] === '2' ) {
                final = final + '0010';
                steps.innerHTML = steps.innerHTML + '0010 &nbsp; &nbsp;';
            } else if ( x[i] === '3' ) {
                final = final + '0011';
                steps.innerHTML = steps.innerHTML + '0011 &nbsp; &nbsp;';
            } else if ( x[i] === '4' ) {
                final = final + '0100';
                steps.innerHTML = steps.innerHTML + '0100 &nbsp; &nbsp;';
            } else if ( x[i] === '5' ) {
                final = final + '0101';
                steps.innerHTML = steps.innerHTML + '0101 &nbsp; &nbsp;';
            } else if ( x[i] === '6' ) {
                final = final + '0110';
                steps.innerHTML = steps.innerHTML + '0110 &nbsp; &nbsp;';
            } else if ( x[i] === '7' ) {
                final = final + '0111';
                steps.innerHTML = steps.innerHTML + '0111 &nbsp; &nbsp;';
            } else if ( x[i] === '8' ) {
                final = final + '1000';
                steps.innerHTML = steps.innerHTML + '1000 &nbsp; &nbsp;';
            } else if ( x[i] === '9' ) {
                final = final + '1001';
                steps.innerHTML = steps.innerHTML + '1001 &nbsp; &nbsp;';
            } else if ( x[i] === 'A' ) {
                final = final + '1010';
                steps.innerHTML = steps.innerHTML + '1010 &nbsp; &nbsp;';
            } else if ( x[i] === 'B' ) {
                final = final + '1011';
                steps.innerHTML = steps.innerHTML + '1011 &nbsp; &nbsp;';
            } else if ( x[i] === 'C' ) {
                final = final + '1100';
                steps.innerHTML = steps.innerHTML + '1100 &nbsp; &nbsp;';
            } else if ( x[i] === 'D' ) {
                final = final + '1101';
                steps.innerHTML = steps.innerHTML + '1101 &nbsp; &nbsp;';
            } else if ( x[i] === 'E' ) {
                final = final + '1110';
                steps.innerHTML = steps.innerHTML + '1110 &nbsp; &nbsp;';
            } else if ( x[i] === 'F' ) {
                final = final + '1111';
                steps.innerHTML = steps.innerHTML + '1111 &nbsp; &nbsp;';
            }
        }
    }
    final = final.split('');
    while ( final[0] === '0' ) {
        final.shift();
    }
    final = final.join('');
    steps.innerHTML = steps.innerHTML + `<br><br>Hence, the converted form is: <b>(${final})<sub>2</sub></b>`;

    return final;
}
function octalToHexadecimal(x) {
    steps.innerHTML = steps.innerHTML + 'We will convert to binary first, and then form groups of 4 to <br>convert to hexadecimal.<br>';
    bin = toBinary(x, 8);
    steps.innerHTML = steps.innerHTML + '<br><br>';
    final = fromBinary(bin, 16);
}

function hexadecimalToOctal(x) {
    steps.innerHTML = steps.innerHTML + 'We will convert to binary first, and then form groups of 3 to <br>convert to octal.<br>';
    bin = toBinary(x, 16);
    steps.innerHTML = steps.innerHTML + '<br><br>';
    final = fromBinary(bin, 8);
}
function errorWindow() {
    steps.innerHTML = steps.innerHTML + 'We have encountered an error.<br><br>Please go back and try again.';
}