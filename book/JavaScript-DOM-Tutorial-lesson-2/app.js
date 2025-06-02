  document.addEventListener('DOMContentLoaded', function() {
            // DOM elements
            const booksList = document.getElementById('books');
            const addBookForm = document.getElementById('add-book');
            const addInput = document.getElementById('add-input');
            const searchInput = document.getElementById('search-input');
            const bookCount = document.querySelector('.book-count');

            // Initial books data
            const books = [
                "Name of the Wind",
                "The Wise Man's Fear",
                "Kafka on the Shore",
                "The Master and the Margarita"
            ];

            // Function to update book count
            function updateBookCount() {
                const count = document.querySelectorAll('#books li').length;
                bookCount.textContent = `${count} book${count !== 1 ? 's' : ''} in your list`;
            }

            // Function to render books
            function renderBooks(booksArray = books) {
                booksList.innerHTML = '';
                
                if (booksArray.length === 0) {
                    booksList.innerHTML = '<div class="no-books">No books found. Add some books to your list!</div>';
                    updateBookCount();
                    return;
                }
                
                booksArray.forEach(book => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span class="name">${book}</span>
                        <span class="delete">delete</span>
                    `;
                    booksList.appendChild(li);
                });
                
                updateBookCount();
            }

            // Add book event
            addBookForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const title = addInput.value.trim();
                
                if (title) {
                    books.push(title);
                    renderBooks();
                    addInput.value = '';
                    addInput.focus();
                }
            });

            // Delete book event (using event delegation)
            booksList.addEventListener('click', function(e) {
                if (e.target.classList.contains('delete')) {
                    const li = e.target.parentElement;
                    const bookTitle = li.querySelector('.name').textContent;
                    const bookIndex = books.indexOf(bookTitle);
                    
                    if (bookIndex > -1) {
                        books.splice(bookIndex, 1);
                        renderBooks();
                    }
                }
            });

            // Search books event
            searchInput.addEventListener('input', function() {
                const term = searchInput.value.trim().toLowerCase();
                
                if (term) {
                    const filteredBooks = books.filter(book => 
                        book.toLowerCase().includes(term)
                    );
                    renderBooks(filteredBooks);
                } else {
                    renderBooks();
                }
            });

            // Initialize the app
            renderBooks();
        })