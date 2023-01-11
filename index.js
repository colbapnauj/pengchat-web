

// async function loginEmail(event)  {

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
    
//     event.preventDefault();

//     try {

//     const res = await fetch(
//         "http://localhost:3000/api/login",
//         {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email: email,
//                 password: password
//             })
//         }
//     );

//     const userData = res.json();

//     console.log(userData);

//     window.location.replace('/home.html');

//     } catch(error) {
//         console.log(error);
//     }
    
    
    

// }

// const loginButton = document.querySelector("#login-button");

// loginButton.addEventListener("click", loginEmail);