const closeBtn1 = document.querySelector('.closebtn');
const loginlink = document.querySelector('#account');
const loginForm = document.querySelector('.container');
const l2 = document.querySelector('.l2');



loginlink.addEventListener('click', function (event) {
    event.preventDefault();

    loginForm.style.display = 'block';
    signUpForm.style.display = 'none';

});
l2.addEventListener('click', function (event) {
    event.preventDefault();

    loginForm.style.display = 'block';
    signUpForm.style.display = 'none';

});
closeBtn1.addEventListener('click', function () {
    loginForm.style.display = 'none';
});



const emailValue = document.getElementById("loginemail");
const passwordValue = document.getElementById("loginpassword");

function Login(e) {

    e.preventDefault();


    const email = emailValue.value;
    const password = passwordValue.value;
    const userData = {
        email: email,
        password: password
    }

    checkData(userData);

}
async function checkData(userData) {

    try {

        let res = await axios.post("/user/login", userData);
        console.log('----------------->',res);
        if (res.status === 200) {
            alert("Login successful!");
            localStorage.setItem('token',res.data.token);
            // consoole.log(res.data.token);
            window.location.href="chat";
        }

        emailValue.value = '';
        passwordValue.value = '';



    } catch (err) {
        if (err.response) {
            if (err.response.status === 404) {
                alert("User does not exist");
            } else if (err.response.status === 401) {
                alert("Wrong Password");
            }
            else if (err.response.status === 500) {
                alert("An error occurred during login.");
            }
        } else {
            console.error('Error:', err);
        }
    }

}