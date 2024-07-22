export const cleanUrl = (str) => {
    return str
      .replace(/[^\w\s-]/g, '') // Hapus karakter khusus kecuali spasi dan tanda hubung
      .trim() // Hapus spasi di awal dan akhir
      .replace(/\s+/g, '-') // Ganti spasi dengan tanda hubung
      .replace(/-+/g, '-') // Ganti beberapa tanda hubung berurutan dengan satu tanda hubung
      .toLowerCase(); // Ubah ke huruf kecil
  };