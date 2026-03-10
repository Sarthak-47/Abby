const { HfInference } = require('@huggingface/inference');

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

exports.detectEmotion = async (text) => {
    try {
        const result = await hf.textClassification({
            model: 'j-hartmann/emotion-english-distilroberta-base',
            inputs: text
        });

        if (result && result.length > 0) {
            const topEmotion = result.sort((a, b) => b.score - a.score)[0].label;

            const emotionMap = {
                'fear': 'anxiety',
                'sadness': 'sadness',
                'anger': 'anger',
                'neutral': 'neutral',
                'disgust': 'overthinking',
                'surprise': 'overthinking',
                'joy': 'neutral'
            };

            return emotionMap[topEmotion] || 'neutral';
        }
        return 'neutral';
    } catch (error) {
        console.error('Emotion detection failed:', error.message);
        return 'neutral';
    }
};

exports.detectCrisis = (text) => {
    const crisisKeywords = ['suicide', 'kill myself', 'end my life', 'want to die', 'harm myself', 'hopeless'];
    const lowerText = text.toLowerCase();

    return crisisKeywords.some(keyword => lowerText.includes(keyword));
};
