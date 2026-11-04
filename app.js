const listings = [
  {
    id: 1,
    title: "MIS 457 Web Uygulama Ekibi",
    category: "Ders Projesi",
    seats: 2,
    due: "21 Ekim",
    description: "Semantik HTML5, CSS Grid ve Git iş akışlarına hakim iki takım arkadaşı arıyoruz."
  },
  {
    id: 2,
    title: "FinTech Hackathon Ekibi",
    category: "Hackathon",
    seats: 1,
    due: "5 Kasım",
    description: "İki arka uç geliştiricimiz var ve 48 saatlik bir etkinlik için bir kullanıcı arayüzü/kullanıcı deneyimi (UI/UX) ve bir ön uç (frontend) uzmanına ihtiyacımız var."
  },
  {
    id: 3,
    title: "PostgreSQL ve Veritabanı Çalışma Grubu",
    category: "Çalışma Grubu",
    seats: 4,
    due: "Haftalık",
    description: "Kütüphanede haftalık olarak düzenlenen akran çalışmalarında SQL sorguları, birleştirmeler ve şema tasarımı konuları ele alınmaktadır."
  },
  {
    id: 4,
    title: "Yapay Zeka Destekli Kampüs Asistanı",
    category: "Proje",
    seats: 3,
    due: "10 Kasım",
    description: "Ders programı ve duyurular için basit bir asistan geliştiriyoruz. Backend ve prompt tasarımı konusunda yardımcı olacak arkadaşlar arıyoruz."
  },
  {
    id: 5,
    title: "JavaScript ve DOM Uygulama Grubu",
    category: "Çalışma Grubu",
    seats: 3,
    due: "Haftalık",
    description: "DOM manipülasyonu, olay yönetimi ve form doğrulama üzerine birlikte küçük uygulamalar yapıyoruz."
  },
  {
    id: 6,
    title: "Sürdürülebilirlik Uygulaması Sunumu",
    category: "Sunum",
    seats: 2,
    due: "15 Kasım",
    description: "Kampüs geri dönüşüm verilerini gösteren bir sunum ve arayüz hazırlıyoruz. Tasarım ve sunum becerisi olan takım arkadaşları aranıyor."
  }
];

function renderListings() {
  const container = document.querySelector("#listings");
  if (!container) return;

  for (const item of listings) {
    const card = document.createElement("article");
    card.className = "card";

    const title = document.createElement("h2");
    title.textContent = item.title;

    const meta = document.createElement("p");
    meta.className = "meta";
    meta.textContent = `${item.category} · ${item.seats} Kontenjan Kaldı · Son Tarih ${item.due}`;

    const desc = document.createElement("p");
    desc.textContent = item.description;

    const link = document.createElement("a");
    link.className = "card-link";
    link.href = "create.html";
    link.textContent = "Başvur / Ekibe Katıl";

    card.append(title, meta, desc, link);
    container.append(card);
  }
}

function setupCreateForm() {
  const form = document.querySelector("#create-form");
  if (!form) return;

  const titleInput = document.querySelector("#title");
  const deadlineInput = document.querySelector("#deadline");
  const message = document.querySelector("#form-message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const today = new Date().toLocaleDateString("en-CA");

    if (title.length < 3) {
      message.className = "error";
      message.textContent = "Please enter a title with at least 3 characters.";
      return;
    }

    if (deadlineInput.value && deadlineInput.value < today) {
      message.className = "error";
      message.textContent = "The deadline cannot be in the past.";
      return;
    }

    message.className = "success";
    message.textContent = "Your listing has been published.";
    form.reset();
  });
}

renderListings();
setupCreateForm();
