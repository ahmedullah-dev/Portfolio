// ==================== AHMED_OS CHATBOT ====================
// Command-based AI Assistant (No API required)

let conversationHistory = [];

// Knowledge base - responses for different topics
const knowledgeBase = {
  greetings: {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'namaste', 'what\'s up'],
    responses: [
      'Welcome to AHMED_OS. How can I assist you today?',
      'Greetings, visitor. Ready to explore Ahmed\'s capabilities?',
      'Hello there. Ask me anything about Ahmed\'s work and expertise.',
      'Hey! I\'m AHMED_OS. What would you like to know?'
    ]
  },
  whoami: {
    keywords: ['who are you', 'who is ahmed', 'tell me about', 'about you', 'what do you do'],
    responses: [
      'I am AHMED_OS, representing Ahmed Ullah — an AI-Native Frontend Developer, Prompt Engineer, and Digital Architect based in Hyderabad, India. Graduating May 2025 with B.E. in IT (CGPA: 8.50). I specialize in creating immersive, intelligent frontend experiences.',
      'Ahmed Ullah is an AI-native developer with expertise in prompt engineering, frontend architecture, and 3D graphics. He\'s passionate about blending AI capabilities with creative design.',
      'I represent Ahmed Ullah, a tech innovator focused on AI workflows, prompt engineering, and cutting-edge frontend development. Currently pursuing B.E. IT at Lords Institute of Engineering & Technology.'
    ]
  },
  skills: {
    keywords: ['skills', 'expertise', 'technologies', 'what can', 'proficient', 'know how'],
    responses: [
      'Ahmed\'s Technical Stack: HTML5, CSS3, JavaScript, Python | Frameworks: React, Tailwind CSS, Django | Tools: Git, GitHub, MongoDB, REST APIs, Netlify | Specialties: Prompt Engineering, AI Workflows, 3D Graphics (Three.js), Cybersecurity, Frontend Architecture.',
      'Core Skills: Frontend (HTML5, CSS3, JS), Backend (Python, Django), AI Integration, Prompt Engineering, 3D Graphics with Three.js, Git/GitHub, Database Management, Web Security. Proficient in creating responsive, immersive digital experiences.',
      'JavaScript, Python, React, Tailwind CSS, Three.js for 3D, GSAP for animations, MongoDB for databases, REST APIs. Plus deep expertise in Prompt Engineering and AI workflow design. Always learning, always evolving.'
    ]
  },
  projects: {
    keywords: ['projects', 'portfolio', 'work', 'deployments', 'built', 'mission'],
    responses: [
      '01. Personal Portfolio (Live) - ahmedullah-dev.netlify.app | Tech: HTML5, CSS3, JavaScript, GSAP, Three.js, Tailwind CSS\n02. STUDIQ (Live) - studiq-kb4q.onrender.com | Tech: Node.js, Express.js, OpenRouter API, AI/ML\n03. Creamery Dairy System - Python, Django, Database Management\n04. AI & Cybersecurity Research - Analyzing AI impact on smart cities',
      'Ahmed has deployed multiple projects: a futuristic portfolio with 3D animations, an AI-powered learning platform STUDIQ with intelligent quiz generation, a dairy management system using Django, and conducted AI/Cybersecurity research. Each project showcases different technical expertise.',
      'Projects include: immersive portfolio site (Three.js + GSAP), STUDIQ - an AI learning platform with performance prediction and viva practice, Django-based dairy operations system, and AI security research. All demonstrate expertise in full-stack development and innovative problem-solving.'
    ]
  },
  portfolio: {
    keywords: ['portfolio', 'ahmedullah-dev', 'live website'],
    responses: [
      'Ahmed\'s Personal Portfolio is live at ahmedullah-dev.netlify.app. Built with HTML5, CSS3, JavaScript, GSAP animations, Three.js for 3D particle effects, and Tailwind CSS. Features a cyberpunk aesthetic with immersive design and smooth interactions.',
      'The portfolio showcases a futuristic, immersive design with 3D graphics, smooth scrolling, and interactive components. It\'s fully responsive and optimized for all devices. Check it out: ahmedullah-dev.netlify.app',
      'Visit ahmedullah-dev.netlify.app to see Ahmed\'s portfolio — featuring 3D particle effects, smooth animations, cyberpunk design, and detailed project showcases. Built with cutting-edge frontend technologies.'
    ]
  },
  quiz: {
    keywords: ['quiz', 'quiz app', 'interactive'],
    responses: [
      'The Quiz App (quiz-app-ahmedullah.netlify.app) is a dynamic quiz interface built with vanilla JavaScript. Features real-time scoring, interactive UI, and 100% client-side functionality. No backend needed — pure frontend excellence.',
      'Ahmed\'s Quiz Application demonstrates DOM manipulation mastery. Built entirely with HTML5, CSS3, and JavaScript, it provides an engaging quiz experience with instant feedback and score tracking.',
      'Check out the Quiz App at quiz-app-ahmedullah.netlify.app — showcasing Ahmed\'s ability to create interactive, responsive interfaces with vanilla JavaScript and clean, intuitive UX design.'
    ]
  },
  experience: {
    keywords: ['experience', 'internship', 'huntmetrics', 'ethical hacking', 'security', 'web security'],
    responses: [
      'Ahmed completed an Ethical Hacking Internship at HUNTMETRICS (Aug-Sep 2023). Gained hands-on experience in web security testing, vulnerability analysis, Open Redirection attacks, SSRF filter bypass techniques, and responsible disclosure practices.',
      'At HUNTMETRICS, Ahmed explored web vulnerabilities including Open Redirection and SSRF (Server-Side Request Forgery). Learned security testing methodologies and contributed to identifying and mitigating security issues. Strong foundation in cybersecurity.',
      'Security Background: Ahmed interned at HUNTMETRICS focusing on ethical hacking and vulnerability research. Specializes in identifying web security flaws and understanding attack vectors — combining security knowledge with frontend expertise.'
    ]
  },
  contact: {
    keywords: ['contact', 'email', 'phone', 'linkedin', 'github', 'reach', 'connect'],
    responses: [
      'Connect with Ahmed: Email: ahmedullah8341@gmail.com | Phone: +91 8688935411 | LinkedIn: linkedin.com/in/ahmedullah-dev | GitHub: github.com/ahmedullah-dev',
      'Ahmed\'s Contact Info: ahmedullah8341@gmail.com | +91 8688935411 | Find him on LinkedIn (ahmedullah-dev) and GitHub (ahmedullah-dev) for code and professional details.',
      'Reach out to Ahmed via email (ahmedullah8341@gmail.com), phone (+91 8688935411), or connect on LinkedIn and GitHub. Always open to collaborations and opportunities!'
    ]
  },
  education: {
    keywords: ['education', 'college', 'university', 'degree', 'graduation', 'lords institute'],
    responses: [
      'Ahmed is pursuing a Bachelor of Engineering in Information Technology at Lords Institute of Engineering and Technology, Hyderabad. Expected Graduation: May 2025 | CGPA: 8.50/10. Strong academic foundation combined with practical expertise.',
      'Education: B.E. in Information Technology from Lords Institute of Engineering & Technology. Graduating May 2025 with a CGPA of 8.50. While studying, Ahmed actively works on projects, builds real-world skills, and explores AI integration.',
      'B.E. IT from Lords Institute of Engineering and Technology, Hyderabad (May 2025, CGPA: 8.50). Ahmed combines academic excellence with hands-on project work, internships, and continuous learning in emerging tech.'
    ]
  },
  ai: {
    keywords: ['ai', 'artificial intelligence', 'prompt engineering', 'machine learning', 'neural', 'llm'],
    responses: [
      'Ahmed is deeply passionate about AI and Prompt Engineering. He views prompt engineering as the new programming language and integrates AI capabilities into frontend applications. Experienced with multiple AI models and workflows.',
      'Prompt Engineering is Ahmed\'s specialty. He\'s engineered 500+ prompts, accessed 12+ AI models, and designed 8 AI workflows. AI is not just a tool for Ahmed — it\'s an extension of creative problem-solving and development.',
      'AI Integration: Ahmed designs intelligent automation pipelines, chain-of-thought prompting systems, and RAG architectures. He believes the future is AI-native, where prompt engineering and creative automation drive innovation.'
    ]
  },
  frontend: {
    keywords: ['frontend', 'ui', 'ux', 'animation', 'design', 'three.js', 'gsap', '3d'],
    responses: [
      'Frontend is Ahmed\'s forte. He masters HTML5, CSS3, JavaScript, creating responsive and immersive interfaces. Specializes in GSAP animations, Three.js 3D graphics, and building cyberpunk-aesthetic UIs. Every pixel is intentional.',
      'Frontend Architecture: Ahmed builds scalable, responsive designs with vanilla JavaScript and modern frameworks. Expertise in 3D graphics (Three.js), smooth animations (GSAP), and creating experiences that wow. Form and function in perfect harmony.',
      'Ahmed creates immersive frontend experiences combining smooth animations, 3D graphics, and responsive design. Uses technologies like Three.js for 3D, GSAP for animations, Tailwind for styling. Frontend is his canvas for innovation.'
    ]
  },
  philosophy: {
    keywords: ['philosophy', 'future', 'prompted', 'vision', 'believe', 'think'],
    responses: [
      'Ahmed\'s Philosophy: "THE FUTURE IS PROMPTED." He believes AI-driven development is the next frontier. Prompt engineering and intelligent automation are transforming how we build software. He\'s not just following trends — he\'s architecting the future.',
      'Ahmed envisions a future where AI and human creativity merge seamlessly. He sees prompt engineering as essential, frontend as the bridge between user and intelligence, and continuous learning as the only constant.',
      'Ahmed believes in building with intention. Every line of code is a message. The system evolves. Technology should empower creativity, not limit it. That\'s why he focuses on immersive, intelligent, and intentional design.'
    ]
  },
  help: {
    keywords: ['help', 'command', 'how do i', 'what can i'],
    responses: [
      'Chat with me freely! Ask about Ahmed\'s skills, projects, experience, education, or anything else. Use commands like: about, skills, projects, contact, experience. Or just type naturally — I understand context!',
      'I\'m here to help! You can ask me about Ahmed\'s background, projects, skills, contact info, or philosophy. There are no strict commands — just chat naturally and I\'ll provide relevant information.',
      'Ask me anything! Common topics: skills, projects, contact info, experience, education, AI interests, or frontend expertise. Type naturally — I understand questions, not just commands.'
    ]
  }
};

// Intelligent response matcher
function findResponse(userMessage) {
  const lowerMsg = userMessage.toLowerCase();

  // Check each category for keyword matches
  for (const [category, data] of Object.entries(knowledgeBase)) {
    for (const keyword of data.keywords) {
      if (lowerMsg.includes(keyword)) {
        return getRandomResponse(data.responses);
      }
    }
  }

  // Default response for unknown queries
  const defaultResponses = [
    'Interesting question! I don\'t have specific information about that, but I\'d be happy to tell you about Ahmed\'s skills, projects, or experience. What interests you?',
    'That\'s outside my current knowledge base. Try asking me about Ahmed\'s work, skills, projects, or how to contact him.',
    'I\'m still learning! Ask me about Ahmed\'s background, projects, or expertise, and I\'ll give you detailed insights.',
    'Hmm, not sure about that. But I can tell you plenty about Ahmed\'s frontend expertise, AI interests, or latest projects!'
  ];

  return getRandomResponse(defaultResponses);
}

// Get random response from array
function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}

// Send chat message (no API, local processing)
async function sendChatMessage(userMessage) {
  // Add user message to history
  conversationHistory.push({
    role: 'user',
    content: userMessage
  });

  // Find and generate response
  const response = findResponse(userMessage);

  // Add assistant response to history
  conversationHistory.push({
    role: 'assistant',
    content: response
  });

  // Keep history manageable
  if (conversationHistory.length > 20) {
    conversationHistory = conversationHistory.slice(-20);
  }

  return response;
}

// Format response for terminal display (line wrapping)
function formatChatResponse(response) {
  const maxLineLength = 80;
  const lines = [];
  let currentLine = '';

  const words = response.split(/\s+/);

  for (const word of words) {
    if ((currentLine + ' ' + word).length > maxLineLength && currentLine.length > 0) {
      lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += (currentLine.length === 0 ? '' : ' ') + word;
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine.trim());
  }

  return lines.join('\n');
}

// Clear conversation history
function clearChatHistory() {
  conversationHistory = [];
}

// Get conversation history (for debugging)
function getChatHistory() {
  return conversationHistory;
}
