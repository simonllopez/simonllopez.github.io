a = 0;

const calcular = () => {
    a = a + 20;

    document.getElementById(
        "vtotal"
    ).innerHTML = `Voltaje total: <b>${a}</b> V</div>`;

    v = document.getElementById("V").value;
    mAh = document.getElementById("mAh").value;
    s = document.getElementById("s").value;
    p = document.getElementById("p").value;
    gr = document.getElementById("gr").value;
    eur = document.getElementById("eur").value;

    vtotal = v * s;
    n_celdas = s * p;
    cap = mAh * p;
    Pot = (mAh * v) / 1000;
    densidad = Pot / (gr * n_celdas);
    eur_total = eur * n_celdas;

    document.getElementById(
        "vtotal"
    ).innerHTML = `Voltaje total: <b>${vtotal}</b> V</div>`;

    document.getElementById(
        "n_celdas"
    ).innerHTML = `Numero de celdas: <b>${n_celdas}</b> Celdas</div>`;

    document.getElementById(
        "cap"
    ).innerHTML = `Capacidad total: <b>${cap}</b> mAh</div>`;

    document.getElementById("Pot").innerHTML = `Potencia total: <b>${Pot.toFixed(
    2
  )}</b> Wh</div>`;

    document.getElementById("densidad").innerHTML = `Densidad potencia: <b>${(
    densidad * 1000
  ).toFixed(2)}</b> Wh/kg</div>`;

    document.getElementById(
        "eur_total"
    ).innerHTML = `Precio total: <b>${eur_total.toFixed(2)}</b> eur</div>`;
};