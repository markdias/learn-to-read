# Learn to Read! 📚

An interactive reading app for young children (ages 4-6) learning letters and starting to read. Features voice pronunciation powered by ElevenLabs API.

![Learn to Read App](https://img.shields.io/badge/Age-4--6%20years-brightgreen) ![Status](https://img.shields.io/badge/Status-Ready-success)

## Features

### 🔤 Letters Section
- Interactive alphabet with all 26 letters
- Click any letter to hear it pronounced
- Colorful, large buttons perfect for little fingers
- Visual feedback with animations

### 📝 Words Section
- **Animals**: cat, dog, bird, fish, bear, cow
- **Colors**: red, blue, green, yellow, pink, purple
- **Family**: mom, dad, baby, sister, brother, family
- **Simple Words**: love, happy, sun, star, book, play
- Each word has an emoji and voice pronunciation

### 📖 Stories Section
- Three simple stories with short sentences
- Click individual sentences to hear them
- Auto-play entire story with highlighting
- Stories include:
  - "The Cat" - Simple sentences about a cat
  - "My Family" - Expressing love for family
  - "At the Park" - A fun day at the park

### ✨ Educational Features
- Positive encouragement messages after each interaction
- Visual feedback and animations to keep children engaged
- Audio caching for faster repeated playback
- Kid-friendly design with large, colorful buttons
- Safe, ad-free interface

## Setup Instructions

### 1. Get Your ElevenLabs API Key

1. Go to [ElevenLabs.io](https://elevenlabs.io/)
2. Sign up for a free account
3. Navigate to your profile settings
4. Copy your API key

**Free tier includes**: 10,000 characters per month (plenty for learning!)

### 2. Configure the App

**Option 1: Create Local Config (Recommended)**

```bash
# Copy the template file
cp config.local.js.template config.local.js

# Edit config.local.js and add your API key
# Replace 'YOUR_API_KEY_HERE' with your actual API key
```

**Option 2: Edit config.js Directly**

Open `config.js` and replace the empty string with your API key:

```javascript
window.ELEVENLABS_API_KEY = 'your_api_key_here';
```

⚠️ **Note**: If you edit `config.js` directly, be careful not to commit your API key to git!

### 3. Run the App

Simply open `index.html` in a web browser:

**Option 1: Double-click**
- Double-click `index.html` in your file explorer

**Option 2: Using a local server (recommended for best results)**

```bash
# If you have Python installed:
python -m http.server 8000

# Or with Python 3:
python3 -m http.server 8000

# Then open: http://localhost:8000
```

**Option 3: Using VS Code**
- Install the "Live Server" extension
- Right-click `index.html` and select "Open with Live Server"

### 4. Start Learning!

The app will show a green "Voice ready!" indicator when connected to ElevenLabs.

## Customizing the Voice

ElevenLabs offers many voices. To change the voice:

1. Browse voices at [ElevenLabs Voice Library](https://elevenlabs.io/voice-library)
2. Or list available voices using your API key:
   ```bash
   curl https://api.elevenlabs.io/v1/voices \
     -H "xi-api-key: YOUR_API_KEY"
   ```
3. Update `ELEVENLABS_VOICE_ID` in your config file

**Recommended voices for children**:
- `EXAVITQu4vr4xnSDxMaL` - Sarah (default, clear and friendly)
- `21m00Tcm4TlvDq8ikWAM` - Rachel (warm and gentle)

## Browser Compatibility

Works best in modern browsers:
- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari

**Note**: Requires internet connection for voice synthesis.

## Privacy & Safety

- No data collection
- No advertisements
- No external tracking
- Audio is generated in real-time and cached locally
- API calls only go to ElevenLabs for voice synthesis

## Troubleshooting

### "Please add your ElevenLabs API key" message
- Make sure you've created `config.local.js` with your API key
- Or added your API key to `config.js`
- Refresh the page after adding the key

### "API key error" message
- Verify your API key is correct
- Check that you haven't exceeded your free tier limit
- Ensure your API key has the correct permissions

### No sound playing
- Check your device volume
- Ensure the browser has permission to play audio
- Try clicking a letter or word twice

### Slow performance
- The first time you click a letter/word, it fetches from the API
- Subsequent clicks use cached audio and are instant
- Use a local server instead of opening the file directly

## Tips for Parents

1. **Start with Letters**: Begin in the Letters section to build recognition
2. **Repeat Often**: Encourage your child to click the same letters/words multiple times
3. **Use the Stories**: The story section helps with reading comprehension
4. **Practice Together**: Sit with your child and read along
5. **Celebrate Progress**: The app shows encouragement messages - add your own praise too!

## Adding More Content

Want to add more words or stories? Edit `app.js`:

**Add Words**:
```javascript
// Find the wordCategories object (around line 93)
// Add new words to existing categories or create new ones
```

**Add Stories**:
```javascript
// Find the this.stories array (around line 42)
// Add new story objects with sentences
```

## Technical Details

- **Frontend**: Vanilla JavaScript (no framework required)
- **Styling**: CSS3 with animations
- **Voice**: ElevenLabs Text-to-Speech API
- **Storage**: Local audio caching using Map
- **No build step**: Just open and run!

## Support

For issues or questions:
- Check the troubleshooting section above
- Review ElevenLabs [API documentation](https://docs.elevenlabs.io/)
- Ensure your API key is valid and has quota remaining

## License

This is a personal learning tool. Feel free to modify and customize for your child's needs!

---

Made with ❤️ for young readers learning their letters and first words!
