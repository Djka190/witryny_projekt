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
            filtrowanie.style.height = (parseInt(window.getComputedStyle(filtrowanie).height) - 400) + "px";
            
            punkt -= 1
            kierunek = "dol";
        }
        else if (kierunek == "gora")
        {
            filtrowanie.style.height = (parseInt(window.getComputedStyle(filtrowanie).height) + 400) + "px";
            
            punkt += 1
        }
        else if (kierunek == "dol")
            {
                filtrowanie.style.height = (parseInt(window.getComputedStyle(filtrowanie).height) - 400) + "px";
                
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
                filtrowanie.style.height = (parseInt(window.getComputedStyle(filtrowanie).height) - 200) + "px";
                punkt -= 1
                kierunek = "dol";
            }
            else if (kierunek == "gora")
            {
                filtrowanie.style.height = (parseInt(window.getComputedStyle(filtrowanie).height) + 200) + "px";
                punkt += 1
            }
            else if (kierunek == "dol")
            {
               filtrowanie.style.height = (parseInt(window.getComputedStyle(filtrowanie).height) - 200) + "px";
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
// tutaj tworzy oferte
function Konstruktor_oferty1(temat, firma, data, lokalizacja, branza, url_zdjecia)
{
    this.temat = temat
    this.firma = firma
    this.data = data
    this.lokalizacja = lokalizacja
    this.branza = branza
    this.url_zdjecia = url_zdjecia
}

const oferta1 = new Konstruktor_oferty1("lol", "ez", "2020-02-01", "Będzin", "IT", "praca3.png")
const oferta2 = new Konstruktor_oferty1("lol2", "ez", "2020-02-01", "Będzin", "IT", "praca3.png")
const oferta3 = new Konstruktor_oferty1("lol3", "ez", "2020-02-01", "Będzin", "IT", "praca3.png")
const oferty = [oferta1, oferta2, oferta3]

document.addEventListener("DOMContentLoaded", function() {
    const dane = Array.from({length: 3}, (_, i) =>
        `Item ${i + 1}`);
    const ilosc_ofert_na_strone = 10;
    let aktualna_strona = 1;

    function pokaz_oferty(strona)
    {
        const lista_ofert = document.getElementById("lista-ofert");
        lista_ofert.innerHTML = "";
        const start = (strona - 1) * ilosc_ofert_na_strone;
        const oferty_na_stronie = dane.slice(start, start + ilosc_ofert_na_strone);

        oferty_na_stronie.forEach((item, index) => {
            
            const oferta = oferty[index]
            
            const li = document.createElement("li");
            const div = document.createElement("div");
            const img = document.createElement("img");
            const div2 = document.createElement("div");
            const h2 = document.createElement("h2");
            const h5 = document.createElement("h5");
            const p_data_i_miejsce = document.createElement("p");
            const p_branza = document.createElement("p");
            
            
            
                p_data_i_miejsce.textContent = `Data dodania oferty: ${oferta.data}      Miejsce pracy: ${oferta.lokalizacja}`;
                p_branza.textContent = `Branża: ${oferta.branza}`
                h5.textContent = oferta.firma;
                h2.textContent = oferta.temat;
                img.src = oferta.url_zdjecia;
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

function Konstruktor_oferty(wyangrodzenie, nazwa, lokalizacja, opis, branza, dojazd, pracodawca, oferta, obowiazki, oczekiwania, kontakt_nazwisko, kontakt_mail, kontakt_numer_tel, zdjecie)
{
    let h1 = document.createElement("h1")
    h1.textContent = `${nazwa} -od ${wyangrodzenie}- ${lokalizacja}`
    let h6 = document.createElement("h6")
    h6.textContent = pracodawca
    let h2_pracodawca = document.createElement("h2")
    h2_pracodawca.textContent = pracodawca
    let p_opis = document.createElement("p")
    p_opis.textContent = opis
    let h2_branza = document.createElement("h2")
    h2_branza.textContent = branza
    let h2_lokalizacja = document.createElement("h2")
    h2_lokalizacja.textContent = lokalizacja
    let h2_dojazd = document.createElement("h2")
    h2_dojazd.textContent = dojazd
    let ul_oferta = document.createElement("ul")
    let oferta_punkty = oferta.split(" ")
    for (let i = 0; i < oferta_punkty.length; i++)
    {
        ul_oferta.appendChild(oferta_punkty[i])
    }
    let wynagrodzenie = document.createElement("li")
    wynagrodzenie.textContent = `Wynagrodzenie ${wyangrodzenie} brutto`
    ul_oferta.appendChild(wyangrodzenie)
    let ul_obowiazki = document.createElement("ul")
    let obowiazki_punkty = obowiazki.split(" ")
    for (let i = 0; i < obowiazki_punkty.length; i++)
    {
        ul_obowiazki.appendChild(obowiazki_punkty[i])
    }
    let ul_oczekiwania = document.createElement("ul")
    let oczekiwania_punkty = oferta.split(" ")
    for (let i = 0; i < oczekiwania_punkty.length; i++)
    {
        ul_oczekiwania.appendChild(oczekiwania_punkty[i])
    }

}

document.body.addEventListener("click", (el) => {
    let kliknieta_oferta = el.target.closest("li")

    console.log(kliknieta_oferta)
})