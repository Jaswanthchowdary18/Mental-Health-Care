let prompt = document.querySelector("#prompt");
let submitbtn = document.querySelector("#submit");
let chatContainer = document.querySelector(".chat-container");
let imagebtn = document.querySelector("#image");
let image = document.querySelector("#image img");
let imageinput = document.querySelector("#image input");
let downloadBtn = document.querySelector("#download-pdf");

const Api_Url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=(enter ur api key)";

let user = {
    message: null,
    file: {
        mime_type: null,
        data: null
    }
};

// Function to scroll chat to the bottom
function scrollToBottom() {
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
}

// Function to copy AI response text
function copyText(button) {
    let text = button.previousElementSibling.innerText;
    navigator.clipboard.writeText(text).then(() => {
        button.innerText = "Copied!";
        setTimeout(() => button.innerText = "Copy", 1500);
    }).catch(err => console.log("Copy failed", err));
}

// Function to generate AI response
async function generateResponse(aiChatBox) {
    let text = aiChatBox.querySelector(".ai-chat-area .response-text");
    let copyBtn = aiChatBox.querySelector(".copy-btn");
    
    let requestData = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "contents": [
                {
                    "parts": [
                        { text: user.message },
                        ...(user.file.data ? [{ inline_data: user.file }] : [])
                    ]
                }
            ]
        })
    };
    
    try {
        let response = await fetch(Api_Url, requestData);
        let data = await response.json();
        
        let apiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";
        
        // Format for headings and bullet points, and ensure length
        let formattedResponse = apiResponse
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold headings
            .replace(/\n/g, "<br><br>") // Paragraph spacing
            .replace(/^- (.*)$/gm, "<li>$1</li>"); // Bullet points

        // Ensure response is more than 1 page (adjust threshold as needed)
        if (formattedResponse.length < 2000) {
            formattedResponse += "<br><br><i>(This response was shorter than expected. Please ask a more detailed question for a more in-depth answer.)</i>";
        }
        
        text.innerHTML = formattedResponse;
        
        copyBtn.style.display = "inline-block"; // Show copy button
    } catch (error) {
        text.innerHTML = "Error: Unable to fetch response.";
        console.log(error);
    } finally {
        scrollToBottom();
        image.src = `img.svg`;
        image.classList.remove("choose");
        user.file = {};
    }
}

// Function to create chat boxes
function createChatBox(html, classes) {
    let div = document.createElement("div");
    div.innerHTML = html;
    div.classList.add(classes);
    return div;
}

// Function to handle user chat response
function handlechatResponse(userMessage) {
    if (!userMessage.trim()) return; // Prevent empty messages

    user.message = userMessage;
    
    let html = `<img src="user.png" alt="" id="userImage" width="8%">
<div class="user-chat-area">
${user.message}
${user.file.data ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />` : ""}
</div>`;
    
    prompt.value = "";
    let userChatBox = createChatBox(html, "user-chat-box");
    chatContainer.appendChild(userChatBox);
    
    scrollToBottom();
    
    setTimeout(() => {
        let html = `<img src="ai.png" alt="" id="aiImage" width="10%">
    <div class="ai-chat-area">
        <p class="response-text"><img src="loading.webp" alt="" class="load" width="50px"></p>
        <button class="copy-btn" onclick="copyText(this)" style="display:none;">Copy</button>
    </div>`;
        
        let aiChatBox = createChatBox(html, "ai-chat-box");
        chatContainer.appendChild(aiChatBox);
        generateResponse(aiChatBox);
    }, 600);
}

// Function to download chat as PDF
function downloadChatAsPDF() {
    let chatContent = document.querySelectorAll(".user-chat-box, .ai-chat-box");

    if (chatContent.length === 0) {
        alert("Chat is empty! Send a message first.");
        return;
    }

    let { jsPDF } = window.jspdf;
    let pdf = new jsPDF();
    let yOffset = 10;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Chat Conversation", 10, yOffset);
    yOffset += 10;

    chatContent.forEach(chat => {
        let text = chat.innerText;
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);

        let splitText = pdf.splitTextToSize(text, 180);
        pdf.text(splitText, 10, yOffset);
        yOffset += splitText.length * 6 + 5;
    });

    pdf.save("Chat_History.pdf");
}

// Ensure event listener is attached to existing download button
if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadChatAsPDF);
}

// Event listeners for user interaction
prompt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handlechatResponse(prompt.value);
    }
});

submitbtn.addEventListener("click", () => {
    handlechatResponse(prompt.value);
});

imageinput.addEventListener("change", () => {
    const file = imageinput.files[0];
    if (!file) return;
    
    let reader = new FileReader();
    reader.onload = (e) => {
        let base64string = e.target.result.split(",")[1];
        user.file = {
            mime_type: file.type,
            data: base64string
        };
        
        image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
        image.classList.add("choose");
    };
    
    reader.readAsDataURL(file);
});

imagebtn.addEventListener("click", () => {
    imagebtn.querySelector("input").click();
});

// Initial greeting
let initialGreeting = `<img src="ai.png" alt="" id="aiImage" width="10%">
    <div class="ai-chat-area">
        <p class="response-text">Hey there! I'm here to listen and support you. 💙 How are you feeling today? You can share anything—I'm here to help without judgment.</p>
    </div>`;

let initialChatBox = createChatBox(initialGreeting, "ai-chat-box");
chatContainer.appendChild(initialChatBox);
scrollToBottom();
