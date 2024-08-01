document.getElementById('input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleCommand();
    }
});

function handleCommand() {
    const input = document.getElementById('input');
    const terminal = document.getElementById('terminal');
    const command = input.value.trim();
    const output = document.createElement('div');
    output.className = 'output';
    output.textContent = '> ' + command;
    terminal.insertBefore(output, input.parentElement);
    input.value = '';
    processCommand(command, terminal);
    terminal.scrollTop = terminal.scrollHeight;
}

function processCommand(command, terminal) {
    const response = document.createElement('div');
    response.className = 'output';

    switch(command.toLowerCase()) {
        case 'python':
            response.textContent = 'Python 3.8.5';
            break;
        case 'help':
            response.textContent = 'Available commands: python, help';
            break;
        default:
            response.textContent = 'Command not found: ' + command;
    }

    terminal.insertBefore(response, document.getElementById('input').parentElement);
}

function insertText(text) {
    const input = document.getElementById('input');
    input.value = text;
    handleCommand();
}
