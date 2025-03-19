const container = document.getElementById("container");
const registerbtn = document.getElementById("register");
const loginbtn = document.getElementById("login");
const signinBtn = document.getElementById("signinBtn");

// Toggle for Sign Up and Sign In
registerbtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginbtn.addEventListener("click", () => {
  container.classList.remove("active");
});

signinBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission (if inside a form)
    window.location.href = "../questions/1index.html"; // Correct path
  });
  