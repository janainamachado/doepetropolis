$(document).ready(function(){
    loadDonationsList((list) => {
      renderDonationsLocationsButtons("#locations-options", list);
      renderDonationsList("#donations_locations", list);
    });

    $("#city-search").on("keyup", (e) => {
        let cityQuery = e.target.value;
        searchTable(cityQuery)
    })
});

function stringToSlug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return str;
}

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

function loadDonationsList(callback){
  fetch("./lugares-doacoes.json")
    .then(response => response.json())
    .then(data => callback(data))
}

function renderDonationsLocationsButtons(containerElem, list){
  const $containerElem = $(containerElem);
  let html = `
  <div class="container">
    <div class="row py-3">
  `;

  Object.entries(list).forEach(entry => {
    const [sectionTitle, _locations] = entry;

    html += `
    <div class="col">
      <a href="#${stringToSlug(sectionTitle)}" type="button" class="btn btn-block btn-lg btn-info">${sectionTitle}</a>
    </div>`;
  });

  html += `
    </div>
  </div>
    `;

  $containerElem.append(html)
}

function renderDonationsList(containerElem, data){
  const $containerElem = $(containerElem);

  Object.entries(data).forEach(entry => {
    const [sectionTitle, locations] = entry;
    
    let cardHtml = `
      <div class="album pt-5" id="${stringToSlug(sectionTitle)}">
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