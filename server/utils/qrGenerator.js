import QRCode from 'qrcode';

export const generateQrDataUrl = async (payload) => {
  try {
    const dataString = typeof payload === 'string' ? payload : JSON.stringify(payload);
    const qrDataUrl = await QRCode.toDataURL(dataString, {
      width: 280,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    });
    return qrDataUrl;
  } catch (error) {
    console.error('QR generation error:', error);
    return null;
  }
};

