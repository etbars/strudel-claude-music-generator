// app.js - Frontend logic for the Strudel + Claude text-to-music generator

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const promptInput = document.getElementById('prompt-input');
  const generateBtn = document.getElementById('generate-btn');
  const codeOutput = document.getElementById('code-output');
  const copyBtn = document.getElementById('copy-btn');
  const runBtn = document.getElementById('run-btn');
  const loadingSpinner = document.getElementById('loading-spinner');
  const strudelContainer = document.getElementById('strudel-container');
  const strudelPlayer = document.getElementById('strudel-player');

  // Debug DOM elements
  console.log('DOM Elements found:', {
    promptInput: !!promptInput,
    generateBtn: !!generateBtn,
    codeOutput: !!codeOutput,
    copyBtn: !!copyBtn,
    runBtn: !!runBtn
  });

  // Event Listeners
  generateBtn.addEventListener('click', generateCode);
  copyBtn.addEventListener('click', copyCodeToClipboard);
  runBtn.addEventListener('click', runInStrudel);

  // Generate Strudel code from prompt
  async function generateCode() {
    const prompt = promptInput.value.trim();
    
    if (!prompt) {
      showError('Please enter a description of the music you want to create.');
      return;
    }
    
    // Show loading state
    setLoading(true);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate code');
      }
      
      const data = await response.json();
      
      // Update code display with syntax highlighting
      codeOutput.textContent = data.code;
      Prism.highlightElement(codeOutput);
      
      // Enable run button
      runBtn.disabled = false;
      
    } catch (error) {
      showError(`Error: ${error.message}`);
      console.error('Error generating code:', error);
    } finally {
      setLoading(false);
    }
  }

  // Copy generated code to clipboard
  function copyCodeToClipboard() {
    const code = codeOutput.textContent;
    
    if (!code || code === '// Your generated code will appear here') {
      return;
    }
    
    navigator.clipboard.writeText(code)
      .then(() => {
        // Visual feedback for copy
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>';
        
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy code:', err);
      });
  }

  // Load and run code in Strudel REPL
  function runInStrudel() {
    console.log('🎵 runInStrudel function called!');
    
    const codeOutput = document.getElementById('code-output');
    const strudelContainer = document.getElementById('strudel-player');
    
    console.log('🔍 Elements check:', {
      codeOutput: !!codeOutput,
      strudelContainer: !!strudelContainer
    });
    
    if (!codeOutput || !strudelContainer) {
        console.error('❌ Missing elements:', { codeOutput, strudelContainer });
        showError('Code output or Strudel container not found.');
        return;
    }
    
    const code = codeOutput.textContent.trim();
    console.log('📝 Code to run:', code);
    
    if (!code || code === '// Your generated code will appear here') {
        console.error('❌ No valid code found');
        showError('No code to run. Please generate some music code first.');
        return;
    }
    
    console.log('🚀 Starting Strudel integration...');
    
    try {
        console.log('📡 Loading Strudel via iframe...');
        
        const encodedCode = btoa(code);
        console.log('🔐 Code encoded successfully, length:', encodedCode.length);
        
        const strudelUrl = `https://strudel.cc/#${encodedCode}`;
        console.log('🌐 Strudel URL:', strudelUrl);
        
        const iframe = document.getElementById('strudel-iframe');
        console.log('🖼️ Iframe element:', !!iframe);
        
        if (iframe) {
            console.log('✅ Setting iframe properties...');
            iframe.src = strudelUrl;
            iframe.style.display = 'block';
            iframe.style.width = '100%';
            iframe.style.height = '500px';
            iframe.style.border = '2px solid #333';
            iframe.style.borderRadius = '8px';
            
            console.log('🎯 Iframe configured:', {
                src: iframe.src,
                display: iframe.style.display,
                width: iframe.style.width,
                height: iframe.style.height
            });
            
            showSuccess('Code loaded into Strudel REPL! The music should start playing automatically.');
            
            const titleElement = strudelContainer.parentElement.querySelector('h2');
            if (titleElement) {
                titleElement.textContent = 'Strudel Player (Active)';
                console.log('📝 Updated title element');
            }
            
        } else {
            throw new Error('Iframe element not found');
        }
        
    } catch (error) {
        console.error('💥 Failed to load Strudel iframe:', error);
        
        // Final fallback - open in new tab
        try {
            console.log('🔄 Trying fallback - new tab...');
            const encodedCode = btoa(code);
            const strudelUrl = `https://strudel.cc/#${encodedCode}`;
            window.open(strudelUrl, '_blank');
            showSuccess('Opened Strudel in a new tab! Your music should be playing there.');
            console.log('✅ Fallback successful');
        } catch (fallbackError) {
            console.error('💥 Fallback also failed:', fallbackError);
            showError('Failed to load Strudel. Please copy the code and visit strudel.cc manually.');
        }
    }
  }

  // Helper functions
  function setLoading(isLoading) {
    if (isLoading) {
      loadingSpinner.style.display = 'block';
      generateBtn.disabled = true;
    } else {
      loadingSpinner.style.display = 'none';
      generateBtn.disabled = false;
    }
  }

  function showError(message) {
    // Create error element if it doesn't exist
    let errorElement = document.querySelector('.error-message');
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      promptInput.insertAdjacentElement('afterend', errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(() => {
      errorElement.style.display = 'none';
    }, 5000);
  }

  function showSuccess(message) {
    // Create success element if it doesn't exist
    let successElement = document.querySelector('.success-message');
    
    if (!successElement) {
      successElement = document.createElement('div');
      successElement.className = 'success-message';
      promptInput.insertAdjacentElement('afterend', successElement);
    }
    
    successElement.textContent = message;
    successElement.style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(() => {
      successElement.style.display = 'none';
    }, 5000);
  }
});
