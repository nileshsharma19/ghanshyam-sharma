/**
 * Client-side image compression helper.
 * Resizes large camera photos to a max dimension of 1400px and compresses to JPEG ~82%.
 * Reduces 5MB-15MB phone camera photos down to ~150KB-250KB with retina quality.
 */
export async function compressImageFile(
  file: File,
  maxDimension = 1400,
  quality = 0.82
): Promise<string> {
  // If the file is not an image (e.g. video), read directly as data URL
  if (!file.type.startsWith('image/')) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve((e.target?.result as string) || '');
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Compress as JPEG
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };

      img.onerror = () => {
        resolve((e.target?.result as string) || '');
      };

      img.src = (e.target?.result as string) || '';
    };

    reader.onerror = () => {
      resolve('');
    };

    reader.readAsDataURL(file);
  });
}
