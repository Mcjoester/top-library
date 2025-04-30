# Library Project

1. **Book Class**:
    - Handles individual book properties and methods.
    - The `toggleRead` method toggles the `read` status of the book.
2. **Library Class**:
    - Manages the collection of books and interactions with the DOM.
    - Contains methods to initialize event listeners, add books from the form, clear the form, loop through the library to render book cards, create book cards, and handle read and remove buttons.
    - The `initialize` method sets up event listeners and renders the initial library.
    - The `render` method updates the DOM with the current state of the library.

This refactoring separates concerns, making the code more modular, readable, and maintainable. The `Book` class focuses on the book's properties and behaviors, while the `Library` class handles the collection of books and their interactions with the user interface.
 
 
 Live:
https://mcjoester.github.io/top-library/
