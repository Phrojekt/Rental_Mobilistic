
# Rental Mobilistic

Trata-se de um aplicativo web de página única que oferece uma solução intuitiva e eficiente para o gerenciamento de aluguel de veículos de um cliente A para um cliente B. Com ajuda da tecnologia JavaScript, a página é dinâmica e fácil de usar.

Com uma interface intuitiva, você pode visualizar rapidamente a quantidade de carros registrados e alugados, divididos nas três categorias aceitas (Sedan, SUV e Hatch). Além disso, você pode adicionar novos veículos através do modal de registro e gerenciá-los com facilidade, incluindo opções de excluir, editar e mudar o estado de disponibilidade.

O campo de pesquisa permite que você filtre rapidamente os cards e encontre o que você precisa a partir do tipo do carro, do modelo, do nome do dono ou pelo ID. Além disso, o Rental Mobilistic é compatível com dispositivos de 360px e acima, com suporte limitado para dispositivos de 300px.



## Acesso e Uso

#### Link de acesso: https://phrojekt.github.io/Rental_Mobilistic/

O Rental Mobilistic está disponível para ser acessado pelo link acima. Uma vez acessado, o usuário pode facilmente registrar novos veículos clicando no botão "Adicionar Carro". É necessário preencher os campos de "Dono do Carro", "Tipo de Carro" (que só aceitará "Sedan", "SUV" ou "Hatch") e "Modelo do Carro".

Após o registro, o sistema irá atualizar a página e mostrar o novo veículo registrado em forma de card, contendo informações como nome do dono, ID gerado automaticamente, modelo de carro e tipo de carro. É possível alugar o veículo clicando no botão "Alugar", representado por uma pequena caixa com ícone de cadeado em seu interior, mudar as informações clicando no botão "Editar" ou excluir permanentemente clicando no botão "Excluir".

Para encontrar veículos específicos, é possível usar o campo de pesquisa disponível na página para procurar pelo nome do dono, pelo tipo de carro, o modelo ou pelo ID. Com ele, é possível filtrar os cards de acordo com as informações desejadas.

## Para Desenvolvedores

### Tecnologias Utilizadas

Neste projeto, foi utilizado HTML para a estruturação base da página, CSS para a estilização e o JavaScript para torna-la dinâmica.

### Funções e Diretrizes

#### **Funções**

Este é um código JavaScript para uma aplicação de sistema de gerenciamento de carros. 
É possível criar, ler, atualizar e excluir registros de carros em uma base de dados em localStorage, acessível por meio de funções getLocalStorage e setLocalStorage. 

A função Modal.open() e Modal.close() abrem e fecham uma janela modal para o registro de carros pela função saveCar() que recebe um ID aleatório da função generateID(), cujo os campos são validados por isValidFields(). 
A função clearFields() trata de limpar os dados no modal.

A aplicação também tem uma função para filtrar cards de carro baseado em informações específicas, a função FilterFunction(). 

#### **Diretrizes**

**1** - Utilize a base de dados localStorage para armazenar e acessar os dados dos carros, usando as funções getLocalStorage e setLocalStorage.

**2** - Utilize a janela modal para registrar carros, abrindo e fechando a modal através das funções Modal.open() e Modal.close().

**3** - A função saveCar() é responsável por salvar o carro no localStorage, com um ID gerado aleatoriamente pela função generateID().

**4** - Valide os campos do formulário antes de salvar o carro, usando a função isValidFields().

**5** - Limpe os dados do modal ao fechá-lo com a função clearFields().

**6** - Utilize a função FilterFunction() para filtrar cards de carros baseado nas informações específicas.

**7** - Mantenha o código claro, organizado e fácil de entender, seguindo boas práticas de codificação e padrões de design de software.
## Licença

Este projeto está licenciado sob a Creative Commons Attribution Non-Commercial (CC BY-NC). Isso significa que você pode compartilhar, modificar e usar o projeto para fins não comerciais, desde que dê crédito ao autor original.


## Créditos

Este projeto, Rental Mobilistic, é de autoria de Paulo Henrique P. de Sales, publicado oficialmente em 06/02/2023.
A licença de uso deste projeto é Creative Commons Attribution-NonCommercial (CC BY-NC).
Para mais informações e contato, você pode seguir o autor no Instagram: @Phrojekt_Dev.



