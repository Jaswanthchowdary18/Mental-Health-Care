function submitForm() {
    const feeling = document.getElementById('feeling').value;
    const anxious = document.getElementById('anxious').value;
    const mood = document.querySelector('select[name="mood"]').value;
    const hopeless = document.querySelector('input[name="hopeless"]:checked')?.value;
    const challenges = Array.from(document.querySelectorAll('input[name="challenges"]:checked')).map(el => el.value);
    const support = document.querySelector('input[name="support"]:checked')?.value;
    const loneliness = document.querySelector('select[name="loneliness"]').value;
    const expression = document.querySelector('input[name="expression"]:checked')?.value;
    const conflicts = document.querySelector('input[name="conflicts"]').value;

    // Store the data in localStorage to access in the next page
    const formData = {
        feeling,
        anxious,
        mood,
        hopeless,
        challenges,
        support,
        loneliness,
        expression,
        conflicts
    };

    localStorage.setItem("mentalHealthCheck", JSON.stringify(formData));

    // Redirect to 2index.html in the new folder
    window.location.href = "new/2index.html";
}


function submitForm() {
    // You can add form validation here if needed before redirecting
    window.location.href = "../new/2index.html"; // Redirects to 2index.html inside the 'new' folder
}
