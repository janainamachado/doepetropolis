$(document).ready(function(){
    loadDonationsList("#donations_locations");

    $("#city-search").on("keyup", (e) => {
        let cityQuery = e.target.value;
        searchTable(cityQuery)
    })

});

function searchTable(filter) {
  let table, tr; 
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      let txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function loadDonationsList(containerElem){
  fetch("./lugares-doacoes.json")
    .then(response => response.json())
    .then(data => renderDonationsList(containerElem, data))
}

function renderDonationsList(containerElem, data){
  const $containerElem = $(containerElem);

  Object.entries(data).forEach(entry => {
    const [sectionTitle, locations] = entry;
    
    let cardHtml = `
      <div class="album pt-5 bg-light">
          <div class="container">
            <h3>${sectionTitle}</h3>
            <div class="row">
    `

    locations.forEach((location) => {
      cardHtml += `
      <div class="col-md-3">
        <div class="card mb-4 box-shadow">
          <img class="card-img-top" src="${location.imagem_url}" alt="${location.nome}">
          <div class="card-body">
            <h5 class="card-title">${location.nome}</h5>
            <div class="card-text">
      `;

      if(location.descricao_geral && location.descricao_geral.length){
        cardHtml += `
          <p>
            ${location.descricao_geral}
          </p>
        `
      }

      if(location.itens_pedidos && location.itens_pedidos.length){
        cardHtml += `
        <p>
          Precisa-se de:
          <ul>
        `;

        location.itens_pedidos.forEach((item) => {
          cardHtml += `<li>${item}</li>`;
        })

        cardHtml += `</ul></p>`;
      }

      if(location.pontos_doacao && location.pontos_doacao.length){
        location.pontos_doacao.forEach((point) => {
          cardHtml += `
            <p>
              📍 Ponto de coleta:<br />
              ${point.endereco}`;

          if(point.observacao && point.observacao.length) {
            cardHtml += `<br /><small>(${point.observacao})</small>`
          }

          cardHtml += `</p>`;
        });
      }

      if(location.pix){
        cardHtml += `<p>`;

        if(location.pix.cnpj && location.pix.cnpj.length) {
          cardHtml += `<div>💳 PIX (CNPJ): ${location.pix.cnpj}</div>`
        }
        if(location.pix.cel && location.pix.cel.length) {
          cardHtml += `<div>💳 PIX (CEL): ${location.pix.cel}</div>`
        }
        if(location.pix.email && location.pix.email.length) {
          cardHtml += `<div>💳 PIX (EMAIL): ${location.pix.email}</div>`
        }
        if(location.pix.outro && location.pix.outro.length) {
          cardHtml += `<div>💳 PIX: ${location.pix.outro}</div>`
        }

        cardHtml += `</p>`;
      }

      cardHtml += `
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <a class="btn btn-sm btn-outline-secondary" target="_blank" href="${location.site_url}" role="button">Ir para o site</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    })

    cardHtml += `
          </div>
        </div>
      </div>
    `
    $containerElem.append(cardHtml)
  });
}