# Aarti & Vikash Wedding Invitation

A beautiful, modern wedding invitation website created for Aarti Pal & Vikash Pal.

## 🎉 Features

- **Step-by-Step Experience**: 6 full-screen pages with smooth transitions
- **Indian Wedding Theme**: Elegant gold, cream, and maroon colors
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- **Interactive Elements**: Countdown timer, animated decorations, background music
- **Touch Gestures**: Swipe navigation for mobile devices

## 📁 Project Structure

```
WeadingNew/
├── index.html          # Main HTML file
├── style.css           # Styling and animations
├── script.js           # JavaScript functionality
├── wedding.mp3         # Background music file (you need to add this)
└── README.md           # This file
```

## 🚀 Deployment Instructions

### For GitHub Pages:

1. **Upload all files to your GitHub repository**
2. **Make sure wedding.mp3 is uploaded** (this is crucial!)
3. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Scroll down to "GitHub Pages"
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Important - Music File**:
   - The `wedding.mp3` file MUST be uploaded to your repository
   - GitHub has a 100MB file size limit for individual files
   - If your music file is larger, compress it or use a shorter version

### Alternative Music Hosting Options:

If your music file is too large for GitHub, you can:

1. **Use a free audio hosting service** like:
   - SoundCloud
   - Archive.org
   - Your own web server

2. **Update the music source in script.js**:
   ```javascript
   // In the loadMusicFile function, add your URL:
   const possiblePaths = [
       'wedding.mp3',
       'https://your-audio-hosting-url.com/wedding.mp3',  // Add this line
       './wedding.mp3',
       '/wedding.mp3'
   ];
   ```

## 🎵 Music File Guidelines

- **Format**: MP3 recommended for best compatibility
- **Size**: Keep under 100MB for GitHub
- **Duration**: 1-3 minutes is ideal (it will loop)
- **Quality**: 128-192 kbps is sufficient for web playback

## 📱 Mobile Testing

Test your website on:
- **Chrome Mobile**
- **Safari (iOS)**
- **Android Browser**

Note: Most mobile browsers require user interaction before playing audio.

## 🔧 Customization

### Change Wedding Details:
- Edit `index.html` to update names, dates, venues
- Update the countdown date in `script.js` (line ~114)

### Change Colors:
- Edit CSS variables in `style.css`:
  ```css
  :root {
      --gold: #d4af37;      /* Gold color */
      --maroon: #800020;    /* Maroon color */
      --cream: #fef6e4;     /* Cream background */
  }
  ```

## 🐛 Troubleshooting

### Music Not Playing:
1. **Check file is uploaded**: Verify `wedding.mp3` exists in your repository
2. **Check file size**: Must be under 100MB for GitHub
3. **Check browser console**: Look for error messages
4. **Test locally**: Ensure music works before deploying

### Pages Not Displaying Correctly:
1. **Check all files are uploaded**: index.html, style.css, script.js
2. **Clear browser cache**: Hard refresh (Ctrl+F5)
3. **Check console errors**: Open developer tools (F12)

## 🌐 Live Demo

Once deployed, your wedding invitation will be available at:
`https://your-username.github.io/your-repository-name/`

## 💝 Support

Created with ❤️ for Aarti & Vikash's special day!

## 📄 License

This project is open source and available under the MIT License.
