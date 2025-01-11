// Lista wyzwań z opisami
const challenges = [
    { name: "Brak latarek", description: "Żadna osoba nie może korzystać z latarek, nawet UV." },
    { name: "Minimalne narzędzia", description: "Każdy gracz może wziąć tylko jedno narzędzie." },
    { name: "Bez narzędzi technicznych", description: "Zakaz używania kamer, czujników i EMF." },
    { name: "Tylko Spirit Box", description: "Jedyna dopuszczalna metoda zdobywania dowodów to Spirit Box." },
    { name: "No Pills", description: "Zakaz korzystania z leków na zdrowie psychiczne." },
    { name: "Solo Investigation", description: "Każdy gracz musi prowadzić śledztwo samodzielnie." },
    { name: "Bezbieżni łowcy", description: "Gracze nie mogą uciekać, tylko ukrywać się podczas polowania." },
    { name: "Ciemność", description: "Nikt nie może włączyć światła ani korzystać z oświetlenia." },
    { name: "Random Evidence", description: "Gracze mogą wybrać tylko dowody w losowej kolejności." },
    { name: "Wyjście do vana zakazane", description: "Nikt nie może wrócić do vana po rozpoczęciu misji." }
  ];
  
  // Lista ról z opisami
  const roles = [
    { name: "Śmiałek", description: "Pierwszy wchodzi do każdego pokoju - jeśli ktoś inny wyjdzie pierwszy, wszyscy gracze muszą wrócić do vana i zostać tam przez następne 2 minuty." },
    { name: "Technik", description: "Odpowiada za działanie kamer i czujników - jako jedyny ma możliwość korzystania z Aparatu, Kamery, Mikrofonu Parabolicznego, Kamery Czołowej oraz Czujnika Ruchu." },
    { name: "Medium", description: "Słucha i interpretuje komunikaty duchów - jako jedyny może korzystać z Mikrofonu Parabolicznego oraz Spirit Boxa." },
    { name: "Zapominalski detektyw", description: "Kolejna zapominaja w teamie - zapominasz o kilku przedmiotach podczas dochodzenia (wymóg to chociaż 2 przedmioty podawające dowody na ducha oraz 1 inny)." },
    { name: "Ochroniarz", description: "Pilnuje wejścia i ostrzega przed zagrożeniem - jako jedyny może korzystać z Kadzideł oraz mieć je przy sobie, wszyscy inni gracze Kadzidła mają zbanowane." },
    { name: "Bait", description: "Celowo przyciąga uwagę ducha, aby chronić zespół - jeśli duch rozpocznie Polowanie, nie może chować się w kryjówkach (wszyscy inni gracze mogą)." },
    { name: "Dokumentalista", description: "Nagrywa wydarzenia i fotografuje dowody - jako jedny może korzystać z Kamer oraz Aparatów, tylko osoba z tą rolą może Fotografować oraz patrzeć na Kamery." },
    { name: "Poszukiwacz dowodów", description: "Szuka i dokumentuje dowody na obecność ducha - tylko ta osoba z tą rolą może korzystać z przedmiotów które mogą podawać dowody związane z duchem." },
    { name: "Cichy detektyw", description: "Nie rozmawia przez radio i działa w ciszy -  gracze z tą rolą nie mają prawa korzystać z Voice Chatu oraz z Radia." },
    { name: "Ekspert EMF", description: "Koncentruje się na dowodach związanych z EMF - jako jedyny z graczy może korzystać z EMF (nie może wyrzucać z ekwipunku EMF przez całe dochodzenie)." },
    { name: "Samotnik", description: "Zostaje sam w pomieszczeniach przez długi czas - nie może przebywać z innymi graczami w pokoju ducha." },
    { name: "Egzorcysta", description: "Stara się odpędzać ducha ile może - jako jedyny może rozstawiać Krucyfiksy i korzystać z Soli." },
    { name: "Konspirator", description: "Mimo ogromnej wiedzy jest zwykłym tchórzem, nie wychodzi z vana w trakcie gry - używa tylko narzędzi które są dostępne w vanie (nie może się z niego ruszać)." },
    { name: "Głuchy", description: "Pomimo dobrego wzroku jest głuchy - gracz z tą rolą może w ustawieniach Wideo zwiększyść Jasność do maksymalnej skali, ale w ustawieniach Audio musi wyciszyć całą grę." },
    { name: "Dziadyga", description: "Nażeka na straszny ból pleców - gracz z tą rolą jest zmuszony aby chodzić na kucaka do końca dochodzenia."},
    { name: "Zapominaja", description: "Może i potrafi rozpoznawać duchy to jest bardzo zapominalski - jeśli ta rola została wylosowana, musicie kompletnie usunąć/nie uzywać 3 wybranych przez siebie przedmiotów (Sami dostosujcie sobie poziom trudności)" },
    { name: "", description: " " },
    { name: " ", description: " " },
    { name: " ", description: " " }
  ];
  
  // Funkcja rysująca koło i obsługująca losowanie
  function createWheel(canvasId, items, buttonId, resultId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const numSlices = items.length;
    const sliceAngle = (2 * Math.PI) / numSlices;
    const radius = canvas.width / 2;
    const colors = ["#ff4500", "#ff6347", "#ffa500", "#ffd700", "#ffdd00"];
  
    // Funkcja rysująca koło
    function drawWheel(rotation = 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      items.forEach((item, index) => {
        const startAngle = index * sliceAngle + rotation;
        const endAngle = startAngle + sliceAngle;
  
        // Rysowanie sekcji
        ctx.beginPath();
        ctx.fillStyle = colors[index % colors.length];
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, startAngle, endAngle);
        ctx.fill();
        ctx.stroke();
  
        // Dodanie tekstu
        ctx.save();
        const textAngle = startAngle + sliceAngle / 2;
        ctx.translate(
          radius + Math.cos(textAngle) * (radius * 0.7),
          radius + Math.sin(textAngle) * (radius * 0.7)
        );
        ctx.rotate(textAngle);
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.font = "14px Arial";
        ctx.fillText(item.name, 0, 0);
        ctx.restore();
      });
    }
  
    drawWheel();
  
    // Animacja losowania
    const button = document.getElementById(buttonId);
    const result = document.getElementById(resultId);
    let rotation = 0;
    let isSpinning = false;
  
    button.addEventListener("click", () => {
      if (isSpinning) return;
  
      isSpinning = true;
      const randomSpin = Math.random() * 2000 + 3000; // Losowy czas obrotu
      const finalRotation = randomSpin + rotation;
  
      const spinInterval = setInterval(() => {
        rotation += 10;
        drawWheel(rotation / 180 * Math.PI);
      }, 20);
  
      setTimeout(() => {
        clearInterval(spinInterval);
        isSpinning = false;
  
        // Wyliczenie wylosowanej sekcji
        const selectedIndex = Math.floor(((rotation / 360) % 1) * numSlices);
        const finalIndex = numSlices - 1 - selectedIndex;
  
        // Wyświetlenie wyniku i opisu
        result.innerHTML = `
          <strong>${items[finalIndex].name}</strong>: ${items[finalIndex].description}
        `;
      }, randomSpin);
    });
  }
  
  // Inicjalizacja kół z wyzwaniami i rolami
  createWheel("challengeWheel", challenges, "spinChallengeButton", "challengeResult");
  createWheel("roleWheel", roles, "spinRoleButton", "roleResult");
  