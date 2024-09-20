import * as Print from 'expo-print';

export const generatePDF = async () => {
  try {
    const { uri } = await Print.printToFileAsync({
      html: `
        <h1>Sample PDF Document</h1>
        <p>This is a sample PDF generated in React Native using Expo.</p>
      `,
      base64: false,
    });

    return uri; // You can return the PDF file URI
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};


