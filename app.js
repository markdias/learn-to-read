// Learn to Read App with ElevenLabs Integration

class ReadingApp {
    constructor() {
        this.apiKey = window.ELEVENLABS_API_KEY || '';
        this.voiceId = window.ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL'; // Default kid-friendly voice
        this.baseUrl = 'https://api.elevenlabs.io/v1';
        this.currentAudio = null;
        this.isPlaying = false;
        this.audioCache = new Map();

        // Encouragement messages
        this.encouragements = [
            '🌟 Great job!',
            '⭐ Awesome!',
            '🎉 Well done!',
            '💪 You\'re amazing!',
            '🏆 Excellent!',
            '✨ Keep going!',
            '🎊 Fantastic!',
            '🌈 You\'re so smart!'
        ];

        // Stories
        this.stories = [
            {
                title: 'The Cat',
                sentences: [
                    'I see a cat.',
                    'The cat is big.',
                    'The cat is happy.',
                    'I love the cat!'
                ]
            },
            {
                title: 'My Family',
                sentences: [
                    'I love my mom.',
                    'I love my dad.',
                    'I love my family.',
                    'My family loves me!'
                ]
            },
            {
                title: 'At the Park',
                sentences: [
                    'I go to the park.',
                    'I see a dog.',
                    'I see a tree.',
                    'I play and have fun!'
                ]
            }
        ];

        this.currentStory = 0;

        this.init();
    }

    init() {
        this.checkApiConnection();
        this.setupTabs();
        this.setupAlphabet();
        this.setupWords();
        this.setupStories();
    }

    async checkApiConnection() {
        const statusEl = document.getElementById('apiStatus');

        if (!this.apiKey) {
            statusEl.textContent = '⚠️ Please add your ElevenLabs API key in config.js';
            statusEl.className = 'api-status disconnected';
            return;
        }

        try {
            const response = await fetch(`${this.baseUrl}/voices`, {
                headers: {
                    'xi-api-key': this.apiKey
                }
            });

            if (response.ok) {
                statusEl.textContent = '✅ Voice ready!';
                statusEl.className = 'api-status connected';
            } else {
                statusEl.textContent = '❌ API key error - check config.js';
                statusEl.className = 'api-status disconnected';
            }
        } catch (error) {
            statusEl.textContent = '❌ Connection error';
            statusEl.className = 'api-status disconnected';
        }
    }

    setupTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.dataset.tab;

                // Remove active class from all
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked
                btn.classList.add('active');
                document.getElementById(tabName).classList.add('active');

                // Stop any playing audio
                this.stopAudio();
            });
        });
    }

    setupAlphabet() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const grid = document.getElementById('alphabetGrid');

        alphabet.forEach(letter => {
            const btn = document.createElement('button');
            btn.className = 'letter-btn';
            btn.textContent = letter;
            btn.addEventListener('click', () => this.speakText(letter, btn));
            grid.appendChild(btn);
        });
    }

    setupWords() {
        const wordCategories = {
            animalWords: [
                { text: 'cat', emoji: '🐱' },
                { text: 'dog', emoji: '🐶' },
                { text: 'bird', emoji: '🐦' },
                { text: 'fish', emoji: '🐟' },
                { text: 'bear', emoji: '🐻' },
                { text: 'cow', emoji: '🐮' }
            ],
            colorWords: [
                { text: 'red', emoji: '🔴' },
                { text: 'blue', emoji: '🔵' },
                { text: 'green', emoji: '🟢' },
                { text: 'yellow', emoji: '🟡' },
                { text: 'pink', emoji: '🩷' },
                { text: 'purple', emoji: '🟣' }
            ],
            familyWords: [
                { text: 'mom', emoji: '👩' },
                { text: 'dad', emoji: '👨' },
                { text: 'baby', emoji: '👶' },
                { text: 'sister', emoji: '👧' },
                { text: 'brother', emoji: '👦' },
                { text: 'family', emoji: '👨‍👩‍👧‍👦' }
            ],
            simpleWords: [
                { text: 'love', emoji: '❤️' },
                { text: 'happy', emoji: '😊' },
                { text: 'sun', emoji: '☀️' },
                { text: 'star', emoji: '⭐' },
                { text: 'book', emoji: '📚' },
                { text: 'play', emoji: '🎮' }
            ]
        };

        Object.entries(wordCategories).forEach(([categoryId, words]) => {
            const container = document.getElementById(categoryId);

            words.forEach(word => {
                const btn = document.createElement('button');
                btn.className = 'word-btn';
                btn.innerHTML = `
                    <span class="word-emoji">${word.emoji}</span>
                    <span>${word.text}</span>
                `;
                btn.addEventListener('click', () => this.speakText(word.text, btn));
                container.appendChild(btn);
            });
        });
    }

    setupStories() {
        const storyBtns = document.querySelectorAll('.story-btn');
        const playBtn = document.getElementById('playStory');
        const pauseBtn = document.getElementById('pauseStory');

        // Load first story by default
        this.loadStory(0);

        storyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const storyIndex = parseInt(btn.dataset.story);

                storyBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                this.stopAudio();
                this.loadStory(storyIndex);
            });
        });

        playBtn.addEventListener('click', () => this.playStory());
        pauseBtn.addEventListener('click', () => this.stopAudio());
    }

    loadStory(index) {
        this.currentStory = index;
        const story = this.stories[index];
        const storyText = document.getElementById('storyText');

        storyText.innerHTML = '';
        story.sentences.forEach((sentence, i) => {
            const sentenceEl = document.createElement('div');
            sentenceEl.className = 'sentence';
            sentenceEl.textContent = sentence;
            sentenceEl.addEventListener('click', () => this.speakText(sentence, sentenceEl));
            storyText.appendChild(sentenceEl);
        });
    }

    async playStory() {
        const story = this.stories[this.currentStory];
        const sentences = document.querySelectorAll('.sentence');

        this.stopAudio();

        for (let i = 0; i < sentences.length; i++) {
            sentences[i].classList.add('highlight');

            await this.speakText(story.sentences[i], sentences[i], false);

            // Wait for audio to finish
            if (this.currentAudio) {
                await new Promise(resolve => {
                    this.currentAudio.onended = resolve;
                });
            }

            sentences[i].classList.remove('highlight');

            // Small pause between sentences
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        this.showEncouragement();
    }

    async speakText(text, element, showEncouragement = true) {
        if (!this.apiKey) {
            alert('Please add your ElevenLabs API key in config.js to hear the sounds!');
            return;
        }

        this.stopAudio();
        this.showLoading(true);

        // Add visual feedback
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = '';
        }, 300);

        try {
            let audioBlob;

            // Check cache first
            if (this.audioCache.has(text.toLowerCase())) {
                audioBlob = this.audioCache.get(text.toLowerCase());
            } else {
                // Fetch from ElevenLabs
                const response = await fetch(
                    `${this.baseUrl}/text-to-speech/${this.voiceId}`,
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'audio/mpeg',
                            'Content-Type': 'application/json',
                            'xi-api-key': this.apiKey
                        },
                        body: JSON.stringify({
                            text: text,
                            model_id: 'eleven_monolingual_v1',
                            voice_settings: {
                                stability: 0.5,
                                similarity_boost: 0.75
                            }
                        })
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to generate speech');
                }

                audioBlob = await response.blob();

                // Cache the audio
                this.audioCache.set(text.toLowerCase(), audioBlob);
            }

            // Play audio
            const audioUrl = URL.createObjectURL(audioBlob);
            this.currentAudio = new Audio(audioUrl);

            this.currentAudio.onended = () => {
                URL.revokeObjectURL(audioUrl);
                this.isPlaying = false;
            };

            await this.currentAudio.play();
            this.isPlaying = true;

            if (showEncouragement) {
                this.showEncouragement();
            }

        } catch (error) {
            console.error('Error playing audio:', error);
            alert('Error playing sound. Please check your API key and internet connection.');
        } finally {
            this.showLoading(false);
        }
    }

    stopAudio() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
            this.isPlaying = false;
        }

        // Remove highlights
        document.querySelectorAll('.sentence.highlight').forEach(el => {
            el.classList.remove('highlight');
        });
    }

    showLoading(show) {
        const loading = document.getElementById('loading');
        loading.classList.toggle('show', show);
    }

    showEncouragement() {
        const encouragement = document.getElementById('encouragement');
        const message = this.encouragements[Math.floor(Math.random() * this.encouragements.length)];

        encouragement.textContent = message;
        encouragement.classList.add('show');

        setTimeout(() => {
            encouragement.classList.remove('show');
        }, 2000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ReadingApp();
});
