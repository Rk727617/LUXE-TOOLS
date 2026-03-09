document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-tools');
    const toolCards = document.querySelectorAll('.tool-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            toolCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const desc = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                toolCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('file-upload');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.backgroundColor = 'transparent';
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.backgroundColor = 'transparent';
            if (e.dataTransfer.files.length > 0) {
                handleFile(e.dataTransfer.files[0]);
            }
        });
        
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFile(e.target.files[0]);
            }
        });
    }
    
    function handleFile(file) {
        const uploadText = document.querySelector('.upload-area p');
        if (uploadText) {
            uploadText.innerHTML = `Selected file: <strong style="color: var(--gold-primary)">${file.name}</strong><br>Ready to process...`;
        }
        
        const processBtn = document.getElementById('process-btn');
        if (processBtn) {
            processBtn.style.display = 'inline-block';
            processBtn.textContent = 'Convert File';
            
            // Remove old event listeners if any
            const newProcessBtn = processBtn.cloneNode(true);
            processBtn.parentNode.replaceChild(newProcessBtn, processBtn);
            
            newProcessBtn.addEventListener('click', () => {
                newProcessBtn.textContent = 'Processing...';
                newProcessBtn.disabled = true;
                
                setTimeout(() => {
                    newProcessBtn.style.display = 'none';
                    
                    let downloadBtn = document.getElementById('download-btn');
                    if (!downloadBtn) {
                        downloadBtn = document.createElement('button');
                        downloadBtn.id = 'download-btn';
                        downloadBtn.className = 'btn-primary';
                        downloadBtn.style.backgroundColor = '#4CAF50';
                        downloadBtn.style.color = '#fff';
                        downloadBtn.style.marginTop = '1rem';
                        newProcessBtn.parentNode.insertBefore(downloadBtn, newProcessBtn.nextSibling);
                    }
                    
                    downloadBtn.style.display = 'inline-block';
                    downloadBtn.innerHTML = '⬇️ Download Result';
                    downloadBtn.onclick = () => {
                        alert('Download started!');
                    };
                }, 2000);
            });
        }
    }
});
