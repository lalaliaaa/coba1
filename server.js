import("node-fetch")
  .then((fetch) => {
    const express = require("express");
    const app = express();
    const port = 3000;

    app.use(express.json());

    // Menambahkan penanganan rute untuk /register dengan method POST
    app.post("/register", (req, res) => {
      const { name, email, password } = req.body;
      const user = { name, email, password };
      res.json({ message: "Account created", data: user });
    });

    // Menambahkan penanganan rute untuk /login dengan method POST
    app.post("/login", (req, res) => {
      const { email, password } = req.body;
      const userId = "user-yj5pc_LARC_AgK61";
      const name = "abcde";
      const token = "eyJhbGciOiJIUzI1NiIsInR5cC";
      res.json({
        error: false,
        message: "success",
        loginResult: { userId, name, token },
      });
    });

    const { Storage } = require("@google-cloud/storage");

    // Buat instance klien Google Cloud Storage
    const storage = new Storage();

    // Fungsi untuk mendapatkan data menu dari bucket
    async function getMenuData() {
      const bucketName = "anakosehat-data"; // Ganti dengan nama bucket
      const fileName =
        "https://storage.googleapis.com/anakosehat-data/data-usaha-jasa-makanan-dan-minuman-jenis-usaha-restoran-di-dki-jakarta.csv"; // Ganti dengan nama file menu

      // Mendapatkan URL file dari bucket
      const [url] = await storage
        .bucket(bucketName)
        .file(fileName)
        .getSignedUrl({
          action: "read",
          expires: Date.now() + 60 * 1000, // URL berlaku selama 1 menit
        });

      // Mengambil data menu dari URL file
      fetch(url)
        .then((response) => response.json())
        .then((menuData) => {
          // Melakukan logika lainnya menggunakan data menu

          // Contoh penggunaan: menampilkan menu
          menuData.forEach((menu) =>
            console.log(menu.name, menu.price, menu.nutrition)
          );
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    // Menggunakan async/await untuk mendapatkan data menu dan menjalankan logika lainnya
    async function main() {
      try {
        // Mendapatkan data menu dari bucket
        await getMenuData();
      } catch (error) {
        console.error("Error:", error);
      }
    }

    // Menjalankan server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    // Menjalankan fungsi utama
    main();
  })
  .catch((error) => {
    console.error("Error:", error);
  });
