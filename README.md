# Doe Petrópolis

Este é um projeto independente com o intuito de unificar as informações para as doações e diferentes formas de ajuda às vítimas de Petrópolis.

### Como colaborar

**Adicionar um novo card**

Para adicionar um card novo, basta alterar o arquivo `lugares-doacoes.json` adicionando o objeto abaixo em uma das seções:

```json
{
    "nome": "",
    "descricao_geral": "",
    "pix": {
        "cnpj": "",
        "email": "",
        "cel": "",
        "outro": ""
    },
    "site_url": "",
    "imagem_url": "",
    "itens_pedidos": [
        ""
    ],
    "pontos_doacao": [
        {
            "endereco": "",
            "observacao": ""
        }
    ]
}
```

Por exemplo, se quiser adicionar um card novo na seção "Em Petrópolis", o resultado ficará algo como:

```json
{
    "Em Petrópolis": [
        {
            "nome": "Ministério Encontro de Vida",
            "descricao_geral": "Descricao",
            "pix": {
                "cnpj": "",
                "email": "",
                "cel": "",
                "outro": ""
            },
            "site_url": "https://www.instagram.com/mevlive",
            "imagem_url": "https://i.ibb.co/M7JMdCD/Screenshot-2022-02-17-at-13-50-30.png",
            "itens_pedidos": [
                "Alimentos não perecíveis",
                "Água potável",
                "Itens de higiene pessoal",
                "Roupas"
            ],
            "pontos_doacao": [
                {
                    "endereco": "Rua Dr Sá Earp, 315, Centro",
                    "observacao": "ao lado do CTO, 9h às 18h"
                }
            ]
        }
    ]
}
```

Algumas seções como "Em Petrópolis" ou "Em Niterói" já existem, basta adicionar um novo objeto. Se você quiser adicionar uma nova seção, basta incluí-la no objeto principal do json com uma nova _key_ com o nome da seção. Basta seguir o padrão das outras seções.

**Mudança de código**

Alterações de funcionalidade ou layout são bem vindas. Fique a vontade para criar um novo Pull Request descrevendo suas modificações e um screenshot caso a alteração seja visual.