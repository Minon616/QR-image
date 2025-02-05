import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      message: "Type in your URL:",
      name: "url"  // Use a valid key name without spaces
    }
  ])
  .then((answers) => {
    const url = answers.url;  // Corrected to match the prompt's 'name'

    // Generate QR code as a PNG file
    const qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('qr_img.png'));

    // Save the URL to a text file
    fs.writeFile('URL.txt', url, (err) => {
      if (err) {
        console.error('Failed to save URL:', err);
      } else {
        console.log('The URL has been saved as URL.txt!');
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error('Prompt could not be rendered in the current environment.');
    } else {
      console.error('Something went wrong:', error);
    }
  });
