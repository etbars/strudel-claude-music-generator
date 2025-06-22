// app.js - Frontend logic for the Strudel + Claude text-to-music generator

let currentCode = '';
let strudelREPL = null;

// DOM elements
const generateBtn = document.getElementById('generate-btn');
const generateBtn2 = document.getElementById('generateBtn2');
const promptInput = document.getElementById('prompt-input');
const codeDisplay = document.getElementById('code-display');
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const restartBtn = document.getElementById('restartBtn');
const editBtn = document.getElementById('editBtn');
const copyBtn = document.getElementById('copyBtn');
const debugBtn = document.getElementById('debugBtn');
const loadingSpinner = document.getElementById('loading-spinner');
const statusDot = document.querySelector('.status-dot');
const statusText = document.querySelector('.status-text');

// Event listeners
if (generateBtn) generateBtn.addEventListener('click', generateMusic);
if (generateBtn2) generateBtn2.addEventListener('click', generateMusic);
if (playBtn) playBtn.addEventListener('click', runInStrudel);
if (stopBtn) stopBtn.addEventListener('click', stopMusic);
if (restartBtn) restartBtn.addEventListener('click', restartMusic);
if (editBtn) editBtn.addEventListener('click', toggleEdit);
if (copyBtn) copyBtn.addEventListener('click', copyCode);
if (debugBtn) debugBtn.addEventListener('click', debugStrudelAPI);

// Initialize Strudel REPL when page loads
document.addEventListener('DOMContentLoaded', initializeStrudel);

async function initializeStrudel() {
    console.log('🚀 Initializing Strudel...');
    
    try {
        // Wait for DOM to be ready
        if (document.readyState !== 'complete') {
            await new Promise(resolve => {
                if (document.readyState === 'complete') {
                    resolve();
                } else {
                    window.addEventListener('load', resolve);
                }
            });
        }
        
        // Wait for Strudel component to be available
        let attempts = 0;
        const maxAttempts = 30; // 15 seconds total
        
        await new Promise(resolve => {
            const checkStrudel = () => {
                attempts++;
                const strudelEditor = document.querySelector('strudel-editor');
                console.log(`🔍 Checking for strudel-editor (attempt ${attempts}/${maxAttempts}):`, strudelEditor);
                
                if (strudelEditor) {
                    console.log('✅ Strudel editor found!');
                    console.log('📋 Editor element:', strudelEditor);
                    console.log('📄 Editor innerHTML length:', strudelEditor.innerHTML.length);
                    console.log('🏷️ Editor attributes:', Array.from(strudelEditor.attributes).map(attr => `${attr.name}="${attr.value}"`));
                    
                    // Check if the editor API is available
                    if (strudelEditor.editor) {
                        console.log('🎛️ Editor API available:', typeof strudelEditor.editor);
                        console.log('🎛️ Available methods:', Object.getOwnPropertyNames(strudelEditor.editor));
                    } else {
                        console.log('⏳ Editor API not yet available');
                    }
                    
                    resolve();
                } else if (attempts >= maxAttempts) {
                    console.error('❌ Strudel editor not found after maximum attempts');
                    resolve(); // Continue anyway
                } else {
                    console.log(`⏳ Strudel editor not found, retrying in 500ms...`);
                    setTimeout(checkStrudel, 500);
                }
            };
            checkStrudel();
        });

        console.log('✅ Strudel initialization complete');
        updateStatus('ready', 'Ready to generate music');
        
        // Test the component with a simple pattern
        const strudelEditor = document.querySelector('strudel-editor');
        if (strudelEditor) {
            console.log('🧪 Testing Strudel with simple pattern...');
            const testCode = `// Test pattern - simple beat
$: s("bd ~ sd ~")`;
            
            // Try the HTML comment method
            strudelEditor.innerHTML = `<!-- ${testCode} -->`;
            console.log('✅ Test pattern loaded via HTML comments');
            
            // Wait and check if it worked
            setTimeout(() => {
                if (strudelEditor.innerHTML.includes(testCode)) {
                    console.log('✅ Test pattern successfully integrated');
                } else {
                    console.log('⚠️ Test pattern may not have integrated properly');
                }
            }, 1000);
        }
        
    } catch (error) {
        console.error('❌ Error initializing Strudel:', error);
        updateStatus('error', 'Failed to initialize Strudel');
    }
}

async function generateMusic() {
    const prompt = promptInput.value.trim();
    if (!prompt) {
        alert('Please enter a description of the music you want to create.');
        return;
    }

    updateStatus('loading', 'Generating music code...');
    generateBtn.disabled = true;
    loadingSpinner.style.display = 'block';

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        currentCode = data.code;
        
        // Display the code
        if (codeDisplay) {
            codeDisplay.textContent = currentCode;
            if (window.Prism) window.Prism.highlightElement(codeDisplay);
        }
        
        // Load code directly into Strudel REPL and auto-play
        await loadCodeIntoStrudel(currentCode);
        
        updateStatus('success', 'Music generated and loaded!');
    } catch (error) {
        console.error('Error generating music:', error);
        updateStatus('error', 'Failed to generate music. Please try again.');
    } finally {
        generateBtn.disabled = false;
        loadingSpinner.style.display = 'none';
    }
}

async function loadCodeIntoStrudel(code) {
    console.log('Loading code into Strudel editor:', code);
    
    const strudelEditor = document.getElementById('strudelEditor');
    if (!strudelEditor) {
        console.error('Strudel editor element not found');
        return;
    }
    
    console.log('Found strudelEditor:', strudelEditor);
    
    try {
        // Clean the code first
        const cleanedCode = cleanStrudelCode(code);
        console.log('Cleaned code:', cleanedCode);
        
        // Method 1: Use the JavaScript API directly (based on debug findings)
        if (strudelEditor.editor && strudelEditor.editor.setCode && strudelEditor.editor.evaluate) {
            console.log('Method 1: Using JavaScript API (setCode + evaluate)');
            
            // Set the code
            strudelEditor.editor.setCode(cleanedCode);
            console.log('✅ Code set via setCode()');
            
            // Evaluate the code (this should start playback automatically)
            await strudelEditor.editor.evaluate();
            console.log('✅ Code evaluated and should be playing');
            
            updateStatus('playing', 'Music loaded and playing');
            
            // Set button states for playing music
            if (playBtn) playBtn.disabled = true;
            if (stopBtn) stopBtn.disabled = false;
            if (restartBtn) restartBtn.disabled = false;
            
        } else {
            // Method 2: HTML Comments (Fallback)
            console.log('Method 2: Loading code via HTML comments');
            strudelEditor.innerHTML = `<!-- ${cleanedCode} -->`;
            
            // Wait for component to process
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log('✅ Code loaded via HTML comments');
            updateStatus('success', 'Music loaded');
            
            // Enable control buttons
            if (playBtn) playBtn.disabled = false;
            if (stopBtn) stopBtn.disabled = false;
            if (restartBtn) restartBtn.disabled = false;
        }
        
    } catch (error) {
        console.error('❌ Error loading code into Strudel:', error);
        updateStatus('error', 'Failed to load music: ' + error.message);
    }
}

async function runInStrudel() {
    if (!currentCode) {
        updateStatus('error', 'No code to play');
        return;
    }
    
    console.log('🎵 Running current code in Strudel');
    const strudelEditor = document.getElementById('strudelEditor');
    
    if (!strudelEditor) {
        console.error('Strudel editor not found');
        updateStatus('error', 'Strudel editor not found');
        return;
    }
    
    try {
        let playbackStarted = false;
        
        // Based on debug findings, use the available API methods
        if (strudelEditor.editor) {
            // Method 1: Try evaluate (re-evaluate current code)
            if (typeof strudelEditor.editor.evaluate === 'function') {
                console.log('▶️ Starting playback using evaluate()');
                await strudelEditor.editor.evaluate();
                playbackStarted = true;
            }
            // Method 2: Set code and evaluate
            else if (typeof strudelEditor.editor.setCode === 'function') {
                console.log('▶️ Starting playback using setCode + evaluate');
                const cleanedCode = cleanStrudelCode(currentCode);
                strudelEditor.editor.setCode(cleanedCode);
                if (strudelEditor.editor.evaluate) {
                    await strudelEditor.editor.evaluate();
                }
                playbackStarted = true;
            }
        }
        
        // Method 3: Reload code to trigger auto-play
        if (!playbackStarted) {
            console.log('🔄 No direct playback methods worked, reloading code');
            await loadCodeIntoStrudel(currentCode);
            playbackStarted = true;
        }
        
        if (playbackStarted) {
            updateStatus('playing', 'Music is playing!');
            // Update button states
            if (playBtn) playBtn.disabled = true;
            if (stopBtn) stopBtn.disabled = false;
            if (restartBtn) restartBtn.disabled = false;
        } else {
            updateStatus('error', 'Could not start playback');
        }
        
    } catch (error) {
        console.error('❌ Error starting playback:', error);
        updateStatus('error', 'Failed to start playback: ' + error.message);
    }
}

function stopMusic() {
    console.log('⏹️ Stopping music');
    const strudelEditor = document.getElementById('strudelEditor');
    
    if (!strudelEditor) {
        console.error('Strudel editor not found');
        return;
    }
    
    try {
        let playbackStopped = false;
        
        // Use the available stop method from debug findings
        if (strudelEditor.editor && typeof strudelEditor.editor.stop === 'function') {
            console.log('⏹️ Stopping playback using editor.stop()');
            strudelEditor.editor.stop();
            playbackStopped = true;
        } else {
            // Fallback: Clear innerHTML to stop playback
            console.log('🔄 Clearing content to stop playback');
            strudelEditor.innerHTML = '';
            playbackStopped = true;
        }
        
        if (playbackStopped) {
            updateStatus('stopped', 'Music stopped');
            
            // Update button states
            if (playBtn) playBtn.disabled = false;
            if (stopBtn) stopBtn.disabled = true;
            if (restartBtn) restartBtn.disabled = true;
        }
        
    } catch (error) {
        console.error('❌ Error stopping music:', error);
        updateStatus('error', 'Failed to stop music');
    }
}

async function restartMusic() {
    console.log('🔄 Restarting music');
    const strudelEditor = document.getElementById('strudelEditor');
    
    if (!strudelEditor || !currentCode) {
        console.error('Strudel editor not found or no current code');
        updateStatus('error', 'Cannot restart: missing editor or code');
        return;
    }
    
    try {
        // First stop the music
        if (strudelEditor.editor && typeof strudelEditor.editor.stop === 'function') {
            console.log('⏹️ Stopping current playback');
            strudelEditor.editor.stop();
        }
        
        // Wait a moment
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Then restart by reloading the code
        console.log('🔄 Reloading code to restart');
        await loadCodeIntoStrudel(currentCode);
        
        updateStatus('playing', 'Music restarted!');
        
    } catch (error) {
        console.error('❌ Error restarting music:', error);
        updateStatus('error', 'Failed to restart music: ' + error.message);
    }
}

// Helper function to clean and validate Strudel code
function cleanStrudelCode(code) {
    if (!code || typeof code !== 'string') {
        console.warn('Invalid code provided to cleanStrudelCode, using default');
        return 'note("c4 e4 g4 c5").sound("piano").slow(2)';
    }
    
    console.log('Code cleaned:', {
        original: code.length,
        cleaned: code.length
    });
    
    // Fix common syntax errors
    let cleanedCode = code
        // Fix .degrade() syntax - remove parameters
        .replace(/\.degrade\s*\([^)]+\)/g, '.degrade()')
        // Fix other common issues
        .replace(/\.degradeBy\s*\(\s*\)/g, '.degradeBy(0.5)'); // Add default parameter if missing
    
    if (cleanedCode !== code) {
        console.log('🔧 Fixed syntax errors in code');
    }
    
    return cleanedCode;
}

function updateStatus(type, message) {
    if (statusDot && statusText) {
        statusDot.className = `status-dot ${type}`;
        statusText.textContent = message;
    }
}

function toggleEdit() {
    const isEditable = codeDisplay.contentEditable === 'true';
    
    if (isEditable) {
        // Save changes and make read-only
        currentCode = codeDisplay.textContent;
        codeDisplay.contentEditable = 'false';
        codeDisplay.classList.remove('editable');
        if (editBtn) {
            editBtn.textContent = 'Edit';
            editBtn.classList.remove('editing');
        }
    } else {
        // Make editable
        codeDisplay.contentEditable = 'true';
        codeDisplay.classList.add('editable');
        codeDisplay.focus();
        if (editBtn) {
            editBtn.textContent = 'Save';
            editBtn.classList.add('editing');
        }
    }
}

function copyCode() {
    if (!currentCode) {
        alert('No code to copy. Generate some music first!');
        return;
    }
    
    navigator.clipboard.writeText(currentCode).then(() => {
        // Temporarily change button text to show success
        if (copyBtn) {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('success');
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.classList.remove('success');
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy code:', err);
        alert('Failed to copy code to clipboard');
    });
}

function debugStrudelAPI() {
    const strudelEditor = document.getElementById('strudelEditor');
    if (!strudelEditor) {
        console.log('❌ No strudel editor found');
        return;
    }
    
    console.log('🔍 DEBUGGING STRUDEL API STRUCTURE:');
    console.log('strudelEditor:', strudelEditor);
    console.log('strudelEditor properties:', Object.getOwnPropertyNames(strudelEditor));
    
    if (strudelEditor.repl) {
        console.log('📱 strudelEditor.repl:', strudelEditor.repl);
        console.log('📱 repl properties:', Object.getOwnPropertyNames(strudelEditor.repl));
        console.log('📱 repl methods:', Object.getOwnPropertyNames(strudelEditor.repl).filter(prop => typeof strudelEditor.repl[prop] === 'function'));
    }
    
    if (strudelEditor.editor) {
        console.log('📝 strudelEditor.editor:', strudelEditor.editor);
        console.log('📝 editor properties:', Object.getOwnPropertyNames(strudelEditor.editor));
        console.log('📝 editor methods:', Object.getOwnPropertyNames(strudelEditor.editor).filter(prop => typeof strudelEditor.editor[prop] === 'function'));
    }
    
    // Check for common method names
    const commonMethods = ['start', 'stop', 'play', 'pause', 'evaluate', 'run', 'setCode', 'getCode'];
    commonMethods.forEach(method => {
        if (typeof strudelEditor[method] === 'function') {
            console.log(`✅ strudelEditor.${method} is available`);
        }
        if (strudelEditor.repl && typeof strudelEditor.repl[method] === 'function') {
            console.log(`✅ strudelEditor.repl.${method} is available`);
        }
        if (strudelEditor.editor && typeof strudelEditor.editor[method] === 'function') {
            console.log(`✅ strudelEditor.editor.${method} is available`);
        }
    });
}
