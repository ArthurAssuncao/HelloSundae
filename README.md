[comment]: # 'Logo'

<p align="center">
    <img src="https://raw.githubusercontent.com/ArthurAssuncao/HelloSundae/main/src/assets/icons/hello-sundae-w-text.png" width="70%" />
</p>

[comment]: # 'Badges'

<p align="center">
	<img alt="Vercel" src="http://therealsujitk-vercel-badge.vercel.app/?app=HelloSundae">
    <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=97C510&labelColor=5A5A5A">
    <img src="https://img.shields.io/static/v1?label=testing&message=yes&color=94c20d&labelColor=5A5A5A" alt="Testing" />
</p>

<p align="center">
	<img src="https://img.shields.io/static/v1?label=Arthur%20Assuncao&message=2021&color=8A47F5&labelColor=5A5A5A" alt="Arthur Assuncao 2021" />
    <img src="https://img.shields.io/static/v1?label=ReactJS&message=yes&color=61dbfb&labelColor=5A5A5A" alt="ReactJS" />
    <!--<img src="https://img.shields.io/static/v1?label=NextJS&message=yes&color=000000&labelColor=5A5A5A" alt="NextJS" />-->
    <img src="https://img.shields.io/static/v1?label=types&message=typescript&color=0f80c0&labelColor=5A5A5A" alt="Typescript" />
    <!--<img src="https://img.shields.io/static/v1?label=SASS&message=yes&color=cc6699&labelColor=5A5A5A" alt="SASS" />-->
</p>

<p align="center">
	<a href="README.md" alt="README em Português">PT-BR</a>
     |
    <a href="README_EN.md" alt="README in English">EN</a>
</p>

[comment]: # 'Foto do app'
[comment]: # 'Mockup IPhone https://mockuphone.com/device/iphone12black'
[comment]: # 'Mockup IPad https://mockuphone.com/device/ipadsilver'
[comment]: # 'Emoji list https://gist.github.com/rxaviers/7360908'

<table align="center">
    <tr>
        <td align="center"><img src="https://raw.githubusercontent.com/ArthurAssuncao/HelloSundae/main/docs/screenshots/mobile-order.png" alt="Order Screen" width="75%" /></td>
        <td align="center"><img src="https://raw.githubusercontent.com/ArthurAssuncao/HelloSundae/main/docs/screenshots/mobile-order-summary.png"  alt="Order Summary Screen" width="75%" /></td>
        <td align="center"><img src="https://raw.githubusercontent.com/ArthurAssuncao/HelloSundae/main/docs/screenshots/mobile-order-finished.png" alt="Order Finished Screen" width="75%" /></td>
    </tr>
</table>

### :link: Acesse em [https://hellosundae.vercel.app/](https://hellosundae.vercel.app/).

## :bookmark_tabs: Índice

1.  [O que é o projeto?](#abstract)
2.  [Melhorias realizadas no projeto original](#improvements)
3.  [Layout do projeto](#images)
4.  [Tecnologias utilizadas](#stack)
5.  [Como executar o código](#how-to-run)
6.  [Licença](#license)

<div id='abstract'/>

## :computer: O que é Hello Sundae

> O projeto HelloSundae é uma aplicação com front-end e back-end para realizar pedidos de sorvetes. Nasceu com base no projeto Sundae on Demands do curso Testing React with Jest and Testing Library da [Bonnie Schulkin](https://github.com/bonnie). Porém, passou por diversas melhorias e alterações, principalmente na aparência e acréscimo de mais testes, alguns inspirados nos testes realizados na library [Polaris React](https://github.com/Shopify/polaris-react). O nome e as cores foram inspiradas no perfil da [Holly Boothroyd](https://github.com/ObsidianSwan) no Instagram ([@herhelloworld](https://www.instagram.com/herhelloworld/)).

<div id='improvements'/>

## :clap: Melhorias realizadas no projeto original

- :star2: Interface totalmente remodelada com cores bonitas;
- :star2: Criado um Logo para o projeto;
- :star2: Código css responsivo;
- :wrench: Alteração do nome e cores, ambos pensados e criados por mim ([@arthurassuncao](http://github.com/arthurAssuncao));
- :up: Uso de componentização;
- :up: Criados mais testes baseados em artigos e em testes do [Polaris React](https://github.com/Shopify/polaris-react);
- :up: Adição do Typescript;
- :star2: Nova estrutura de diretórios e arquivos;

## My redesign

### :camera: Order screen redesign

<img src="https://raw.githubusercontent.com/ArthurAssuncao/HelloSundae/main/docs/screenshots/order-old-new.png" alt="Order Screen" width="75%" />

### :camera: Order summary screen redesign

<img src="https://raw.githubusercontent.com/ArthurAssuncao/HelloSundae/main/docs/screenshots/order-summary-old-new.png" alt="Order Screen" width="75%" />

### :camera: Order finished screen redesign

<img src="https://raw.githubusercontent.com/ArthurAssuncao/HelloSundae/main/docs/screenshots/order-finished-old-new.png" alt="Order Screen" width="75%" />

<div id='images'/>

## :camera: Layout do projeto

#### :iphone: Tela mobile

<table align="center">
    <tr>
        <td align="center"><img src="https://raw.githubusercontent.com/ArthurAssuncao/HelloSundae/main/docs/screenshots/mobile-order.png" alt="Order Screen" width="75%" /></td>
        <td align="center"><img src="https://raw.githubusercontent.com/ArthurAssuncao/HelloSundae/main/docs/screenshots/mobile-order-summary.png"  alt="Order Summary Screen" width="75%" /></td>
        <td align="center"><img src="https://raw.githubusercontent.com/ArthurAssuncao/HelloSundae/main/docs/screenshots/mobile-order-finished.png" alt="Order Finished Screen" width="75%" /></td>
    </tr>
</table>

<div id='stack'/>

## :sparkles: Tecnologias utilizadas

O Front-end do site é feito utilizando:

- **React Testing Library** e **Jest**: para realizar testes funcionais e utilitários;
- **ReactJS**: diversos pacotes são utilizados;
- **Typescript**: para checagem de tipo;
- **CSS Modules**: para isolar os componentes e ter maior controle;
- **Variáveis CSS** para manter consistência nos valores de propriedades;

<div id='how-to-run'/>

## :runner: Como executar o código

Primeiro baixe as dependências do projeto:

```bash
yarn install # or npm install
```

Para rodar localmente utilize o comando abaixo:

```bash
yarn dev # or npm dev
```

Para executar os testes, utilize o comando:

```bash
yarn test # or npm test
```

Para realizar o build local, utilize o comando:

```bash
yarn build # or npm build
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado.

<div id='license'/>

# :memo: Licença

Esse projeto é um software de código-fonte aberto sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

<hr>

Feito com :muscle: por Arthur Assuncao.
