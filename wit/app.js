let hamburgerButton = document.querySelector('.hamburger-przycisk');
let menuMobilne = document.querySelector('.mobilne-menu');
let filtrowanie = document.querySelector(".filtruj");
let obszarZawodowySelect = document.querySelector('#obszarZawodowySelect');
let obszarZawodowyGroup = document.querySelector('.obszar-zawodowy-group');
let wojewodzctwoSelect = document.querySelector('#wojewodztwoSelect');
let wojewodztwoGroup = document.querySelector('.wojewodztwo-group');
let wybranyObszarZawodowy = document.querySelector('.wybrany-obszar');
let wybraneWojewodztwo = document.querySelector('.wybrane-wojewodztwo');

function pokazMenu(){
    menuMobilne.classList.toggle('menu-pokaz')
};

let punkt = 0;
let kierunek = "gora";

document.body.addEventListener("click", (ev) =>{
    const czy_klikniento_naglowek = !!ev.target.closest(".filtrowanie-naglowek");
    const czy_klikniento_naglowek_drugi = !!ev.target.closest(".filtrowanie-naglowek-drugi");
    
    const rozszerzana_sekcja = ev.target.closest(".filtrowanie");
    const rozszerzana_sekcja_druga = ev.target.closest(".filtrowanie-drugie");

    if(!czy_klikniento_naglowek && !czy_klikniento_naglowek_drugi)
    {
        return;
    }
    else if (czy_klikniento_naglowek && rozszerzana_sekcja)
    {
        
        rozszerzana_sekcja.classList.toggle("filtrowanie--otworzone");
        if (punkt == 2)
        {
            filtrowanie.style.height = (parseInt(window.getComputedStyle(filtrowanie).height) - 100) + "px";
            punkt -= 1
            kierunek = "dol";
        }
        else if (kierunek == "gora")
        {
            filtrowanie.style.height = (parseInt(window.getComputedStyle(filtrowanie).height) + 100) + "px";
            punkt += 1
        }
        else if (kierunek == "dol")
            {
                filtrowanie.style.height = (parseInt(window.getComputedStyle(filtrowanie).height) - 100) + "px";
                punkt -= 1
            }
        if (punkt == 0)
        {
            kierunek = "gora";
        }
    }
    else if (czy_klikniento_naglowek_drugi && rozszerzana_sekcja_druga)
    {
        rozszerzana_sekcja_druga.classList.toggle("filtrowanie--otworzone-drugie");
        if (punkt == 2)
            {
                filtrowanie.style.height = (parseInt(window.getComputedStyle(filtrowanie).height) - 100) + "px";
                punkt -= 1
                kierunek = "dol";
            }
            else if (kierunek == "gora")
            {
                filtrowanie.style.height = (parseInt(window.getComputedStyle(filtrowanie).height) + 100) + "px";
                punkt += 1
            }
            else if (kierunek == "dol")
            {
               filtrowanie.style.height = (parseInt(window.getComputedStyle(filtrowanie).height) - 100) + "px";
                punkt -= 1
            }
            if (punkt == 0)
            {
                kierunek = "gora";
            }
    }
    

    console.log(rozszerzana_sekcja_druga, punkt, kierunek);
});

console.log(filtrowanie);

document.addEventListener("DOMContentLoaded", function() {
    const dane = Array.from({length: 419}, (_, i) =>
        `Item ${i + 1}`);
    const ilosc_ofert_na_strone = 10;
    let aktualna_strona = 1;

    function pokaz_oferty(strona)
    {
        const lista_ofert = document.getElementById("lista-ofert");
        lista_ofert.innerHTML = "";
        const start = (strona - 1) * ilosc_ofert_na_strone;
        const oferty_na_stronie = dane.slice(start, start + ilosc_ofert_na_strone);

        oferty_na_stronie.forEach(item => {
            const li = document.createElement("li");
            const div = document.createElement("div");
            const img = document.createElement("img");
            const div2 = document.createElement("div");
            const h2 = document.createElement("h2");
            const h5 = document.createElement("h5");
            const p_data_i_miejsce = document.createElement("p");
            const p_branza = document.createElement("p");
            p_data_i_miejsce.textContent = "Data dodania oferty:       Miejsce pracy: ";
            p_branza.textContent = "Branża: "
            h5.textContent = "Firma";
            h2.textContent = "Tutaj oferta, głowny jej temat";
            div2.classList.add("opis-oferty");
            div2.appendChild(h2);
            div2.appendChild(h5);
            div2.appendChild(p_data_i_miejsce);
            div2.appendChild(p_branza);
            div.classList.add("zdjecie-oferty");
            div.appendChild(img);
            li.appendChild(div);
            li.appendChild(div2);
            lista_ofert.appendChild(li);
        });
    }

    function ustaw_paginacje() {
        const paginacja = document.getElementById("paginacja-pasek");
        paginacja.innerHTML = "";
        const ilosc_stron = Math.ceil(dane.length / ilosc_ofert_na_strone);
        const trzy_kropki = document.createElement("li");
        trzy_kropki.textContent = "...";
        const ostatnia_strona = document.createElement("li");
        ostatnia_strona.textContent = ilosc_stron;

        
                    const pierwsza_strona = document.createElement("li");
                    pierwsza_strona.textContent = 1;
                    pierwsza_strona.classList.toggle("aktywny", 1 === aktualna_strona);
                    pierwsza_strona.onclick = () => {
                        aktualna_strona = 1;
                        pokaz_oferty(aktualna_strona);
                        ustaw_paginacje();
                    };
                    paginacja.appendChild(pierwsza_strona);
                    
                    if (aktualna_strona > 4)
                    {
                        paginacja.appendChild(trzy_kropki);
                    }

                    for(let i = aktualna_strona - 2; i <= aktualna_strona + 1; i++)
                        {
                            if (i < 1 || i > ilosc_stron)
                            {
                                const pusty_div = document.createElement("div");
                                pusty_div.classList.add("pusty-div");
                                paginacja.appendChild(pusty_div);
                            }
                            
                            else
                            {
                                const li = document.createElement("li");
                            li.textContent = i;
                            li.classList.toggle("aktywny", i === aktualna_strona);
                            li.onclick = () => {
                                aktualna_strona = i;
                                pokaz_oferty(aktualna_strona);
                                ustaw_paginacje();
                            };
                            paginacja.appendChild(li);
                            }
                            
                            if (i < 4)
                            {
                                pierwsza_strona.style.display = "none";
                            }
                            else if (i == 5)
                            {
                                pierwsza_strona.style.display = "flex";
                            }
                        }
                        const trzy_kropki2 = document.createElement("li");
                                trzy_kropki2.textContent = "...";
                        if (aktualna_strona >= 1)
                            {
                                
                                paginacja.appendChild(trzy_kropki2);
                            }

                            
                            
                            ostatnia_strona.onclick = () => {
                                aktualna_strona = ilosc_stron;
                                pokaz_oferty(aktualna_strona);
                                ustaw_paginacje();
                            };
                            paginacja.appendChild(ostatnia_strona);

                        if (aktualna_strona > 40)
                        {
                            trzy_kropki2.style.display = "none";
                            ostatnia_strona.style.display = "none";
                        }
                }

                
        
        
    

    pokaz_oferty(aktualna_strona);
    ustaw_paginacje();

    document.body.addEventListener("click", (el) =>{
        const lewa_strzalka = !!el.target.closest(".strzalka_lewo");
        const prawa_strzalka = !!el.target.closest(".strzalka_prawo");
    
        if (lewa_strzalka && aktualna_strona > 1)
        {
            aktualna_strona -= 1;
            pokaz_oferty(aktualna_strona);
            ustaw_paginacje();
        }

        else if (prawa_strzalka && aktualna_strona < Math.ceil(dane.length / ilosc_ofert_na_strone))
        {
            aktualna_strona += 1;
            pokaz_oferty(aktualna_strona);
            ustaw_paginacje();
        }

    });
});

function pokazMenu(){
    console.log('worken')
    console.log(menuMobilne)
    menuMobilne.classList.toggle('menu-pokaz')
};

obszarZawodowySelect.addEventListener('click',function(){
    obszarZawodowyGroup.classList.toggle("obszar-pokaz")
    if(wojewodztwoGroup.classList.contains("obszar-pokaz")){
        wojewodztwoGroup.classList.remove("obszar-pokaz")
    }
})
obszarZawodowyGroup.addEventListener('click',function(e){
    let wybranyObszar = e.target.textContent;
    wybranyObszarZawodowy.textContent = wybranyObszar
})

wojewodzctwoSelect.addEventListener('click',function(){
    wojewodztwoGroup.classList.toggle("obszar-pokaz")
    if(obszarZawodowyGroup.classList.contains("obszar-pokaz")){
        obszarZawodowyGroup.classList.remove("obszar-pokaz")
    }
})
wojewodztwoGroup.addEventListener('click',function(e){
    let wybraneWoj = e.target.textContent;
    wybraneWojewodztwo.textContent = wybraneWoj
})
