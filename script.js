// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Example of adding an event listener
    const mainContent = document.querySelector('main');
    
    mainContent.addEventListener('click', () => {
        console.log('Main content was clicked!');
    });

    // Example function
    function sayHello() {
        alert('Hello from JavaScript!');
    }

    // You can call the function or attach it to an event as needed
    // sayHello();
});
