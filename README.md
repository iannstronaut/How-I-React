# 🎴 How I React

**How I React** adalah game kartu sederhana yang dibangun menggunakan **React (Vite)** dan **WebSocket** untuk pengalaman bermain real-time multiplayer.

> ⚠️ Proyek ini masih dalam tahap *development*. Fitur yang tersedia saat ini masih sangat dasar.

---

## 🚧 Status Pengembangan

✅ Fitur yang sudah tersedia:
- Player akan diberi **ID unik** secara otomatis saat masuk.
- Player dapat membuat (**host**) game baru.
- Player dapat bergabung (**join**) ke game yang sudah ada menggunakan ID room.

🛠️ Fitur yang sedang dikembangkan:
- **Game Room System** – player yang sudah join akan berada dalam satu ruangan untuk memulai permainan.
- Mekanisme permainan kartu.

📌 Rencana pengembangan selanjutnya:
- Logika permainan kartu (drawing, playing, scoring).
- UI/UX yang lebih interaktif.
- Sinkronisasi state antar pemain.
- Fitur chat antar pemain.
- Animasi dan suara.

---

## ⚙️ Teknologi yang Digunakan

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Realtime Communication**: WebSocket (menggunakan `socket.io`)

---

## 🖥️ Menjalankan Proyek Secara Lokal

1. **Clone repository ini**
   ```bash
   git clone https://github.com/iannstronaut/How-I-React.git
   cd how-i-react
