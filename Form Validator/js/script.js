const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const email = document.getElementById('email');
const confirmPassword = document.getElementById('confirm-password');


function showError(input,message){
    const formItem = input.parentElement;
    formItem.className = 'form_item error';
    const small = formItem.querySelector('small');
    small.innerText = message;
}

function showSuccess(input){
    const formItem = input.parentElement;
    formItem.className = 'form_item success';

}

function checkEmail(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(re.test(input.value.trim())){
        showSuccess(input);

    } else {
        showError(input,'Email is not valid');

    }
}

function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequired(inputArray){
    inputArray.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`);

        } else {
            showSuccess(input);
        }
    });
}

function checkPassword(input1,input2){
    if(input1.value !== input2.value){
        showError(input2, 'Password do not match');
    }
    else{
        showSuccess(input2);
    }
}


function checkLength(input,min,max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be atleast ${min} characters`);
    } else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else{
        showSuccess(input);
    }
}
username.addEventListener('keyup', function(){
    checkLength(username,3,15);
})
email.addEventListener('keyup', function(){
    checkEmail(email);

})
password.addEventListener('keyup', function(){
    checkLength(password,6,25);

})

confirmPassword.addEventListener('keyup', function(){
    
    checkPassword(password, confirmPassword);
})

// form.addEventListener('submit', function(e){
//     e.preventDefault();
//     checkRequired([username,email,password,confirmPassword]);
// });