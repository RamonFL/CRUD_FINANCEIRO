document.addEventListener('DOMContentLoaded', function () {

    const table_id = document.getElementById('table_id')
    const btn_incluir = document.getElementById('btn_incluir')
    const btn_refresh = document.getElementById('btn_refresh')
    const information = []
    let index = 1;
    let DadosEntrada = document.getElementById('DadosEntradas')
    let DadosSaidas = document.getElementById('DadosSaidas')
    let DadosTotal = document.getElementById('DadosTotal')
    let somaEntrada = 0;
    let somaSaida = 0;

    const svgString = `<svg class="SVG" id="SVG_id" clip-rule="evenodd" 
        fill-rule="evenodd" stroke-linejoin="round" 
        stroke-miterlimit="2" viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"><path 
        d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1
        1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 
    0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z" fill-rule="nonzero"/></svg>`;

    
    
    btn_incluir.addEventListener('click', function () {
        const descricaoValor = document.getElementById('inptdesc_id').value;
        const valorInput = document.getElementById('InputValueHTML');
        const tipoValor = document.getElementById('InputSelect_id').value;
        const dataValor = document.getElementById('InputValueData_id').value;

        // Verificar se algum campo está vazio
        if (!descricaoValor || isNaN(parseFloat(valorInput.value)) || !tipoValor) {
            alert('Por favor, preencha todos os campos corretamente.')
            return
        }

        // Formatar o valor usando toLocaleString
        const valorFormatado = parseFloat(valorInput.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 });

        const Valores = {
            index: index,
            Data: dataValor,
            Description: descricaoValor,
            Valor: valorFormatado,
            tipo: tipoValor,
            excluir: svgString
        };

        information.push(Valores);

        

        information.forEach(function (item) {
            const valorNumerico = parseFloat(item.Valor.replace('R$', '').replace('.', '').replace(',', '.'));

            if (item.tipo === 'Entrada') {
                somaEntrada += valorNumerico;
            } else if (item.tipo === 'Saida') {
                somaSaida += valorNumerico;
            }
        });


        DadosEntrada.textContent = "R$ " + somaEntrada.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        DadosSaidas.textContent = "R$ " + somaSaida.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        DadosTotal.textContent = "R$ " + (somaEntrada - somaSaida).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

        
        
        criarLinhaTabela({
            Data: dataValor,
            Description: descricaoValor,
            Valor: valorFormatado,
            tipo: tipoValor
        });

        tdExcluir.querySelector('.SVG').addEventListener('click', function (event) {
            // Obtendo o elemento pai do SVG (a célula <td>)
            const tdPai = event.target.closest('td');

            // Obtendo o elemento avô do SVG (a linha <tr>)
            const trPai = tdPai.closest('tr');

            // Obtendo o valor do atributo data-index
            const indexParaExcluir = trPai.getAttribute('data-index');

            // Chamando a função para excluir a linha pelo índice
            excluirLinhaPorIndex(indexParaExcluir);
        })

        // Adicionar o evento de clique ao SVG dentro da nova linha
        

        function excluirLinhaPorIndex(index) {
            const linhaParaExcluir = document.querySelector(`tr[data-index="${index}"]`);
            let i = index
            DelObject(i)
            
            if (linhaParaExcluir) {
                // Remover a linha da tabela
                table_id.removeChild(linhaParaExcluir);

                // Remover o item do array 'information' pelo índice
                const indexToRemove = information.findIndex(item => item.index === parseInt(index));
                information.splice(indexToRemove, 1);

                // Atualizar os valores de entrada, saída e total
                atualizarValores()
                atualizarEntradas()
                atualizarSaidas()

            }
        }

        // aqui atualiza o valores 
        function atualizarValores() {
            let somaEntrada = 0;
            let somaSaida = 0;

            information.forEach(function (item) {
                const valorNumerico = parseFloat(item.Valor.replace('R$', '').replace('.', '').replace(',', '.'));

                if (item.tipo === 'Entrada') {
                    somaEntrada += valorNumerico;
                } else {
                    somaSaida += valorNumerico;
                }
            });

            const saldoTotal = somaEntrada - somaSaida;

            DadosEntrada.textContent = "R$ " + somaEntrada.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            DadosSaidas.textContent = "R$ " + somaSaida.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            DadosTotal.textContent = "R$ " + saldoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        //aqui atualiza os valores de entrada quando remove um item
        function atualizarEntradas() {
            let somaEntrada = 0;

            information.forEach(function (item) {
                const valorNumerico = parseFloat(item.Valor.replace('R$', '').replace('.', '').replace(',', '.'));

                if (item.tipo === 'Entrada') {
                    somaEntrada += valorNumerico;
                }
            });

            DadosEntrada.textContent = "R$ " + somaEntrada.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        //aqui atualiza os valores de Saida quando remove um item
        function atualizarSaidas() {
            let somaSaida = 0;

            information.forEach(function (item) {
                const valorNumerico = parseFloat(item.Valor.replace('R$', '').replace('.', '').replace(',', '.'));

                if (item.tipo === 'Saida') {
                    somaSaida += valorNumerico;
                }
            });

            DadosSaidas.textContent = "R$ " + somaSaida.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            
        }
        carregarDados()
    });

    function excluirLinhaPorIndex(index) {
        const linhaParaExcluir = document.querySelector(`tr[data-index="${index}"]`);
        let i = index
        DelObject(i)
        
        if (linhaParaExcluir) {
            // Remover a linha da tabela
            table_id.removeChild(linhaParaExcluir);

            // Remover o item do array 'information' pelo índice
            const indexToRemove = information.findIndex(item => item.index === parseInt(index));
            information.splice(indexToRemove, 1);

            // Atualizar os valores de entrada, saída e total
            atualizarValores()
            atualizarEntradas()
            atualizarSaidas()

        }
    }

    function excluirLinhaPorIndex(index) {
            const linhaParaExcluir = document.querySelector(`tr[data-index="${index}"]`);
            let i = index
            DelObject(i)
            
            if (linhaParaExcluir) {
                // Remover a linha da tabela
                table_id.removeChild(linhaParaExcluir);

                // Remover o item do array 'information' pelo índice
                const indexToRemove = information.findIndex(item => item.index === parseInt(index));
                information.splice(indexToRemove, 1);

                // Atualizar os valores de entrada, saída e total
                atualizarValores()
                atualizarEntradas()
                atualizarSaidas()

            }
    }

    // aqui atualiza o valores 
    function atualizarValores() {
        let somaEntrada = 0;
        let somaSaida = 0;

        information.forEach(function (item) {
            const valorNumerico = parseFloat(item.Valor.replace('R$', '').replace('.', '').replace(',', '.'));

            if (item.tipo === 'Entrada') {
                somaEntrada += valorNumerico;
            } else {
                somaSaida += valorNumerico;
            }
        });

        const saldoTotal = somaEntrada - somaSaida;

        DadosEntrada.textContent = "R$ " + somaEntrada.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        DadosSaidas.textContent = "R$ " + somaSaida.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        DadosTotal.textContent = "R$ " + saldoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    //aqui atualiza os valores de entrada quando remove um item
    function atualizarEntradas() {
        let somaEntrada = 0;

        information.forEach(function (item) {
            const valorNumerico = parseFloat(item.Valor.replace('R$', '').replace('.', '').replace(',', '.'));

            if (item.tipo === 'Entrada') {
                somaEntrada += valorNumerico;
            }
        });

        DadosEntrada.textContent = "R$ " + somaEntrada.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    //aqui atualiza os valores de Saida quando remove um item
    function atualizarSaidas() {
        let somaSaida = 0;

        information.forEach(function (item) {
            const valorNumerico = parseFloat(item.Valor.replace('R$', '').replace('.', '').replace(',', '.'));

            if (item.tipo === 'Saida') {
                somaSaida += valorNumerico;
            }
        });

        DadosSaidas.textContent = "R$ " + somaSaida.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        
    }
    
    btn_refresh.addEventListener('click', async function () {
        const response = await fetch('http://localhost:3000/dados')
        const dados = await response.json()

        // Zera a tabela antes de recarregar (opcional)
        table_id.innerHTML = "";
        information.length = 0;
        somaEntrada = 0;
        somaSaida = 0;

        dados.forEach(item => {
            // Aqui ajusta o valor para string formatada se vier como número
            const valorFormatado = typeof item.valor === 'string' ? item.valor :
            parseFloat(item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

            criarLinhaTabela({
                id: item.id,
                Data: item.data.split('T')[0],
                Description: item.descricao,
                Valor: valorFormatado,
                tipo: item.tipo
            });
            
        });
    });

    async function carregarDados() {
        try {
            const response = await fetch('http://localhost:3000/dados');
            const dados = await response.json();

            table_id.innerHTML = '';
            information.length = 0;
            somaEntrada = 0;
            somaSaida = 0;

            dados.forEach(dado => {
                criarLinhaTabela(dado);
            });

        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }

    function criarLinhaTabela(dado) {
        const dataIndex = dado.id || index;

        // Verifica se já existe uma linha com esse data-index
        if (document.querySelector(`tr[data-index="${dataIndex}"]`)) {
            console.warn(`Linha com data-index ${dataIndex} já existe. Ignorando duplicata.`);
            return; // Sai da função sem adicionar
        }

        const newTable = document.createElement('tr');
        newTable.setAttribute('data-index', dataIndex);

        index++; // Mantém o contador para inserções manuais

        const Valores = {
            index: dataIndex,
            Data: dado.data?.split('T')[0] || dado.Data,
            Description: dado.descricao || dado.Description,
            Valor: dado.valor || dado.Valor,
            tipo: dado.tipo || dado.Tipo,
            excluir: svgString
        };

        information.push(Valores);

        const valorNumerico = parseFloat(Valores.Valor.replace('R$', '').replace('.', '').replace(',', '.'));

        if (Valores.tipo === 'Entrada') {
            somaEntrada += valorNumerico;
        } else if (Valores.tipo === 'Saida') {
            somaSaida += valorNumerico;
        }

        DadosEntrada.textContent = "R$ " + somaEntrada.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        DadosSaidas.textContent = "R$ " + somaSaida.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        DadosTotal.textContent = "R$ " + (somaEntrada - somaSaida).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

        const tdData = document.createElement('td');
        const tdDescricao = document.createElement('td');
        const tdValor = document.createElement('td');
        const tdTipo = document.createElement('td');
        const tdExcluir = document.createElement('td');

        tdData.textContent = Valores.Data;
        tdDescricao.textContent = Valores.Description;
        tdValor.textContent = Valores.Valor;
        tdTipo.textContent = Valores.tipo;
        tdExcluir.innerHTML = Valores.excluir;

        newTable.classList.add('TableStyle');
        newTable.appendChild(tdData);
        newTable.appendChild(tdDescricao);
        newTable.appendChild(tdValor);
        newTable.appendChild(tdTipo);
        newTable.appendChild(tdExcluir);
        table_id.appendChild(newTable);

        tdExcluir.querySelector('.SVG').addEventListener('click', function (event) {
            const tdPai = event.target.closest('td');
            const trPai = tdPai.closest('tr');
            const indexParaExcluir = trPai.getAttribute('data-index');
            excluirLinhaPorIndex(indexParaExcluir);
        });
    }
});

