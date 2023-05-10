var iframes = []; // Array para armazenar os iframes criados

function criarIframe() {
    var numDivs = document.querySelectorAll('.content iframe').length;
    if (numDivs >= 3) {
        aviso = document.getElementById('limiteMaximo')
        aviso.style.display = "block"
        return;
    }

    var divContainer = document.createElement('div');
    divContainer.classList.add('content-item');
    divContainer.classList.add('row');

    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.bing.com';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.overflow = 'auto';
    
    document.getElementById("message").style.display = "none";
    divContainer.appendChild(iframe);
    iframes.push(iframe);

    var divRow = document.getElementById('div-row');
    if (divRow) {
        divRow.appendChild(divContainer);
        $('.content-item').resizable(); // Aplicando a função resizable do jQuery UI
    } else {
        console.error('Elemento com ID "div-row" não encontrado no DOM.');
    }
}

function fecharPopup() {
        aviso = document.getElementById('limiteMaximo')
        aviso.classList.add('animate__fadeOut')
        setTimeout(() => {
            aviso.style.display = "none"
        }, 1000);
        setTimeout(() => {
            aviso.classList.remove('animate__fadeOut')
        }, 2000)
}


document.querySelector('.create-iframe-button').addEventListener('click', criarIframe)

document.getElementById("delete-iframe").addEventListener("click", function() {
    // Obter o iframe selecionado
    var iframeSelecionado = document.querySelector(".content-item");

    // Verificar se um iframe está selecionado
    if (iframeSelecionado) {
        // Remover o iframe selecionado
        iframeSelecionado.remove();
        // Remover o iframe do array 'iframes'
        iframes = iframes.filter(function(iframe) {
            return iframe !== iframeSelecionado;
        });
    } else {
        // Caso contrário, exibir uma mensagem de erro ou realizar outra ação
        document.getElementById('naoRemover').style.display = "flex"
    }
});

document.getElementById("show-iframe-list").addEventListener("click", function() {
    // Exibir o modal com a lista de iframes
    document.getElementById("iframe-list-modal").classList.add('animate__animated', 'animate__fadeIn');
    document.getElementById("iframe-list-modal").style.display = "block";
    var iframeList = document.getElementById("iframe-list");
    iframeList.innerHTML = ""; // Limpar a lista de iframes antes de atualizar

    // Gerar dinamicamente a lista de iframes
    for (var i = 0; i < iframes.length; i++) {
        var li = document.createElement("li");
        li.textContent = "Iframe " + (i + 1);
        li.classList.add("modal-iframe");
        li.dataset.index = i; 
        iframeList.appendChild(li);
    }
});

document.getElementById("close-modal").addEventListener("click", function() {
    // Fechar o modal
    document.getElementById("iframe-list-modal").classList.add('animate__fadeOut')
    setTimeout(() => {
        document.getElementById("iframe-list-modal").style.display = "none"
    }, 1000);
    setTimeout(() => {
        document.getElementById("iframe-list-modal").classList.remove('animate__fadeOut')
    }, 2200)
});

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("modal-iframe")) {
        var index = parseInt(event.target.dataset.index);
        var iframeSelecionado = iframes[index];

        // Remover a classe 'selected' de todos os iframes
        var iframesAntigos = document.querySelectorAll(".created-iframe");
        for (var i = 0; i < iframesAntigos.length; i++) {
            iframesAntigos[i].classList.remove("selected");
        }

        // Adicionar a classe 'selected' ao iframe selecionado
        iframeSelecionado.classList.add("selected");
    }
});

document.querySelector('.layout-button').addEventListener('click', function() {
    // Obter todos os iframes existentes
    const iframes = document.querySelectorAll('.content iframe');

    // Verificar se há pelo menos dois iframes para aplicar o layout
    if (iframes.length >= 2) {
        const layoutType = prompt("Escolha o layout:\n1 - Horizontal (em adaptação)\n2 - Vertical");

        // Verificar a escolha do usuário e aplicar o layout correspondente
        if (layoutType === '1') {
            // Layout horizontal: ajustar o estilo dos iframes
            iframes.forEach((iframe, index) => {
                if (iframes.length > 1) {
                    iframe.style.width = (100 / iframes.length) + '%';
                } else {
                    iframe.style.width = '100%';
                }
                iframe.style.height = '100%';
                iframe.style.float = 'left';
            });
        }
         else if (layoutType === '2') {
            // Layout vertical: ajustar o estilo dos iframes
            iframes.forEach(iframe => {
                iframe.style.width = '100%';
                iframe.style.height = (100 / iframes.length) + '%';
                iframe.style.float = 'none';
            });
        } else {
            // Opção inválida: exibir mensagem de erro
            alert("Opção inválida. Por favor, escolha entre 1 ou 2.");
        }
    } else {
        // Não há pelo menos dois iframes: exibir mensagem de erro
        document.getElementById('naoEditar').style.display = "flex"
    }
});