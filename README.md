# Ahmed Ullah — Portfolio

A futuristic, immersive portfolio website showcasing cutting-edge frontend development, and prompt engineering expertise. Built with modern web technologies and featuring advanced animations, interactive 3D graphics, and a sleek cyberpunk aesthetic.

---

## 🎨 Features

### **Immersive Design**
- **Cyberpunk Aesthetic**: Neon cyan and blue color scheme with dark carbon background
- **Grid & Scanline Effects**: Classic retro-futuristic visual overlays
- **Vignette Gradient**: Premium cinematic border effect
- **Custom Cursor**: Animated dot-and-ring cursor system with hover interactions

### **Advanced Animations**
- **Hero Section**: 3D particle effects with Three.js (1500+ animated particles)
- **Smooth Scrolling**: Powered by Lenis for butter-smooth viewport animations
- **GSAP Animations**: ScrollTrigger-based scroll animations and timeline effects
- **Boot Sequence**: Immersive preloader with typing effect and progress tracking
- **Glitch Effects**: Data-driven glitch text animations

### **Interactive Components**
- **Holographic Cards**: Hover effects with gradient animations and scan-line effects
- **Skill Nodes**: Circular skill badges with interactive hover states
- **Project Cards**: Portfolio items with index numbers and gradient borders
- **Timeline Visualization**: Interactive project/experience timeline

### **Responsive & Accessible**
- Mobile-friendly design with Tailwind CSS breakpoints
- Touch-device detection (disables custom cursor on mobile)
- Semantic HTML structure
- Optimized performance with lazy rendering

### **System Features**
- **Progressive Loading**: Boot sequence with multiple stages
- **Dynamic Navigation**: Smooth scrolling to major sections
- **Online Status Indicator**: Real-time pulse indicator in navigation
- **Contact Integration**: Ready for email/social links

---

## 📁 Project Structure

```
ahmed-ullah-portfolio/
├── index.html           # Main HTML file with full page structure
├── css/
│   └── style.css        # Custom styling and animations
├── js/
│   ├── script.js        # Core functionality and interactions
│   └── three-scene.js   # Three.js 3D particle effects
└── README.md            # This file
```

### **Key Files**

| File | Purpose |
|------|---------|
| `index.html` | Page structure with sections: Hero, Origin, Command, Skills, Projects, Contact |
| `css/style.css` | 800+ lines of custom CSS with animations, effects, and component styling |
| `js/script.js` | DOM manipulation, preloader, cursor effects, scroll interactions |
| `js/three-scene.js` | Three.js setup: particles, icosahedron, camera, renderer |

---

## 🚀 Getting Started

### **Installation**
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/ahmed-ullah-portfolio.git
   cd ahmed-ullah-portfolio
   ```

2. Open in a local server (recommended for full functionality):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using Live Server extension in VS Code
   # Right-click index.html → Open with Live Server
   ```

3. Visit `http://localhost:8000` in your browser

### **Direct File Open**
For basic viewing, you can open `index.html` directly in your browser, though some features (module imports) work best with a server.

---

## 🛠 Technologies & Dependencies

### **Core Technologies**
- **HTML5** — Semantic markup and canvas elements
- **CSS3** — Custom properties, grid/flexbox, animations, gradients
- **JavaScript (ES6+)** — Modern async/await, module imports, event handling

### **External Libraries** (via CDN)

| Library | Purpose | Version |
|---------|---------|---------|
| [Three.js](https://threejs.org/) | 3D graphics and particle effects | 0.160.0 |
| [GSAP](https://greensock.com/gsap/) | Timeline animations and tweens | 3.12.5 |
| [ScrollTrigger](https://greensock.com/scrolltrigger/) | Scroll-based animations | (GSAP addon) |
| [Lenis](https://github.com/studio-freight/lenis) | Smooth scrolling | 1.1.1 |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework | Latest |
| [Font Awesome](https://fontawesome.com/) | Icon library | 6.5.1 |

### **Fonts**
- **Orbitron** — Bold headlines and branding
- **Space Grotesk** — Body text and UI
- **JetBrains Mono** — Code and terminal text

All fonts loaded from Google Fonts CDN.

---

## 🎮 Interactive Elements

### **Navigation**
- Smooth scroll links to sections: ORIGIN → COMMAND → SKILLS → PROJECTS → CONTACT
- Auto-hide/show on scroll direction
- "ONLINE" status indicator with pulse animation

### **Cursor System**
- Custom animated cursor (desktop only)
- Ring expands on hover over interactive elements
- Touch devices automatically disable for performance

### **Boot Sequence Preloader**
```
> INITIALIZING AHMED_OS v1.0...
> SCANNING NEURAL ARCHITECTURE... [OK]
> LOADING AI SUBSYSTEMS... [OK]
> ... [9 total boot lines with color coding]
> SYSTEM OPERATIONAL. WELCOME, OPERATOR.
```
- Automatic progression with typing effect
- Progress bar visualization
- Auto-dismiss after 8 seconds or when complete

### **3D Hero Section**
- Particle cloud (1500 cyan particles)
- Inner particle layer (500 blue particles)
- Rotating wireframe icosahedrons
- Responsive to viewport size
- Zoom and rotation animations

---

## 🎨 Customization Guide

### **Color Scheme**
Edit the Tailwind config in `index.html` `<script>` tag:
```javascript
colors:{
  neon:'#00f0ff',        // Cyan primary
  eblue:'#0066ff',       // Electric blue
  carbon:'#0a0a0f',      // Background
  nred:'#ff2244',        // Alert red
  nglow:'#e0f0ff'        // Light glow
}
```

### **Boot Messages**
Modify `bootLines` array in `js/script.js`:
```javascript
const bootLines = [
  { text: '> CUSTOM MESSAGE HERE...', cls: 'ok' },
  // 'ok', 'alert', or no class
];
```

### **Particle Count**
Adjust in `js/three-scene.js`:
```javascript
const particleCount = 1500;    // Change this value
const innerCount = 500;         // Change this value
```

### **Section Content**
Edit HTML sections in `index.html`:
- `#origin` — Origin story/background
- `#command` — Main content section
- `#skills` — Skill badges and nodes
- `#projects` — Portfolio projects
- `#contact` — Contact information

### **Fonts & Typography**
Modify font selections in `index.html`:
```html
<!-- Add/remove font families -->
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@...&display=swap">
```

---

## ⚡ Performance Optimization

### **Current Optimizations**
- **Lazy Loading**: Three.js script loads after preloader
- **Hardware Acceleration**: CSS transforms and WebGL rendering
- **Efficient Animations**: GSAP for smooth 60fps performance
- **Responsive Canvas**: 3D scene adapts to viewport
- **Minified Assets**: CDN-hosted libraries

### **Tips for Further Optimization**
1. Reduce particle count for lower-end devices
2. Disable scanlines effect on mobile
3. Use intersection observers for lazy-load sections
4. Compress images and optimize SVGs
5. Consider code-splitting for large projects

---

## 🔧 Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome/Edge | ✅ Full | Recommended for best performance |
| Firefox | ✅ Full | Excellent support |
| Safari | ✅ Full | Requires webkit prefixes (included) |
| Mobile Safari | ✅ Partial | Animations optimized, cursor disabled |
| Android Chrome | ✅ Partial | Good performance, custom cursor disabled |

**Note**: Three.js requires WebGL support. Check [Get WebGL](https://get.webgl.org/) for device compatibility.

---

## 📱 Responsive Breakpoints

Built with Tailwind CSS breakpoints:
- **sm**: 640px
- **md**: 768px (main breakpoint for navigation)
- **lg**: 1024px (optimal layout for all sections)
- **xl**: 1280px

---

## 🚨 Known Issues & Limitations

| Issue | Solution |
|-------|----------|
| Module imports fail on file:// protocol | Use a local server (`python -m http.server`) |
| Three.js canvas blank | Ensure WebGL is enabled in browser settings |
| Performance lag on older devices | Reduce particle count in `three-scene.js` |
| Custom cursor not visible | Disable browser extensions that modify cursor |

---

## 🔐 Security & Performance

- **No external dependencies** installed locally (all via CDN)
- **No database/backend** required for basic functionality
- **No analytics/tracking** code included
- **CORS-compliant** for all external resources

---

## 📝 Content Sections

### **ORIGIN PROTOCOL** `#origin`
Tell your origin story, background, and what drives you.

### **COMMAND CENTER** `#command`
Main narrative section - showcase expertise and unique value proposition.

### **SKILLS & SUBSYSTEMS** `#skills`
Display technical skills as interactive nodes with hover effects.

### **PROJECT ARCHIVES** `#projects`
Portfolio projects with descriptions, tech stacks, and links.

### **CLASSIFIED CONTACT** `#contact`
Contact form or social links with interactive styling.

---

## 🎯 Next Steps

1. **Customize Content**: Update text, images, and social links
2. **Add Projects**: Populate the projects section with your work
3. **Connect Backend**: Add a contact form submission handler
4. **Deploy**: Push to GitHub Pages, Vercel, or Netlify
5. **Analytics**: Add Google Analytics or equivalent (optional)

---

## 🤝 Contributing

This is a personal portfolio project. To use as a template:
1. Fork the repository
2. Customize colors, content, and assets
3. Deploy to your preferred hosting platform
4. Share with your network!

---

## 📜 License

This project is available under the **MIT License**. Feel free to use as a template for your own portfolio.

---

## 🔗 Deployment

### **GitHub Pages**
```bash
git push origin main
# Enable GitHub Pages in repository settings
```

### **Vercel**
```bash
vercel
# Follow CLI prompts
```

### **Netlify**
```bash
netlify deploy --prod --dir .
```

---

## 💡 Tips & Tricks

- **Keyboard Navigation**: Use arrow keys to scroll through sections
- **Smooth Scrolling**: Works best on modern browsers with Lenis
- **Mobile Experience**: Works great on mobile but optimized for desktop viewing
- **Dark Mode**: Already dark! Built-in dark theme throughout
- **Accessibility**: All text has sufficient contrast; keyboard navigation supported

---

## 🐛 Troubleshooting

**Q: Why is Three.js not rendering?**  
A: Ensure WebGL is enabled and you're using a modern browser. Try opening in Chrome.

**Q: Module imports show errors?**  
A: You need a local server. Use `python -m http.server 8000` instead of opening the file directly.

**Q: Animations are laggy on my device?**  
A: Reduce particle count in `three-scene.js` or disable scanlines in CSS.

**Q: How do I change the colors?**  
A: Edit the Tailwind config in the `<script>` section of `index.html`.

---

## 📞 Support

For questions or issues:
1. Check the troubleshooting section above
2. Review code comments in HTML, CSS, and JS files
3. Consult the documentation links for each library
4. Open an issue on GitHub if it's a bug

---

## 🙏 Credits

Built with inspiration from:
- [Three.js](https://threejs.org/) — 3D graphics
- [GSAP](https://greensock.com/) — Animation library
- [Tailwind CSS](https://tailwindcss.com/) — Utility CSS
- Cyberpunk & Neo-noir design aesthetics

---

**Last Updated**: May 2026  
**Version**: 1.0.0

---

**STATUS**: 🟢 SYSTEM OPERATIONAL. WELCOME, OPERATOR.
