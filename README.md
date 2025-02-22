# 🎵 **AI-Powered Song Recommender Chatbot**

An AI-powered chatbot that suggests songs based on user input. The backend is built using Python (FastAPI), while the frontend is a sleek React TypeScript application styled with Tailwind CSS. The model dynamically responds to user queries based on customizable prompts.

---

## 🚀 **Features**
- AI-generated song suggestions based on user prompts.
- Dynamic chat interface with user and bot chat bubbles.
- Real-time interaction with an easy-to-use frontend.
- Fully customizable prompt system to tweak chatbot responses.

---

## 🗂️ **Project Structure**
```
├── backend/
│   ├── main.py (FastAPI server code)
│   ├── config.py (Holds API key configuration)
│   └── prompt.txt (Customizable prompt file)
│   └── requirment.txt (Customizable prompt file)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBox.tsx
│   │   │   ├── ChatBubble.tsx
│   │   │   └── SongSuggestions.tsx
│   │   └── App.tsx
│   └── package.json
├── .gitignore
└── README.md
```

---

## ⚡ **Backend Setup (Python FastAPI)**

### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/pshycodr/song-recommender-chatbot.git
cd song-recommender-chatbot/backend
```

### 2️⃣ **Setup Python Environment**
```bash
# Install pyenv if not already installed
python -m venv <your-env-name>

# Start the env
Source <your-env-name>/Script/activate 
```

### 3️⃣ **Install Dependencies**
```bash
pip install -r requirements.txt
```

### 4️⃣ **Configure API Key**
Create a `config.py` file:
```python
API_KEY="your_google_generative_ai_api_key_here"
```
### 3️⃣ **Start the Backend**
```bash
uvicorn app:app --reload
```
- The app will be available at `http://127.0.0.1:8000`.

---

## 📝 **Understanding `prompt.txt`**

### 📄 **Purpose:**
- The `prompt.txt` file holds the **initial context** or **prompt** for the AI model.
- It guides how the chatbot responds to user messages.

### 🛠️ **Tweaking `prompt.txt`:**
- Open `prompt.txt` and modify the text to change the AI's behavior.
- Example prompt content:
  ```
  Only respond with JSON containing music suggestions based on user queries. Respond only to greetings or song-related messages.
  ```
- 🔄 **To get different outputs:**
  - Change genres listed.
  - Specify different artists.
  - Add more detailed instructions for response formatting.

---

## 🌐 **Frontend Setup (React + TypeScript + Tailwind)**

### 1️⃣ **Navigate to Frontend Directory**
```bash
cd ../frontend
```

### 2️⃣ **Install Frontend Dependencies**
```bash
npm install
```

### 3️⃣ **Start the React App**
```bash
npm run dev
```

- The app will be available at `http://localhost:5173` (default Vite port).

---

## 💡 **How It Works**
1. User sends a message in the chat interface.
2. The React frontend sends a POST request to `http://127.0.0.1:8000/chat` with the user message.
3. The Python FastAPI server reads `prompt.txt`, appends the user message, and sends it to the AI model.
4. The AI returns a JSON response with song suggestions.
5. The frontend displays these suggestions dynamically.

---

## 🚫 **.gitignore** Details
```
config.py   # Hides sensitive API key configuration
pyenv       # Ignores local Python virtual environment
```

💡 **Ensure `config.py` is properly configured as per instructions above.**

---

## 🧪 **Testing the App**
- ✅ Try messages like "Suggest me a rock song."
- ✅ Greet the bot with "Hello" or "Hi."
- ⚠️ The bot should respond **only** to song-related queries or greetings (as defined in `prompt.txt`).

---

## 🎨 **Customizations**
- 💬 **Modify `prompt.txt`** to change AI responses.
- 🎵 **Update frontend UI** by tweaking Tailwind classes in `ChatBubble` and `SongSuggestions`.
- ⚡ **Extend backend routes** in FastAPI for additional functionalities.

---

## 🎁 **Contributing**
1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request. 🚀

---

## 🤝 **Acknowledgements**
- Google Generative AI API
- React, TypeScript & Tailwind CSS
- FastAPI (Python)

---

## 🌟 **License**
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

🚀 **Happy Coding & Grooving! 🎧✨**

