export class BookList {
    constructor() {
        this.bookListContainer = document.getElementById("book-list");
    }

    render(books, onDelete, onEdit) {
        if (books.length === 0) {
            this.bookListContainer.innerHTML = '<p class="text-center">Belum ada buku yang ditambahkan.</p>';
            return;
        }

        this.bookListContainer.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="book-stats">
                <span class="badge bg-primary rounded-pill">
                    <i class="bi bi-book"></i> Total Buku: ${books.length}
                </span>
                ${this.renderGenreStats(books)}
            </div>
        </div>
        <div class="mb-3">
            <label for="genre-filter" class="form-label">Filter berdasarkan Genre:</label>
            <select class="form-control rounded-pill neumorphic-input" id="genre-filter">
                <option value="">Semua Genre</option>
                <option value="Romance">Romance</option>
                <option value="Fantasi">Fantasi</option>
                <option value="Horor">Horor</option>
                <option value="Misteri">Misteri</option>
                <option value="Sejarah">Sejarah</option>
                <option value="Fiksi ilmiah">Fiksi ilmiah</option>
            </select>
        </div>
        <h2 class="h4 mb-3">Daftar Buku</h2>
        <div class="row" id="filtered-books">
            ${this.renderBooks(books)}
        </div>
    `;

        this.bookListContainer.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", () => onDelete(button.dataset.id));
        });

        this.bookListContainer.querySelectorAll(".edit-btn").forEach((button) => {
            button.addEventListener("click", () => onEdit(button.dataset.id));
        });

        this.bookListContainer.querySelector("#genre-filter").addEventListener("change", (e) => {
            const filteredBooks = e.target.value
                ? books.filter(book => book.genre === e.target.value)
                : books;

            document.getElementById("filtered-books").innerHTML = this.renderBooks(filteredBooks);

            this.bookListContainer.querySelectorAll(".delete-btn").forEach((button) => {
                button.addEventListener("click", () => onDelete(button.dataset.id));
            });

            this.bookListContainer.querySelectorAll(".edit-btn").forEach((button) => {
                button.addEventListener("click", () => onEdit(button.dataset.id));
            });
        });
    }

    renderBooks(books) {
        if (books.length === 0) {
            return '<p class="text-center">Belum ada buku yang ditambahkan.</p>';
        }

        return books
            .map(
                (book) => `
                <div class="col-md-6 mb-3">
                    <div class="card shadow-neumorphic book-card glassy">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text mb-1"><strong>Penulis:</strong> ${book.author}</p>
                            <p class="card-text mb-1"><strong>Tahun:</strong> ${book.year}</p>
                            <p class="card-text mb-1"><strong>Genre:</strong> ${book.genre}</p>
                            <div class="d-flex justify-content-end">
                                <button class="btn btn-warning btn-sm me-2 edit-btn" data-id="${book.id}">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${book.id}">Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
            )
            .join("");
    }

    renderGenreStats(books) {
        const genreCounts = books.reduce((acc, book) => {
            acc[book.genre] = (acc[book.genre] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(genreCounts)
            .map(([genre, count]) => `
                <span class="badge bg-secondary rounded-pill ms-2">
                    ${genre}: ${count}
                </span>
            `)
            .join('');
    }
};