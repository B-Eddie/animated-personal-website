document.getElementById("input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleCommand();
  }
});

function handleCommand() {
  const input = document.getElementById("input");
  const terminal = document.getElementById("terminal");
  const command = input.value.trim();
  const output = document.createElement("div");
  output.className = "output";
  const span1 = document.createElement("span");
  span1.className = "text-greene";
  span1.textContent = "~/Skills > ";

  const span2 = document.createElement("span");
  span2.className = "text-white";
  span2.textContent = command;

  output.appendChild(span1);
  output.appendChild(span2);
  terminal.insertBefore(output, input.parentElement);
  input.value = "";
  processCommand(command, terminal);
  terminal.scrollTop = terminal.scrollHeight;
}

function processCommand(command, terminal) {
  const response = document.createElement("div");
  response.className = "text-white output";

  switch (command.toLowerCase()) {
    case "python":
      response.innerHTML = "Level: Advanced<br>89%<br>Experience: 5 years";
      break;
    case "html":
      response.innerHTML = "Level: Advanced<br>90%<br>Experience: 3 years";
      break;
    case "css":
      response.innerHTML = "Level: Advanced<br>85%<br>Experience: 3 years";
      break;
    case "javascript":
      response.innerHTML = "Level: Intermediate<br>70%<br>Experience: 1 years";
      break;
    case "flask":
      response.innerHTML = "Level: Intermediate<br>73%<br>Experience: 2 years";
      break;
    case "mysql":
      response.innerHTML = "Level: Intermediate<br>80%<br>Experience: 2 years";
      break;
    case "csharp":
      response.innerHTML = "Level: Novice<br>30%<br>Experience: 3 years";
      break;
    case "java":
      response.innerHTML = "Level: Novice<br>40%<br>Experience: 3 years";
      break;
    case "help":
      response.innerHTML =
        "Available commands: python, html, css, javascript, csharp, flask, java, mysql, help";
      break;
    default:
      response.textContent = "Command not found: " + command;
  }

  terminal.insertBefore(
    response,
    document.getElementById("input").parentElement
  );
}

function insertText(text) {
  const input = document.getElementById("input");
  input.value = text;
  handleCommand();
}
