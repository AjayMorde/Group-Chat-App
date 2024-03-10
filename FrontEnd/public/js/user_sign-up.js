
const signUpLink = document.querySelector('.sign-up-link');
const signUpForm = document.querySelector('.sign-up-form');
const closeBtn = document.querySelector('.close-btn');
const l1 = document.querySelector('.l1');
const name=document.getElementById('name');
const email=document.getElementById('email');
const tel=document.getElementById('tel');
const password=document.getElementById('password');
const cpassword=document.getElementById('cpassword');
const btn=document.getElementById('btn');
// const loginForm = document.querySelector('.login-form'); 

signUpLink.addEventListener('click', function (event) {
    event.preventDefault();

    signUpForm.style.display = 'block';
    loginForm.style.display = 'none';

});
l1.addEventListener('click', function (event) {
    event.preventDefault();

    signUpForm.style.display = 'block';
    loginForm.style.display = 'none';

});

closeBtn.addEventListener('click', function () {
    signUpForm.style.display = 'none';
});




function signup(event){
    event.preventDefault();
    const nameValue = name.value; 
    const emailValue = email.value; 
    const telValue = tel.value;
    const passwordValue = password.value;
    // const cpasswordValue = cpassword.value;

    const userData = {
        Name: nameValue,
        Email: emailValue,
        Number: telValue,
        Password: passwordValue,
        
    };
    sendUserData(userData)

}
    async function sendUserData(userData){
       
    try{
        
        const res = await axios.post('/user/signup', userData);

        if(res.status===200){
            alert(res.data.msg)
            window.location.href='/chat'
        

        }
      

    }catch (err) {
        console.log(err);
        if (err.response && err.response.data && err.response.data.msg) {
            alert(err.response.data.msg);
        } else {
            alert("something went wrong");
        }
    }
}